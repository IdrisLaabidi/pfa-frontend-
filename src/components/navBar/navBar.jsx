import NotifButton from '../notifButton/notifButton';
import UserAccount from '../userAccount/userAccount';
import styles from './navBar.module.css'

const NavBar = ({title}) => {
    return ( 
        <nav className={styles.navbar}>
          <div className={styles.navbarItem}>{title}</div>
          <div className={styles.side}>
            <input className={styles.Search} type="text" placeholder="Search for something" />
            <NotifButton/>
            <UserAccount username="Joe fotfot" userrole="Project manager"/>
          </div>
       </nav>
     );
}

export default NavBar;
