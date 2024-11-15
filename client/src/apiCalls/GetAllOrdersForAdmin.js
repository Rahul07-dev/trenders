
export const GetAllOrdersForAdmin = async (filters)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/allOrders`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({filters})
        })
        const {orders} = await res.json();
        return orders;
    }catch(err){
        console.log(err);
    }
    
}