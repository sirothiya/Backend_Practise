const express=require('express');
const app= express();

require('dotenv').config()
const PORT =process.env.PORT || 3000

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


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})