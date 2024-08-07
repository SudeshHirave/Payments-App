const express = require('express');
const authFuntion = require('../middleware');
const {User,Account } = require('../db');
const router = express.Router();
const zod = require('zod');
const { default: mongoose } = require('mongoose');

const transferSchema = zod.object({
  to:zod.string(),
  amount:zod.number()
})

router.get('/balance',authFuntion,async(req,res) => {
  try{
    const userAccount = await Account.findOne({ userId: req.userId});
    if (!userAccount) { 
      return res.status(404).json({ message: "Account not found." });
  }
    res.json({
      balance: userAccount.balance
    });
  }catch(error){
    res.status(411).json({message:"server error"})
  }
});

router.post('/transfer',authFuntion,async (req,res)=>{
  const {success} = transferSchema.safeParse(req.body);
  if(!success){
    return res.status(400).json({
      message: "valid inputs"
    })
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  const {to,amount}= req.body;
  const fromAccount = await Account.findOne({ userId:req.userId }).session(session);

  if(fromAccount.balance<amount){
    await session.abortTransaction();
    return res.status(400).json({
      message:"Insuffecient balance"
    })
  }

  const toAccount = await Account.findOne({ userId:to }).session(session);
  if(!toAccount){
    await session.abortTransaction();
    return res.status(400).json({
      message:"Invalid account"
    })
  }

  await Account.updateOne({ userId:req.userId },{ $inc:{ balance: -amount }}).session(session);

  await Account.updateOne({ userId:to },{ $inc:{ balance: amount }}).session(session);

  await session.commitTransaction();
  res.json({
    message:"transfer successful"
  })
});

module.exports = router;