//import components
import InputField from '../inputField/inputField'
//import css styles
import styles from './registerForm.module.css'
//import icons
import userIcon from '../../assets/user-icon.svg'
import emailIcon from '../../assets/email-icon.svg'
import pwdIcon from '../../assets/password-icon.svg'

import { useState } from 'react';

const RegisterForm = () => {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[confirmPwd,setConfirmPdw] = useState("") //for password confirmation field
    const[fname,setFname] = useState("") //first name
    const[lname,setLname] = useState("") //first name
    const[role,setRole] = useState("")


    return ( 
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <span className={styles.label}>Full Name</span>
                <div className={styles.firstLine}>
                    <InputField
                        value={fname}
                        onChange={(e) => {setFname(e.target.value)}}
                        icon={userIcon}
                        type="text"
                        placeholder="First Name"
                    />
                    <InputField
                        value={lname}
                        onChange={(e) => {setLname(e.target.value)}}
                        icon={userIcon}
                        type="text"
                        placeholder="LastName"
                    />
                </div>
                <span className={styles.label}>Email</span>
                <InputField
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    icon={emailIcon}
                    type="email"
                    placeholder="example@email.com"
                />
                <span className={styles.label}>Password</span>
                <InputField
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    icon={pwdIcon}
                    type="password"
                    placeholder="Enter your password"
                />
                <span className={styles.label}>Confirm password</span>
                <InputField
                    value={confirmPwd}
                    onChange={(e) => {setConfirmPdw(e.target.value)}}
                    icon={pwdIcon}
                    type="password"
                    placeholder="Enter your password"
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