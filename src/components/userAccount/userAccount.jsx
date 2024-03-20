import Logo from '../../assets/logo.png'
import Spinner from '../spinner/spinner';
import styles from './userAccount.module.css'

const UserAccount = ({user,isLoading}) => {

    const centerSpinner = {
        justifyContent : 'center'
    }
    return ( <>
            {!isLoading && <div className={styles.MainDiv}>
                <img className={styles.ProfileImage} src={Logo} alt='profile img'/>
                <div>
                    <p className={styles.Username}>{user.firstName +' '+ user.lastName}</p>
                    <p className={styles.UserRole}>{user.role}</p>
                </div>
            </div>}
            {isLoading && <div className={styles.MainDiv} style={centerSpinner} >
                    <Spinner></Spinner>
                </div>}
            </>
     );
}
 
export default UserAccount;
