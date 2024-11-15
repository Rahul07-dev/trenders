const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// getting the userschema 
const User = require('../schema/userSchema');
const Product = require('../schema/productSchema');
const Order = require('../schema/orderSchema');
const { checkJWTAuthentication } = require('../OAuth/auth');


// to get onlu product ids array out of ids and qty 
const findProductId = (cart)=>{
    let idsArray = [];
    for(let item in cart){
        idsArray.push(cart[item].productId)
    }
    return idsArray;
}


router.get('/api/userDetails',checkJWTAuthentication , async (req,res)=>{
    try{
        const user  = req.user
        console.log("TOKEN",req.user);
        if(!user){
            res.status(401).json({data:"not regestered"});
        }else{
            console.log("CALLED");
            // const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
            let userInfo = await User.findOne({email:user.email});
            console.log(userInfo);
            const cartArray = userInfo?.cart?findProductId(userInfo.cart):[];
            let whilistArray = userInfo?.whilist?userInfo.whilist:[];
            let myWhilist = await Product.find({productId:{$in:whilistArray}});
            let myCart = await Product.find({productId:{$in:cartArray}});
            let orders = await Order.find({email:userInfo.email});
            
            myWhilist.reverse();
            myCart.reverse();
            orders.reverse();
            console.log("HERE");
            if(!userInfo){
                res.status(401).json({data:"not regestered"});
            }else{
                res.status(200).json({data:{userInfo:userInfo,myCart:myCart,myWhilist:myWhilist,orders:orders}});
            }
        }    
    }catch(err){
        res.status(500).json({data:"there is error and we are not getting try block"});
        console.log(err)
    }

})




module.exports = router;