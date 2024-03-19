import React from 'react';
import styles from './newProjectForm.module.css'
import useFetch from '../../hooks/useFetch';
import Select from 'react-select';
const NewProjectForm = ({token}) => {

    const {data: users, isPending, error} = useFetch('http://localhost:4000/api/auth/users', token)
    const userlist = users? users.map(user => (
       {value:user, label: `${user.firstName} ${user.lastName}`}
    )) : [];
    console.log(users)

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%',
            cursor: 'pointer',
        }),
    }

    return (
        <div className={styles.maindiv}>
            <h2 className={styles.divhead}>New Project</h2>
            <div className={styles.middlediv}>
                <div className={styles.submiddlediv}>
                    <div className={styles.projectinfo}>
                        <label className={styles.inputtitle}>Title</label>
                        <input className={styles.entree} type="text" placeholder="Title..."/>
                        
                        <label className={styles.inputtitle}>Description</label>
                        <textarea className={styles.grandentree} placeholder="Description..."></textarea>

                        <label className={styles.inputtitle}>Start Date</label>
                        <input className={styles.entree} type="date" placeholder='mm/dd/yyyy'/>

                        <label className={styles.inputtitle}>Due Date</label>
                        <input className={styles.entree} type="date" placeholder='mm/dd/yyyy'/>
                    </div>
                    <div className={styles.projectcollaborators}>
                        <label className={styles.inputtitle}>Project collaborators</label>
                        {error && <div>{error}, please try again later!</div>}
                        {users && <Select
                            options={userlist}
                            placeholder='Select collaborators...'
                            isMulti
                            styles={customStyles}
                        />}   
                            
                    </div>
                </div>
                <div className={styles.submitbutton}>Submit</div>
            </div>
            
        </div>
        
     );
}
 
export default NewProjectForm;
