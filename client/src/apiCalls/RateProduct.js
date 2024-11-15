
export const RateProduct = async(email,productName,productBrand,userName,comment,rating)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rateProduct`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email,productName,productBrand,userName,comment,rating
            })
        });
       return res;
    }catch(err){
        console.log(err);
    }
}