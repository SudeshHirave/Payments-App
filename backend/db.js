const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:C4lqVQUg9yyjaTLi@cluster0.vdqvmhw.mongodb.net")  
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    } ,
    lastName:{ 
        type:String,
        required:true
    }    ,
    password:{
        type:String,
        required:true,
        minLength:6
    },    
    userName:{
        type:String,
        required:true,
        unique:true
    }
})

const accountSchema  = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required:true, 
    },
    balance:{
        type:Number,
        required: true,
    } 
});
  
const User = mongoose.model('User',userSchema); 
const Account = mongoose.model('Account',accountSchema);
module.exports ={
    User,
    Account
}; 
