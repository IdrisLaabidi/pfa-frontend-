import InputField from '../inputField/inputField';
import styles from './taskForm.module.css'
import titleIcon from '../../assets/title-icon.svg'
import whiteDateIcon from '../../assets/date-icon-white.svg'
import { useState } from 'react';
import Select from 'react-select';
import Cookies from 'js-cookie';
import useFetch from '../../hooks/useFetch';
import Submit from '../submitButton/submitButton';
import Reset from '../restButton/resetButton';
import { useNavigate } from 'react-router';


//handle button styles
const buttonStyle = (priority , ok) => {
    if (priority === 'low' && ok){
        return {
            backgroundColor : '#4BA665',
            border : '1px solid #4BA665',
            color : '#ffffff'
        }
    }
    if (priority === 'low' ){
        return {
            backgroundColor : '#ffffff',
            border : '1px solid #4BA665',
            color : '#4BA665'
        }
    }
    if (priority === 'medium' && ok){
        return {
            backgroundColor : 'rgb(245, 188, 15)',
            border : '1px solid rgb(245, 188, 15)',
            color : '#ffffff'
        }
    }
    if (priority === 'medium' ){
        return {
            backgroundColor : '#ffffff',
            border : '1px solid rgb(245, 188, 15)',
            color : 'rgb(245, 188, 15)'
        }
    }
    if (priority === 'high' && ok){
        return {
            backgroundColor : '#F06A6A',
            border : '1px solid #F06A6A',
            color : '#ffffff'
        }
    }
    if (priority === 'high' ){
        return {
            backgroundColor : '#ffffff',
            border : '1px solid #F06A6A',
            color : '#F06A6A'
        }
    }
}

//handle select styles
const customStyles = {
    control: (provided) => ({
        ...provided,
        maxWidth: '270px',
        marginTop: '5%',
        cursor: 'pointer',
    }),
}

const TaskForm = ({project ,onSubmit}) => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        assignedTo: [],
        priority : 'medium',
        project : project._id

    })

    const handleSelectChange = (selectedOption) => {
        setForm({...form, assignedTo: selectedOption.map(option => option.value._id)});
    }

    const token = Cookies.get("token")
    //fetch users from db
    const {data: users, isPending, error} = useFetch('http://localhost:4000/api/auth/users', token)
    //store users in an array
    const members = users?.filter(user => user.role === 'member')
    const userlist = members? members?.map(user => (
       {value:user, label: `${user.firstName} ${user.lastName}`}
    )) : [];

    const handleSubmit = (e) => {
        e.preventDefault()
        // Verify wether the task's dueDate is posterior to the project's dueDate
        if (new Date(form.dueDate) > new Date(project.dueDate)) {
            alert("Choose a date before the project's due date");
            return;
        }
        fetch('http://localhost:4000/api/task/createtask/',{
           headers :{ 
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
           method : 'POST',
           body :JSON.stringify({task :form ,id :project._id})
        }).then(response => {
            if(!response.ok){
                alert('creation failed !please try again')
            }
            if(response.ok){
                console.log('task created :',response.json)
                onSubmit(); navigate(0);
            }
        }).catch(error => {
            alert('oops faild to connect to the api')
            console.log(error)
        })
        
    }

    return ( <div className={styles.container}>
        <form className={styles.form}>
            <div className={styles.fields}>
                <label className={styles.inputtitle}>Title</label>
                <InputField type='text'
                            placeholder='Title...'
                            required
                            icon = {titleIcon}
                            value={form.title}
                            onChange={(e) => {setForm({...form ,title : e.target.value })}}
                />
                <label className={styles.inputtitle}>Description</label>
                <textarea 
                    className={styles.grandentree} 
                    placeholder="Description..." 
                    value={form.description}
                    onChange={(e) => {setForm({...form ,description : e.target.value })}}
                ></textarea>
                <label className={styles.inputtitle}>Due Date</label>
                        <InputField
                            className={styles.entree}
                            type='date'
                            required
                            icon = {whiteDateIcon}
                            value={form.dueDate}
                            onChange={(e) => {setForm({...form ,dueDate : e.target.value })}}
                        />   
                <label className={styles.inputtitle}>Priority</label>
                <div className={styles.priorityCont}>
                    <button 
                        className={styles.pbuttn}
                        onClick={(e) => {e.preventDefault()
                            setForm({...form , priority:"high"})
                        }}
                        style={buttonStyle("high",form.priority === 'high')}
                    >High</button>
                    <button 
                        className={styles.pbuttn}
                        onClick={(e) => {e.preventDefault()
                            setForm({...form , priority:"medium"})
                        }}
                        style={buttonStyle("medium",form.priority === 'medium')}
                    >Medium</button>
                    <button 
                        className={styles.pbuttn}
                        onClick={(e) => {e.preventDefault()
                            setForm({...form , priority:"low"})
                        }}
                        style={buttonStyle("low",form.priority === 'low')}
                    >Low</button>
                </div>      
            </div>
            <div className={styles.divider}></div>
            <div className={styles.users}>
                <div className={styles.flex}>
                    <label className={styles.inputtitle}>Assign To</label>
                    {error && <div>{error}, please try again later!</div>}
                    {users && <Select
                                options={userlist}
                                placeholder='Select users...'
                                isMulti
                                styles={customStyles}
                                onChange={handleSelectChange}
                            />}   
                </div>
                <div className={styles.flec}>
                    <Reset handleSubmit={e => {
                        e.preventDefault()
                        setForm({
                            title: '',
                            description: '',
                            dueDate: '',
                            assignedTo: [],
                            priority : 'medium' 
                        })
                    }}/>
                    <Submit handleSubmit={(e) => {handleSubmit(e);} }/>
                </div>
            </div>
        </form>
    </div> );
}
 
export default TaskForm;