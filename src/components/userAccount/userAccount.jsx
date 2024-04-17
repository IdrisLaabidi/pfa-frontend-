import { GridLoader } from 'react-spinners';
import styles from './userAccount.module.css'
import { useNavigate } from 'react-router-dom';

const UserAccount = ({user,isLoading,error}) => {

    const navigate = useNavigate()

    const centerSpinner = {
        justifyContent : 'center'
    }
    return ( <>
            {(!isLoading && !error) && <div className={styles.MainDiv} onClick={() => {navigate('/profile')}}>
                <img className={styles.ProfileImage} src={user.pictureURL} alt='profile img'/>
                <div>
                    <p className={styles.Username}>{user.firstName +' '+ user.lastName}</p>
                    <p className={styles.UserRole}>{user.role}</p>
                </div>
            </div>}
            {isLoading && <div className={styles.MainDiv} style={centerSpinner} >
                    <GridLoader color='#08639C'></GridLoader>
                </div>}
            </>
     );
}
 
export default UserAccount;
