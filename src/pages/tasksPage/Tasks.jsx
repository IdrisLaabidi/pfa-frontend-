import Header from "../../components/projectHeader/projectHeader";
import TaskList from "../../components/tasksList/taskList";
import styles from './tasks.module.css'

const Tasks = () => {
    const project = {
        name : "project1",
        status : "In Progress",
        dueDate : "22/10/2024"
    }

    return ( 
        <div className={styles.taskpage}>
            <Header project={project}/>
            <div className={styles.taskContainer}> 
                <TaskList title="Todo" type="pending"/>
                <TaskList title="In Progress" type="in-progress"/>
                <TaskList title="Completed" type="completed"/>
                <TaskList title="Overdue" type="overdue"/>
            </div>
        </div>
     );
}
 
export default Tasks;