//imports
import { useState,useEffect } from "react"
import { useLocation,useNavigate } from "react-router"
import Cookies from "js-cookie"


const useConnect = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [error,setError] = useState(null)//used to set the error text on the page
    const [isPending,setIsPending] = useState(true)//used to set the loading animation

   //a function to fetch the user from the db using an id and a token 
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
      //check if we got a user object from an other route buy using navigate
      const user_data = state.user
      if(user_data){
        setIsPending(false)
        setUser(user_data)
        console.log(user_data)
      }
    } catch (error) {
      //if there is no user recieved in this route we fetch the user from the db using the cookie and the stored id
      const token = Cookies.get("token")
      const id = localStorage.getItem("user_id")
      if (token && id){
        console.log("token",token ,"id", id)
        getUser(id,token)
      }
      if (!token || !id){
        //if the cookie expired or the id is unavailable we quit the route to the login 
        alert("session expired")
        Cookies.remove(token)
        localStorage.removeItem("user_id")
        navigate('/login')
      }
    }
  }, []);
  return [user, isPending,error]
}

export default useConnect;