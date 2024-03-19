import Header from "../../components/projectHeader/projectHeader";
import TaskList from "../../components/tasksList/taskList";
import styles from './tasks.module.css'
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router";
import { useEffect } from "react";

const Tasks = () => {
    const {state} = useLocation()
    let project
    let id
    try{
         project = state.project
         id = project._id
    }catch(error){
        project = {
            "_id": "65f6cf7a4f9f6130e887c118",
            "name": "creating forms",
            "description": "coding forms for projects and tasks",
            "dueDate": null,
            "startDate": null,
            "team": [
                "65ecd1ced04352213d801803"
            ],
            "tasks": [
                "65f6cf344f9f6130e887c117",
                "65f6cf1e4f9f6130e887c116"
            ]
        }
        id = project._id
    }
    

    const {data : tasks , isPending, error} = useFetch('http://localhost:4000/api/task/projtasks/'+id)

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