export const Logout = async ()=>{
    document.cookie = 
      "userToken=; Max-Age=0; path=/; domain=" + window.location.hostname; 
      setTimeout(()=>{
        console.log("Logged Out");
      },1000);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-Type":"application/json"
        },
        Credentials:'include'
    })
    if(res.status===200){
        window.location.reload();
    }else{
        window.alert("some problem in logout");
    }
}