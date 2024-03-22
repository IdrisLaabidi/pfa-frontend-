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
import Cookies from 'js-cookie';

const SideMenu = ( {path,user} ) => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        Cookies.remove("token")
        localStorage.removeItem("user_id")
        navigate('/login')
    }

    const menuItems = [
        {key: 1 ,text : "Projects" , icon: project , path:"/"},
        {key: 2 ,text : "Tasks", icon: tasks, path:"/tasks"},
        {key: 3 ,text :  "Chat", icon: chat, path:"/chat"},
        {key: 4 ,text :  "Meet", icon: meet, path:"/meet"},
        {key: 5 ,text : "Profile" , icon: profile, path:"/profile"},
        {key: 6 ,text :  "Leave", icon: leave, path:"/leave"},
        {key: 7 ,text :  "Settings", icon: setting, path:"/setting"} ];

    return ( 
        <aside className={styles.SideMenu}>
            <img className={styles.logo} src={logo} alt="logo"  />
            {user.role === 'leader' && <CreateButton/>}
            {menuItems.map(item => <ListItem icon={item.icon} 
                text={item.text} 
                active={item.path === path} 
                key={item.key} 
                onClick={()=>navigate(item.path,{state:{user:user}})} 
            /> )} 
            <button className={styles.logoutButton} onClick={handleLogOut}>
                <img className={styles.icone} src={logout} alt='icon2'/>
                <span className={styles.texte}>Logout</span>
            </button>
        </aside>
     );
}

export default SideMenu;

//           
//<SideMenuButton className={styles.CreateMenuButton} text={'Create new project'} icon={logo}/>