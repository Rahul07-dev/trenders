
export const GenerateOrderId = async(amount)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generateOrderId`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({amount})
        });
        const {order} = await res.json();
        return order;
    }catch(err){
        console.log(err);
    }
}