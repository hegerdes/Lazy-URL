const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require('yup')
const nanoid = require('nanoid')

const schema = yup.object().shape({
    name: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required()

});

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

app.post('/url', async (req, res, next) =>{
    const {name, url } = req.body;
    try{
        await schema.validate({
            name,url
        });
    }catch(error){
        next(error);
    }
});

app.use((error, req, res, next)=>{
    if(error.status){
        res.status(error.status);
    }else res.status(500);
    res.json({
        message: error.message,
        stack:  error.stack
    })
}
)


const port = process.env.PORT || 4242
app.listen(port, () =>{
    console.log('Listiening on http://localhost:' + port);
})