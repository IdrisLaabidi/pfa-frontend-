import { Link } from "react-router-dom";
import styles from './sidemenu.module.css'
import logo from '../../assets/logo.png'

const SideMenu = () => {
    return ( 
        <aside className={styles.SideMenu}>
            <img src={logo} alt="logo"  />
            <button className={styles.CreateMenuButton}>Create new project</button>
            <ul className={styles.menu}>
            {["Projects", "Tasks", "Chat", "Meet", "Profile", "Leave", "Settings"].map(item => (
                <li key={item}>
                <Link to="#">{item}</Link> 
                </li>
            ))}
            </ul>
            <button className={styles.logoutButton}>Logout</button>
        </aside>
     );
}

export default SideMenu;