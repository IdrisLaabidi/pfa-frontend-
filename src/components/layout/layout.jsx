import NavBar from "../navBar/navBar";
import SideMenu from "../sideMenu/sideMenu"

import styles from './layout.module.css'

import { useState,useEffect } from "react";

  const Layout = ({children ,title ,path}) => {


    const [data, setData] = useState(null);

  useEffect(() => {
    // Get the data from local storage
    const storedData = localStorage.getItem("token")
    if (storedData) {
      setData(storedData);
    }
  }, []);

    return ( 
        <div className={styles.layout}>
            <SideMenu path={path}></SideMenu>
            <div className={styles.content}>
                <NavBar title={title} user={{userName : 'test',role : 'leader'}}></NavBar>
                <div>{children} </div>
                {console.log(data)}
            </div>
            
            
        </div>
     );
  }
   
  export default Layout;