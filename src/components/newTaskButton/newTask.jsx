import styles from './newTask.module.css'
import plusIcon from '../../assets/plus-icon.svg'

const NewTask = () => {
    return ( <button className={styles.bttn}>
        <img src={plusIcon} className={styles.icon}/>
        <span className={styles.text}>New Task</span>
    </button> );
}
 
export default NewTask;