const express = require('express');
const JWT_secret = require('../config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const zod = require('zod');
const {User,Account} = require('../db');
const Jwt = require('jsonwebtoken');
const authFuntion = require('../middleware');

const SignupSchema = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
const signinSchema = zod.object({
    userName:zod.string().email(),
    password:zod.string()
}) 
const updateSchema = zod.object({
    userName:zod.string().optional(),
    password:zod.string().optional(),
    lastName:zod.string().optional()
})
router.get("/bulk",async (req,res)=>{ 
    try{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },           
        {
            lastName:{
                "$regex": filter
            }
        }]
    })
req.userId= "66afbb57655e7d6424e93a4a";
  
const filteredUsers = users.filter(user=> user._id.toString() !== req.userId.toString()).map(user => ({
            userName:user.userName,
            lastName:user.lastName,
            firstName:user.firstName,
            _id:user._id}));
res.json({
    user:filteredUsers
})
    } 
    catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
})

router.post("/signup",async (req,res)=>{
    const { userName, firstName, lastName, password }  = req.body;
    const {success} = SignupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message: 'invalid cred'})};

    const user =await User.findOne({ userName })
    if(user){
        return res.status(411).json({meaasage:'Username already taken'})};

    const hasedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        userName,
        firstName,
        lastName,
        password:hasedPassword,
    }) 
   const dbUser = await newUser.save();
    const userId = dbUser._id;
   await Account.create({
    userId,
    balance: 100 +Math.random()*100000 ,
   })

   const token = Jwt.sign({
    userId:dbUser._id
},JWT_secret); 
    res.json({
        message:'user created successfully',
        token:token
    })
});
router.post('/signin',async (req,res) => {
  const {userName,password} = req.body;
  const {success} = signinSchema.safeParse(req.body);
  if(!success){
    return res.json({message:'Error while loging in'

    })};
    try{

        const user =await User.findOne({userName});
        if(!user){
            return res.status(400).json({message:"invalid pass or username"})
        }
        const userpassValid = await bcrypt.compare(password,user.password);
        if(!userpassValid){
            return res.status(400).json({message:"invalid pass"})
        }
 
        const token = Jwt.sign({
            userId:user._id
        },JWT_secret);
        res.status(200).json({
            message: 'Logged in successfully',
            Token:token,
        })
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });    
    }
})
router.put("/",authFuntion, async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.json({meaasage:"error"})
    }
    
    const user =await User.findById(req.userId);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const {password,firstName,lastName} = req.body;
    if(password){
    if(password.length<6){
        return res.status(400).json({
            message:"pass is too short"
        })
    }
        user.password = await bcrypt.hash(password,10);
    } 
    if(lastName)user.lastName = lastName;
    if(firstName)user.firstName = firstName; 
    
    await user.save(); 
    res.json({message:"updated"});
})
module.exports = router;