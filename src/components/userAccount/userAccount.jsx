import Logo from '../../assets/logo.png'
import styles from './userAccount.module.css'

const UserAccount = ({user}) => {
    return ( 
            <div className={styles.MainDiv}>
                <img className={styles.ProfileImage} src={Logo} alt='profile img'/>
                <div>
                    <p className={styles.Username}>{user.firstName +' '+ user.lastName}</p>
                    <p className={styles.UserRole}>{user.role}</p>
                </div>
            </div>
        
     );
}
 
export default UserAccount;

//        <button className={styles.UserAcc}>
