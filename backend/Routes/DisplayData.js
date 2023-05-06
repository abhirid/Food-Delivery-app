const express=require('express');
const router=express.Router()
//sending data to frontend so post and /foodData is endpoint
router.post('/foodData',(req,res)=>{
    try{
        res.send([global.foodItem,global.foodCat])
    }
    catch(error){
        console.error(error.message);
        res.send('server error')
    }
})

module.exports=router;

