export const inTrendingAndSpecialOffersAction = ()=>{
    return async (dispatch)=>{
        try{

            dispatch({
                type:'inTrendingAndSpecialOffersRequest'
            })

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inTrendingAndSpecialOffers`,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "content-Type":"application/json"
                },
                credentials:'include'
            });
            const {data} = await res.json();
            if(res.status==200){
                dispatch({
                    type:'inTrendingAndSpecialOffersSuccess',
                    payload:data
                })
            }else{
                dispatch({
                    type:'inTrendingAndSpecialOffersFail',
                })
            }
        }catch(err){
            dispatch({
                type:'inTrendingAndSpecialOffersFail',
            })
        }
    }
}

