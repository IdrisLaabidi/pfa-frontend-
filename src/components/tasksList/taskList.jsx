import TaskCard from '../taskCard/taskCard';
import ListHeader from '../taskListHeader/taskListHeader';
import styles from './tasksList.module.css'

const TaskList = ( {title,type,tasks} ) => {
    return ( 
        <div className={styles.container}>
            <ListHeader title={title} />
            <TaskCard task={{title : "create the front en design ",dueDate:"22/10/2024" ,priority : "low"}} />
            <TaskCard task={{title : "create the front en design ",dueDate:"22/10/2024" ,priority : "high"}} />
            <TaskCard task={{title : "create the front en design ",dueDate:"22/10/2024" ,priority : "medium"}} />
        </div>
     );
}
 
export default TaskList
