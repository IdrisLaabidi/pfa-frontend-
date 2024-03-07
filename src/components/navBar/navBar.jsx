import NotifButton from '../notifButton/notifButton';
import UserAccount from '../userAccount/userAccount';
import styles from './navBar.module.css'

const NavBar = ({title,user}) => {
    return ( 
        <nav className={styles.navbar}>
          <div className={styles.navbarItem}>{title}</div>
          <div className={styles.side}>
            <input className={styles.Search} type="text" placeholder="Search for something" />
            <NotifButton/>
            <UserAccount user={user}/>
          </div>
       </nav>
     );
}

export default NavBar;
