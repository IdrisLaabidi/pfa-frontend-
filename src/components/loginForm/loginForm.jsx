import InputField from "../inputField/inputField"
import { useState } from "react"
import emailIcon from '../../assets/email-icon.svg'
import pwdIcon from '../../assets/password-icon.svg'
import styles from './loginForm.module.css'
import { useNavigate } from "react-router"
import Modal from '../modal/Modal'


const LoginForm = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isOpen,setIsOpen] = useState(false)
    const [error,setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {email ,password }
        try {
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials : "include"
            });
            const json = await response.json();
            
            if(!response.ok){
                console.log(json.message)
                setError(json.message)
                setIsOpen(true)
            }
            if(response.ok){
                console.log("user logged in" , json)
                localStorage.setItem("user_id",json.user._id)
                sessionStorage.setItem("user",JSON.stringify(json.user))
                navigate('/')
            }
            
        } catch (err) {
            console.log(err.message)
            setError("Unexpected error occured")
            setIsOpen(true)
        }
          
    }

    return (<>
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <span className={styles.label}>Email address</span>
                <InputField 
                    icon={emailIcon} 
                    type="email"
                    value={email}
                    required
                    onChange={(e) => {setEmail(e.target.value)}}
                    placeholder="example@email.com"
                />
                <span className={styles.label}>Password</span>
                <InputField 
                    icon={pwdIcon} 
                    type="password"
                    value={password}
                    required={true}
                    onChange={(e) => {setPassword(e.target.value)}}
                    placeholder="Enter your password"
                />
                <a>Forgot password?</a>
                <button className={styles.loginButton} onClick={handleSubmit}>Login now</button>
            </form>
        </div>
        <Modal title='Warning' open={isOpen} onClose={()=>{
            setError(null)
            setIsOpen(false)
        }}><span className={styles.error}>Failed to Log in : {error}</span></Modal>
    </>);
}
 
export default LoginForm;