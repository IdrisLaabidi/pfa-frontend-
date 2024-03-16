//import components
import NavBar from "../navBar/navBar";
import SideMenu from "../sideMenu/sideMenu"
//import styles
import styles from './layout.module.css'
//import custom hook
import useConnect from "../../hooks/useConnect";

  const Layout = ({children ,title ,path}) => {

    //provide user for the components 
    const [user,isPending,error] = useConnect()

    return ( 
        <div className={styles.layout}>
            <SideMenu path={path} user={user}></SideMenu>
            <div className={styles.content}>
                <NavBar title={title} user={{userName : user['userName'] ,role : user['role']}}></NavBar>
                <div>{children} </div>
                { isPending && <div>Loading...</div>}
                { error && <div>{error}</div>}
            </div>
        </div>
     );
  }
   
  export default Layout;