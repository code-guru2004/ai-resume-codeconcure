'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserDeatilsContext } from "./_context/UserDetailsContext";


export default function Provider({children}){
    const {user} = useUser();
    //console.log(user);
    
    const [userDetails, setUserDetails] = useState(null)

    useEffect(()=>{
        user&&verifyUser();
    },[user])
    
   const verifyUser=async () =>{
           // console.log(user);
            
            const resp = await axios.post('/api/verify-user',{
                user:user
            });

            // if(resp){

            //     //console.log("Provider",resp?.data?.result);
            //     setUserDetails(resp?.data?.result);
            // }

    }
    return (
        <UserDeatilsContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </UserDeatilsContext.Provider>
    )
}