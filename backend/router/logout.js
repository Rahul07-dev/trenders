const express = require('express');
const router = express.Router()

router.get('/api/logout',(req,res)=>{
    try{
        // res.clearCookie('userToken',{path:'/'})
        res.clearCookie("userToken", {
          path: "/",
          sameSite: "None", 
          secure: true,
        });
        res.status(200).json({message:'user logout'});
    }catch(err){
        res.status(500).json({error:err});
    }
})

module.exports = router