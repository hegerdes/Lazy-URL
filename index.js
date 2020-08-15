const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
//app.use(express.static('./public'))

app.get('/', (req, res) =>{
     res.json({
         message: 'LazyURL'
     })
});

app.get('/:id', (req, res) =>{
    //TODO
});

app.post('/url', (req, res) =>{
    //TODO
});



const port = process.env.PORT || 4242
app.listen(port, () =>{
    console.log('Listiening on http://localhost:' + port);
})