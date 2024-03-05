import styles from './sidemenu.module.css'
import logo from '../../assets/logo.png'
import ListItem from "../listItem/listItem";

const SideMenu = () => {

    const menuItems = ["Projects", "Tasks", "Chat", "Meet", "Profile", "Leave", "Settings"];

    return ( 
        <aside className={styles.SideMenu}>
            <img src={logo} alt="logo"  />
            <button className={styles.CreateMenuButton}>
                <img className={styles.icone} src={logo} alt='icon'/>
                <p className={styles.texte}>Create new project</p>
            </button>
            {menuItems.map(item => <ListItem key={item} item={item} />)} 
            <button className={styles.logoutButton}>
                <img className={styles.icone} src={logo} alt='icon2'/>
                <p className={styles.texte}>Logout</p>
            </button>
        </aside>
     );
}

export default SideMenu;

//           
//<SideMenuButton className={styles.CreateMenuButton} text={'Create new project'} icon={logo}/>