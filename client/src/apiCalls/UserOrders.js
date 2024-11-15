export const UserOrdersCall = async(email)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userOrders`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:email
            })
        });
        return res;
    }catch(err){
        console.log(err);
    }
}