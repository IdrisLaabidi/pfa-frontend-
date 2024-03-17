import React from 'react';
import styles from './project.module.css';

const Project = ({ children }) => {
    return (
        <div className={styles.Projet}>
            <h2 className={styles.Name}>{children.name}</h2>
            <p className={styles.Details}>Start date: {children.startDate}</p>
            <p className={styles.Details}>Due date: {children.dueDate}</p>
        </div>
    );
}

export default Project;

/* 

<p className={styles.Details}>Assigned tasks: {assignedTasks}</p> */