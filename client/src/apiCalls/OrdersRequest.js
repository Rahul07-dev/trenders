
export const OrdersRequest = async(details)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({details})
        });
        return res;
    }catch(err){
        console.log(err);
    }
}