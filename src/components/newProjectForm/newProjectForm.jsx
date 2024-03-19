import React, { useState } from 'react';
import styles from './newProjectForm.module.css'
import useFetch from '../../hooks/useFetch';
import Select from 'react-select';
import InputField from '../inputField/inputField';
//importing icons
import titleIcon from '../../assets/title-icon.svg'
import whiteDateIcon from '../../assets/date-icon-white.svg'
import Submit from '../submitButton/submitButton';



const NewProjectForm = ({token}) => {
    //send form to db
    const [form, setForm] = useState({
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        collaborators: [],
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/projects',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSelectChange = (selectedOption) => {
        setForm({...form, collaborators: selectedOption.map(option => option.value)});
    }



    //fetch users from db
    const {data: users, isPending, error} = useFetch('http://localhost:4000/api/auth/users', token)
    //store users in an array
    const userlist = users? users.map(user => (
       {value:user, label: `${user.firstName} ${user.lastName}`}
    )) : [];
    console.log(users)
    //custom style for <Select/>
    const customStyles = {
        control: (provided) => ({
            ...provided,
            maxWidth: '270px',
            marginTop: '5%',
            cursor: 'pointer',
        }),
    }
    //project form
    return (
        <div className={styles.maindiv}>
            <h2 className={styles.divhead}>New Project</h2>
            <div className={styles.middlediv}>
                <div className={styles.submiddlediv}>
                    <div className={styles.projectinfo}>
                        <label className={styles.inputtitle}>Title</label>
                        <InputField
                            className={styles.entree}
                            type='text'
                            placeholder='Title...'
                            required
                            icon = {titleIcon}
                            onChange={handleChange}
                        />
                        
                        <label className={styles.inputtitle}>Description</label>
                        <textarea className={styles.grandentree} placeholder="Description..." onChange={handleChange}></textarea>

                        <label className={styles.inputtitle}>Start Date</label>
                        <InputField
                            className={styles.entree}
                            type='date'
                            placeholder={Date.now}
                            required
                            icon = {whiteDateIcon}
                            onChange={handleChange}
                        />
                        <label className={styles.inputtitle}>Due Date</label>
                        <InputField
                            className={styles.entree}
                            type='date'
                            placeholder={Date.now.toString}
                            required
                            icon = {whiteDateIcon}
                            onChange={handleChange}
                        />                    
                    </div>
                    <div className={styles.projectcollaborators}>
                        <label className={styles.inputtitle}>Project collaborators</label>
                        {error && <div>{error}, please try again later!</div>}
                        {users && <Select
                            options={userlist}
                            placeholder='Select collaborators...'
                            isMulti
                            styles={customStyles}
                            onChange={handleSelectChange}
                        />}   
                            
                    </div>
                </div>
                <Submit></Submit>
            </div>
            
        </div>
        
     );
}
 
export default NewProjectForm;
