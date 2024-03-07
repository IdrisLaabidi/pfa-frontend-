import styles from './sidemenu.module.css'
//importing components 
import ListItem from "../listItem/listItem";
import CreateButton from '../createButton/createButton';
//importing icons
import logo from '../../assets/logo.png'
import logout from '../../assets/logout-icon.svg'
import project from '../../assets/project-icon.svg'
import setting from '../../assets/settings-icon.svg'
import leave from '../../assets/leave-icon.svg'
import tasks from '../../assets/tasks-icon.svg'
import meet from '../../assets/meet-icon.svg'
import profile from '../../assets/profile-icon.svg'
import chat from '../../assets/chat-icon.svg'

import { useNavigate } from 'react-router-dom'

const SideMenu = ( {path} ) => {

    const navigate = useNavigate()

    const menuItems = [
        {text : "Projects" , icon: project , path:"/projects"},
        {text : "Tasks", icon: tasks, path:"/tasks"},
        {text :  "Chat", icon: chat, path:"/chat"},
        {text :  "Meet", icon: meet, path:"/meet"},
        {text : "Profile" , icon: profile, path:"/profile"},
        {text :  "Leave", icon: leave, path:"/leave"},
        {text :  "Settings", icon: setting, path:"/setting"} ];

    return ( 
        <aside className={styles.SideMenu}>
            <img className={styles.logo} src={logo} alt="logo"  />
            <CreateButton/>
            {menuItems.map((item,index) => <ListItem key={index} icon={item.icon} text={item.text} active={item.path === path} onClick={()=>{navigate(item.path);window.location.reload()}} /> )} 
            <button className={styles.logoutButton} onClick={()=>navigate('/')}>
                <img className={styles.icone} src={logout} alt='icon2'/>
                <span className={styles.texte}>Logout</span>
            </button>
        </aside>
     );
}

export default SideMenu;

//           
//<SideMenuButton className={styles.CreateMenuButton} text={'Create new project'} icon={logo}/>