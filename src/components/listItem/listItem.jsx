
import styles from './listItem.module.css';

const ListItem = ({ icon ,text ,active ,onClick}) => {
    return (
        <button onClick={onClick} className={`${active ? `${styles.containerActive}` :`${styles.container}` }`}>
            <img src={icon} alt='icon' className={styles.icon}></img>
            <span className={styles.text}>{text}</span>
        </button>
    );
}

export default ListItem;
