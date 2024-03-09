import InputField from "../inputField/inputField"
import { useState } from "react"
import emailIcon from '../../assets/email-icon.svg'
import pwdIcon from '../../assets/password-icon.svg'
import styles from './loginForm.module.css'
import { useNavigate } from "react-router"

const LoginForm = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {email ,password }

        try{
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method : 'POST',
                credentials: 'include',
                body : JSON.stringify(user),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const json = await response.json()

            if(!response.ok){
                alert('Login failed !please try again')
            }
            if(response.ok){
                console.log("user logged in" , json)
                localStorage.setItem("token",json.token)
                console.log(json.token)
                navigate('/Home',{state : {auth : json}})
            }
        }catch(err){
            alert('oops faild to connect to the api')
        }
    }

    return ( 
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <span className={styles.label}>Email address</span>
                <InputField 
                    icon={emailIcon} 
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    placeholder="example@email.com"
                />
                <span className={styles.label}>Password</span>
                <InputField 
                    icon={pwdIcon} 
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    placeholder="Enter your password"
                />
                <a>Forgot password?</a>
                <button className={styles.loginButton} onClick={handleSubmit}>Login now</button>
            </form>
        </div>
     );
}
 
export default LoginForm;