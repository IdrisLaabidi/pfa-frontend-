import React from 'react';
import useFetch from '../../hooks/useFetch';
import Project from '../../components/project/project';

const HomePage = ({ token }) => {
  const { data: projects, isPending, error } = useFetch('http://localhost:4000/api/project', token);

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {projects && projects.map(project => (
        <Project children={project}/>
      ))}
      {console.log(token)}
    </div>
  );
}

export default HomePage;
