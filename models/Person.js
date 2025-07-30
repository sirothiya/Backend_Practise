const { default: mongoose } = require("mongoose");
const { type } = require("os");

//schema is to define the structure of the document
//it is like a blueprint of the document
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,

    },
    work:{
        type:String,
        enum:['Manager','Chef','Waiter'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})

// now defining the model 
//model is a class that we can use to create and read documents from the collection

const Person=mongoose.model('Person',personSchema);

module.exports=Person;