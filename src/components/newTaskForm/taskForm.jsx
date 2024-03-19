import InputField from '../inputField/inputField';
import styles from './taskForm.module.css'

const TaskForm = () => {
    return ( <div className={styles.container}>
        <form className={styles.form}>
            <div className={styles.fields}>
                <InputField/>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.users}>

            </div>
        </form>
    </div> );
}
 
export default TaskForm;