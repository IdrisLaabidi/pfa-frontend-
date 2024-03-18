import React from 'react';
import useFetch from '../../hooks/useFetch';
import Project from '../../components/project/project';
import styles from './dashboardPage.module.css'

const ProjectPage = ({ token }) => {
  const { data: projects, isPending, error } = useFetch('http://localhost:4000/api/projects', token);

  return (
    <div className={styles.allProjects}>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {projects && projects.map(project => (
        <Project children={project}/>
      ))}
      {console.log(token)}
    </div>
  );
}

export default ProjectPage;
