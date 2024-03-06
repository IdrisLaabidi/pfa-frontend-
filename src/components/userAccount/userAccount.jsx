import Logo from '../../assets/logo.png'
import styles from './userAccount.module.css'

const UserAccount = ({username, userrole}) => {
    return ( 
            <div className={styles.MainDiv}>
                <img className={styles.ProfileImage} src={Logo} alt='profile img'/>
                <div>
                    <p className={styles.Username}>{username}</p>
                    <p className={styles.UserRole}>{userrole}</p>
                </div>
            </div>
        
     );
}
 
export default UserAccount;

//        <button className={styles.UserAcc}>
