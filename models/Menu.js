const mongoose=require('mongoose');

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
  },
  price:{
    type:Number,
    required:true
  },
  taste:{
    type:String,
    enum:['spicy','sweet','sour','bitter','salty'],
    required:true,
  },
  is_drink:{
    type:Boolean,
    default:false,
  },
  ingridents:{
    type:[String],
    default:[]
  },
  num_sales:{
    type:Number,
    default:0,
  }
})

const MenuItem=mongoose.model('MenuItem',menuItemSchema);
module.exports=MenuItem