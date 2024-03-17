import styles from './taskCard.module.css'
import icon from '../../assets/up-arrow-icon.svg'

const TaskCard = ({task}) => {
    return ( 
        <>
            {task.priority === "low" && <div className={`${styles.container} ${styles.low}`}>
                <button className={styles.expand}><img className={styles.icon} src={icon}></img></button>
                <span className={styles.text1}>{task.title}</span>
                <span className={styles.text2}>{"Due date: "+ task.dueDate}</span>
            </div>}

            {task.priority === "medium" && <div className={`${styles.container} ${styles.medium}`}>
                <button className={styles.expand}><img className={styles.icon} src={icon}></img></button>
                <span className={styles.text1}>{task.title}</span>
                <span className={styles.text2}>{"Due date: "+ task.dueDate}</span>
            </div>}
            {task.priority === "high" && <div className={`${styles.container} ${styles.high}`}>
                <button className={styles.expand}><img className={styles.icon} src={icon}></img></button>
                <span className={styles.text1}>{task.title}</span>
                <span className={styles.text2}>{"Due date: "+ task.dueDate}</span>
            </div>}

            {!task.priority && <div className={styles.container}>
                <button className={styles.expand}><img className={styles.icon} src={icon}></img></button>
                <span className={styles.text1}>{task.title}</span>
                <span className={styles.text2}>{"Due date: "+ task.dueDate}</span>
            </div>}
    </>);
}
 
export default TaskCard;