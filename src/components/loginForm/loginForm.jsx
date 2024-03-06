import InputField from "../inputField/inputField";
import { useState } from "react";
import emailIcon from '../../assets/email-icon.svg';
import pwdIcon from '../../assets/password-icon.svg';
import styles from './loginForm.module.css';
import { useNavigate } from "react-router";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const user = { email, password };
        try {
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (!response.ok) {
                
                const errorMessage = json.message || 'Login failed! Please try again.';
                alert(errorMessage);
                return;
            }

            localStorage.setItem("token", json.token);
            localStorage.setItem("userName",json.user.userName);
            localStorage.setItem("FirstName",json.user.FirstName);
            localStorage.setItem("lastName",json.user.lastName);
            localStorage.setItem("email",json.user.email);
            localStorage.setItem("role",json.user.role);
            localStorage.setItem("isActive",json.user.isActive);
            console.log(localStorage.getItem("token"));
            window.location.reload();
        } catch (err) {
            alert('Oops! Failed to connect to the API.');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <span className={styles.label}>Email address</span>
                <InputField
                    icon={emailIcon}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                />
                <span className={styles.label}>Password</span>
                <InputField
                    icon={pwdIcon}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                <a href="/forgot-password">Forgot password?</a>
                <button type="submit" className={styles.loginButton}>Login now</button>
            </form>
        </div>
    );
};

export default LoginForm;