//use to connect to the database using mongoose library
const mongoose=require('mongoose')
require('dotenv').config();



const mongoUrl=process.env.DB_URL || process.env.DB_URL_Local;
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//connection to the database
//Mongoose maintain a default connection object representing the mongodb connection.
const db= mongoose.connection;
//with the help of this db we will create a bridge between the mongodba and node.

// here are few events that we can listen to 

db.on('connected',()=>{
    console.log('Database connected successfully');
})

db.on('error',(err)=>{
    console.log('Error in database connection: ', err);
})

db.on('disconnected',()=>{
    console.log('Database disconnected');
})
// ...existing code...
db.on('close', () => {
    console.log('Database connection closed');
});
// ...existing code...
//now to finally connect we need to export this db object
module.exports = db;