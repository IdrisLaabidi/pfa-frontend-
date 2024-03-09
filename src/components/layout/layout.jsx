
import Cookies from "js-cookie";
import NavBar from "../navBar/navBar";
import SideMenu from "../sideMenu/sideMenu"

import styles from './layout.module.css'

import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

  const Layout = ({children ,title ,path}) => {

    const {state} = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState("")


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
        }
     } catch (error) {
      alert('Oops! Failed to connect to the API.');
     }
   } 

  useEffect(() => {
    try {
      const user_data = state.user
      if(user_data){
        setUser(user_data)
        console.log(user_data)
      }
    } catch (error) {
      const token = Cookies.get("token")
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

    return ( 
        <div className={styles.layout}>
            <SideMenu path={path}></SideMenu>
            <div className={styles.content}>
                <NavBar title={title} user={{userName : 'test',role : 'leader'}}></NavBar>
                <div>{children} </div>
            </div>
            
            
        </div>
     );
  }
   
  export default Layout;