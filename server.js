const express=require('express');
const app= express();

const db =require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
//bodyParser is used to parse the request body
//it is used to parse the json data sent in the request body    



const PersonRoutes=require('./routes/PersonRoutes')
const MenuRoutes=require('./routes/MenuRoutes')

app.get('/',(req,res)=>{
    res.send('Welcome to Hotel... we will try to serve you the best');
})

app.use('/person',PersonRoutes);

app.use('/menu',MenuRoutes)


app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})