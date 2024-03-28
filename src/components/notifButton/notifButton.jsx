import noitfbell from '../../assets/notificationbell.svg'
import styles from './notifButton.module.css'


const NotifButton = ({ onClick }) => {
    return ( 
        <div className={styles.Main} onClick={onClick}>
            <img className={styles.Photo} src={noitfbell} alt='profil'/>
        </div>
     );
    }

export default NotifButton;