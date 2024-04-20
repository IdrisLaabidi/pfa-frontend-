import styles from './userTag.module.css'
import userIcon from '../../assets/user.png'

const UserTag = ({user}) => {
    return ( <div className={styles.container}>
        {user.pictureURL === 'none' ? <img className={styles.image} src={userIcon} alt='profile img'/> : 
                <img className={styles.image} src={user.pictureURL} alt='profile img'/>}
        <span className={styles.text}>{user.firstName+' '+user.lastName}</span>
    </div> );
}
 
export default UserTag;