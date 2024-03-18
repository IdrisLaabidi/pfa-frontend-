import React from 'react';
import styles from './project.module.css';
import {format} from 'date-fns';

const Project = ({ children }) => {
    return (
        <div className={styles.Projet}>
            <h2 className={styles.Name}>{children.name}</h2>
            <p className={styles.Details}>{children.description}</p>
            <p className={styles.Details}>Start date: {format(new Date(children.startDate), 'dd/MM/yyyy')}</p>
            <p className={styles.Details}>Due date: {format(new Date(children.dueDate), 'dd/MM/yyyy')}</p>
        </div>
    );
}

export default Project;

/* 

<p className={styles.Details}>Assigned tasks: {assignedTasks}</p> */