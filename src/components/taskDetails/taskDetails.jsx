import Status from '../statusLabel/statusLabel';
import styles from './taskDetails.module.css';
import priorityIcon from '../../assets/tags-icon.svg'
import statusIcon from '../../assets/check-mark-circle-icon.svg'
import dateIcon from '../../assets/date-icon.svg'
import userIcon from '../../assets/user-icon-black.svg'
import { format } from 'date-fns'
import deleteIcon from '../../assets/delete-icon.svg'
import modifyIcon from '../../assets/edit-icon.svg'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';


const TaskDetails = ({task}) => {

    const token = Cookies.get("token")
    const navigate = useNavigate()

    const handleDelete = () => {
        fetch("http://localhost:4000/api/task/tasks/"+task._id,
            {   method : "DELETE" ,
                headers : {
                    Authorization: `Bearer ${token}`,
                }
            }
        ).then( result => {
            console.log(result.json())
            navigate('/tasks')
        }).catch(error => {
            console.log(error)
        })
    }

    return ( <div className={styles.container}>
        <div className={styles.flex}>
            <span className={styles.title}>{task.title}</span>
            <button className={styles.bttn} title='Edit Task'>
                <img alt='modify' src={modifyIcon} className={styles.icon}/>
            </button>
            <button className={styles.bttn}>
                <img alt='delete' src={deleteIcon} className={styles.icon} onClick={handleDelete} title='Delete Task'/>
            </button>
        </div>
        <div className={styles.flex}>
            <img alt='icon' className={styles.icon} src={priorityIcon} />
            <span className={styles.text}>priority</span>
            <Status status={task.priority}/>
        </div>
        <div className={styles.flex}>
            <img alt='icon' className={styles.icon} src={statusIcon} />
            <span className={styles.text}>status</span>
            <Status status={task.status}/>
        </div>
        <div className={styles.flex}>
            <img alt='icon' className={styles.icon} src={dateIcon} />
            <span className={styles.text}>Due date : </span><span>{format(new Date(task.dueDate), 'dd/MM/yyyy')}</span>
        </div>
        <div className={styles.flex}>
            <img alt='icon' className={styles.icon} src={userIcon} />
            <span className={styles.text}>assigned to : </span><span>idris laabidi , fathallah youssef , Miri riri ...</span>
        </div>
        <div className={styles.flex2}>
            <span className={styles.title}>Description</span>
            <span>{task.description}</span>
        </div>
    </div> );
}
 
export default TaskDetails;