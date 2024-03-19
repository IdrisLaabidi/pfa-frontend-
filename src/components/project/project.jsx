import React from 'react';
import styles from './project.module.css';
import {format} from 'date-fns';
import { useNavigate } from 'react-router';

const Project = ({ data }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.Projet} 
        onClick={() => {
            navigate('/tasks', { state : { project : data}});
            console.log(data);}}>
            <h2 className={styles.Name}>{data.name}</h2>
            <p className={styles.Details}>{data.description}</p>
            <p className={styles.Details}>Start date: {format(new Date(data.startDate), 'dd/MM/yyyy')}</p>
            <p className={styles.Details}>Due date: {format(new Date(data.dueDate), 'dd/MM/yyyy')}</p>
        </div>
    );
}

export default Project;

/* <p className={styles.Details}>Assigned tasks: {assignedTasks}</p> */