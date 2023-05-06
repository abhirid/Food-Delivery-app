const express=require('express');
const router=express.Router()
const User=require('../modals/User')
const { body, validationResult } = require('express-validator');


const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');//we need to generate on logging 
const jwtSecret='BAFYBEICZSSCDSBS7FFQZ55ASQDF3SMV6KLCW3GOFSZVWLYARCI47BGF354'// it can be anything


router.post('/createuser',
body('email','invalid email').isEmail(),
// password must be at least 5 chars long
body('password','incorrect password').isLength({ min: 5 }),//password is name frm create and incorrect pass is msg shown
body('name','name incorrect').isLength({ min: 5 })

,async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //mostly bcypt function are asynchronus 
    const salt=await bcrypt.genSalt(10);
    let securePassword= await bcrypt.hash(req.body.password,salt) // coming from front end req.body.password
        try {
           await User.create({
                name:req.body.name,
                password:securePassword,
                email:req.body.email,
                location:req.body.location
            })
        res.json({success:true});
        } catch (error) {
            console.log(error)
            res.json({success:false});

        }

    })
    router.post('/loginuser',
    body('email','invalid email').isEmail(),
// password must be at least 5 chars long
    body('password','incorrect password').isLength({ min: 5 }),//password is name frm create and incorrect pass is msg shown
   
    async(req,res)=>{
      let email=req.body.email;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });}
     try {
         let userData=  await User.findOne({email});
         if(!userData) //response nhi hai data nhi hai
        {
            return res.status(400).json({ errors: 'Trying loging with correct email' });
        }
        const pwdCompare= await bcrypt.compare(req.body.password,userData.password);//userdata coming from our mongo

        //if(req.body.password !== userData.password) // comparing with password
        if(!pwdCompare)
        {

            return res.status(400).json({ errors: 'Trying loging with correct password' });
        }
        //data has to object
        const data={
            user:{
            id:userData.id
                 
            }
        }
        const authToken=jwt.sign(data,jwtSecret) //any 32 bit string header will be bydefault of sign 3 parameter
        return res.json({success:true,authToken:authToken})// we also send auth token to user logging can kept on localstorage
    }
    catch(error){
            console.log(error)
            res.json({success:false});

    }
    })

module.exports=router  