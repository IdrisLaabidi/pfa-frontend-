import { useState,useEffect } from "react"
import { useLocation,useNavigate } from "react-router"
import Cookies from "js-cookie"


const useConnect = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(true)
    const [token,setToken]=useState("")

   const getUser = async (id,token) => {
     try {
        const response = await fetch(
          "http://localhost:4000/api/auth/users/"+id,
          {
            method : 'GET',
            headers : {
              Authorization: `Bearer ${token}`,
            }
          }
          )
        const json = await response.json();
        if(!response.ok){
            alert('fetching user failed !please try again')
        }
        if(response.ok){
            console.log("user fetched" , json)
            setError(null)
            setIsPending(false)
            setUser(json.user)
        }
     } catch (error) {
      alert('Oops! Failed to connect to the API.');
      setIsPending(false)
      setError(error.message)
     }
   } 

  useEffect(() => {
    try {
      const user_data = state.user
      if(user_data){
        setUser(user_data)
        setToken(Cookies.get("token"))
        console.log(user_data)
      }
      setToken(Cookies.get("token"))
    } catch (error) {
      setToken(Cookies.get("token"))
      const id = localStorage.getItem("user_id")
      if (token && id){
        console.log("token",token ,"id", id)
        getUser(id,token)
      }
      if (!token || !id){
        alert("session expired")
        Cookies.remove(token)
        localStorage.removeItem("user_id")
        navigate('/login')
      }
    }
  }, []);
  return [user, isPending,error,token]
}

export default useConnect;