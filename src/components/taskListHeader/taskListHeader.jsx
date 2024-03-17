import styles from './taskListHeader.module.css'
import plusIcon from '../../assets/plus-icon.svg'

const ListHeader = ({title}) => {
    return ( 
        <div className={styles.container}>
            <span>{title}</span>
            <button className={styles.plus}>
                <img className={styles.icon} src={plusIcon}></img>
            </button>
        </div>
     );
}
 
export default ListHeader;