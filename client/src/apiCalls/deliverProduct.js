export const deliverProduct = async(email,date,time)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deliverProduct`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email,date,time})
        });
        return res;
    }catch(err){
        console.log(err);
    }
}