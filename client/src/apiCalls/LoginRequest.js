
export const LoginRequest = async(email,password)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:email,password:password
            })
        });
        let data = await res;
        return data;
    }catch(err){
        console.log(err);
    }
}