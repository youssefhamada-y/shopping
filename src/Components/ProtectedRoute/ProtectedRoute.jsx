import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { usercontext } from "../../Context/User.context"

export default function ProtectedRoute({children}) {
    const {token}=useContext(usercontext)
 if(token){
  return children
 }
 else{
     return <Navigate to="auth/login"/>
 }
}
