//importing libraries and components
import React, { useState } from 'react';
import styles from './newProjectForm.module.css'
import useFetch from '../../hooks/useFetch';
import Select from 'react-select';
import InputField from '../inputField/inputField';
//importing icons
import titleIcon from '../../assets/title-icon.svg'
import whiteDateIcon from '../../assets/date-icon-white.svg'
import Submit from '../submitButton/submitButton';
import { useNavigate } from 'react-router';



const NewProjectForm = ({token}) => {
    
    //initializing navigate
    const navigate = useNavigate();

    //send form to db
    const [form, setForm] = useState({
        name: '',
        description: '',
        startDate: '',
        dueDate: '',
        team: [],
        manager: localStorage.getItem("user_id"),

    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Token: ', token)
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
            if(!response.ok){
                alert('Registration unsuccessful!please try again')
            }
            if(response.ok){
                console.log("project added" , data)
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelectChange = (selectedOption) => {
        setForm({...form, team: selectedOption.map(option => option.value)});
    }

    //fetch users from db
    const {data: users, isPending, error} = useFetch('http://localhost:4000/api/auth/users', token)

    //store users in an array
    const members = users?.filter(user => user.role === 'member')
    const userlist = members? members?.map(user => (
       {value:user, label: `${user.firstName} ${user.lastName}`}
    )) : [];
    /*console.log all users fetched from db
    console.log(users)*/

    //custom style for <Select/> component
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
            <form className={styles.middlediv}>
                <div className={styles.submiddlediv}>
                    <div className={styles.projectinfo}>
                        <label className={styles.inputtitle}>Title</label>
                        <InputField
                            className={styles.entree}
                            type='text'
                            placeholder='Title...'
                            required
                            icon = {titleIcon}
                            value={form.name}
                            onChange={(e) => {setForm({...form, name: e.target.value})}}
                        />
                        
                        <label className={styles.inputtitle}>Description</label>
                        <textarea className={styles.grandentree} 
                            placeholder="Description..." 
                            value={form.description}
                            onChange={(e) => {setForm({...form, description: e.target.value})}}/>

                        <label className={styles.inputtitle}>Start Date</label>
                        <InputField
                            className={styles.entree}
                            type='date'
                            placeholder={Date.now}
                            required
                            icon = {whiteDateIcon}
                            value={form.startDate}
                            onChange={(e) => {setForm({...form, startDate: e.target.value})}}
                        />
                        <label className={styles.inputtitle}>Due Date</label>
                        <InputField
                            className={styles.entree}
                            type='date'
                            placeholder={Date.now.toString}
                            required
                            icon = {whiteDateIcon}
                            value={form.dueDate}
                            onChange={(e) => {setForm({...form, dueDate: e.target.value})}}
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
                <Submit handleSubmit={e => {handleSubmit(e)}}></Submit>
            </form>
         </div>
        
     );
}
 
export default NewProjectForm;
