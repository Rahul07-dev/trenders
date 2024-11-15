export const SelectedProductsDetails = async(query)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/selectedProductsDetails`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                query:query
            })
        });
        let data = await res.json();
        data = data.details;
        return data;
    }catch(err){
        console.log(err);
    }
}