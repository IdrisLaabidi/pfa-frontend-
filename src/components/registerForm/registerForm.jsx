//import components
import InputField from '../inputField/inputField'
//import css styles
import styles from './registerForm.module.css'
//import icons
import userIcon from '../../assets/user-icon.svg'
import emailIcon from '../../assets/email-icon.svg'
import pwdIcon from '../../assets/password-icon.svg'

import { useState } from 'react';
import { useNavigate } from 'react-router'


const RegisterForm = () => {

    const navigate = useNavigate()

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[confirmPwd,setConfirmPdw] = useState("") //for password confirmation field
    const[fname,setFname] = useState("") //first name
    const[lname,setLname] = useState("") //first name
    const[role,setRole] = useState("member")

    const handleSubmit = async (e) => {
        e.preventDefault()
        let userName = fname +'_'+lname
        let firstName = fname
        let lastName = lname
        const user = {email ,userName ,firstName , lastName,password ,role}

        if(password !== confirmPwd){
            alert('confirm password')
        }
        try{
            const response = await fetch('http://localhost:4000/api/auth/createuser',{
                method : 'POST',
                body : JSON.stringify(user),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const json = await response.json()

            if(!response.ok){
                alert('Something wrong registration unsuccessful!please try again')
            }
            if(response.ok){
                console.log("user added" , json)
                navigate('/Home', { state: { user: json } })
            }
        }catch(err){
            alert('oops faild to connect to the api')
        }

    }

    return ( 
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <span className={styles.label}>Full Name</span>
                <div className={styles.firstLine}>
                    <InputField
                        value={fname}
                        onChange={(e) => {setFname(e.target.value)}}
                        icon={userIcon}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <InputField
                        value={lname}
                        onChange={(e) => {setLname(e.target.value)}}
                        icon={userIcon}
                        type="text"
                        placeholder="LastName"
                        required
                    />
                </div>
                <span className={styles.label}>Email</span>
                <InputField
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    icon={emailIcon}
                    type="email"
                    placeholder="example@email.com"
                    required
                />
                <span className={styles.label}>Password</span>
                <InputField
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    icon={pwdIcon}
                    type="password"
                    placeholder="Enter your password"
                    required
                />
                <span className={styles.label}>Confirm password</span>
                <InputField
                    value={confirmPwd}
                    onChange={(e) => {setConfirmPdw(e.target.value)}}
                    icon={pwdIcon}
                    type="password"
                    placeholder="Enter your password"
                    required
                />
                <span className={styles.label}>Register As</span>
                <div className={styles.roleCont}>
                    <button 
                        className={`${role === 'leader' ? `${styles.activeRoleButton}` :`${styles.roleButton}` }`}
                        onClick={ (e) => {e.preventDefault();
                            setRole("leader");} }
                    >Project Manager</button>
                    <button 
                        className={`${role === 'member' ? `${styles.activeRoleButton}` :`${styles.roleButton}` }`}
                        onClick={ (e) => {e.preventDefault();
                            setRole("member");} }
                    >Member</button>
                </div>
                <button className={styles.registerButton}>Register</button>
            </form>
        </div>
     );
}
 
export default RegisterForm;