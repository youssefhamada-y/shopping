import { createContext, useState } from "react";



 export const usercontext=createContext('') 
 export default function Userprovider({children}){
    const [token, settoken] = useState(localStorage.getItem('token'))
    function LogOut() {
        settoken(null)
        localStorage.removeItem('token')
    }
return <usercontext.Provider value={{token, settoken,LogOut}}>
{children}
</usercontext.Provider>
 }