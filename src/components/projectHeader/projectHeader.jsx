import styles from './projectHeader.module.css'
import dropDown from '../../assets/arrow-drop-down-icon.svg'
import NewTask from '../newTaskButton/newTask';
import { useState } from 'react';


const Header = ({project}) => {

    const [showDetails,setShowDetails]=useState(false)

    const handleClick = (status) => {
        setShowDetails(status)
        const element = document.querySelector('.tasksList_list__xcqmU'); // Replace with your actual class name
        if (element) {
            // Add or remove classes as needed
            if(status){
                element.classList.remove('TaskListHeight2'); // Remove the old class// Add a new class
                element.classList.add('TaskListHeight1'); 
            }else{
                element.classList.remove('TaskListHeight'); // Remove the old class// Add a new class
                element.classList.add('TaskListHeight2'); // Add a new class
            }
            
        } else {
            console.error('Element not found. Check if the class name is correct.');
        }
    }

    return ( <>
        
        {!showDetails && <div className={styles.container}>
            <span className={styles.text1}>{"Projects/"+project.name}</span>
            <div className={styles.flex1}>
                <div className={styles.flex2}>
                    <span className={styles.text2}>{project.name}</span>
                    <button className={styles.dropDown} onClick={() => {setShowDetails(true)}}>
                        <img src={dropDown} className={styles.icon}/>
                    </button>
                </div>
                <NewTask />
            </div>
        </div> }
        
        {showDetails && <div className={`${styles.container} ${styles.containerDetails}`}>
            <span className={styles.text1}>{"Projects/"+project.name}</span>
            <div className={styles.flex1}>
                <div className={styles.flex2}>
                    <span className={styles.text2}>{project.name}</span>
                    <button className={styles.dropDown} onClick={() => {setShowDetails(false)}}>
                        <img src={dropDown} className={`${styles.icon} ${styles.iconFlipped}`} />
                    </button>
                </div>
                <NewTask />
            </div>
            <div className={styles.flex3}>
                <span className={styles.text1}> { "Status : " + project.status}</span>
                <span className={styles.text1}> { "Due Date : " + project.dueDate}</span>
                <span className={styles.text1}> { "Assigned to : idris laabidi , fathallah youssef , Miri riri ..."} </span>
            </div>
        </div> }
        
        </>);
}
 
export default Header;