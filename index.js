const express = require("express");
const cors = require("cors");
const path = require('path');
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const sqlite3 = require("sqlite3").verbose();
const { nanoid } = require("nanoid");

var db = new sqlite3.Database("data/urls.db");

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
});

const app = express();
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


var stmt = "SELECT * FROM urls WHERE (name) = ?;";

app.get("/", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * ")
  res.render('index')
});

app.get('/:id', (req, res) => {
  const { id: name } = req.params;
  console.log(req.params);
  console.log(name);
  db.serialize(function () {
    db.get(stmt, [name], function (err, row) {
      if (typeof row == "undefined") {
        res.json({
          err: "NotDefined",
        });
      } else {
        res.redirect(row.url);
        console.log("row is: ", row);
      }
    });
  });
});

app.post("/url", async (req, res, next) => {
  let { name, url } = req.body;
  try {
    await schema.validate({
      name,
      url,
    });
    if (!name) {
      name = nanoid(6);
    }
    name = name.toLowerCase();

    db.serialize(function () {
      db.prepare(`CREATE TABLE IF NOT EXISTS urls (name TEXT, url TEXT)`)
        .run()
        .finalize();
      db.get(stmt, [name], function (err, row) {
        if (typeof row == "undefined") {
          db.prepare("INSERT INTO urls (name, url)  VALUES(?,?)")
            .run([name, url])
            .finalize();
          res.json({
            name,
            url,
          });
        } else {
          res.json({
            "Status:": "Alrady defined",
          });
          console.log("row is: ", row);
        }
      });
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else res.status(500);
  res.json({
    message: error.message,
    stack: error.stack,
  });
});

const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log("Listiening on http://localhost:" + port);
});
