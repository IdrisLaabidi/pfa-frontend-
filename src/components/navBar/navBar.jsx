import NotifButton from '../notifButton/notifButton';
import UserAccount from '../userAccount/userAccount';
import styles from './navBar.module.css'

const NavBar = () => {
    return ( 
        <nav className={styles.navbar}>
          <div className={styles.navbarItem}>NavBar item</div>
          <input className={styles.Search} type="text" placeholder="Search for something" />
          <NotifButton/>
          <UserAccount username="Joe fotfot" userrole="Project manager"/>
      </nav>
     );
}

export default NavBar;
