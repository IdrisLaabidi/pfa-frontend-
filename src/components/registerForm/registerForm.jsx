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
import useRegister from '../../hooks/useRegister'


const RegisterForm = () => {

    const navigate = useNavigate()
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[confirmPwd,setConfirmPdw] = useState("") 
    const[fname,setFname] = useState("") 
    const[lname,setLname] = useState("") 
    const[role,setRole] = useState("member")
    const {register,error} = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault()
        register(fname, lname, email, role, password, confirmPwd);
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