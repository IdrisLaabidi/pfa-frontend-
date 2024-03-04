import styles from './navBar.module.css'

const NavBar = () => {
    return ( 
        <nav className={styles.navbar}>
        <div className={styles.navbarItem}>NavBar item</div>
        <input type="text" placeholder="Search for something" />
        <button className={styles.profile}>Joe fotfot</button>
      </nav>
     );
}
 
export default NavBar;
