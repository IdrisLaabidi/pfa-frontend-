import Header from "../../components/projectHeader/projectHeader";
import TaskList from "../../components/tasksList/taskList";
import styles from './tasks.module.css'
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const Tasks = () => {
    const project = JSON.parse(sessionStorage.getItem("project"))    
    console.log(project)

    const {data : tasks , isPending, error} = useFetch('http://localhost:4000/api/task/projtasks/'+project._id)

    return ( 
        <div className={styles.taskpage}>
            <Header project={project}/>
            {error && <div>error fetching tasks</div>}
            {isPending && <div>Loading ...</div> }
            {tasks && <div className={styles.taskContainer}> 
                <TaskList title="Todo" type="pending" tasks={tasks}/>
                <TaskList title="In Progress" type="in-progress" tasks={tasks}/>
                <TaskList title="Completed" type="completed" tasks={tasks}/>
                <TaskList title="Overdue" type="overdue" tasks={tasks}/>
            </div>}
        </div>
     );
}
 
export default Tasks;