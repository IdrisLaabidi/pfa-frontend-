
import styles from './login.module.css' //import the css module 
import '../../Themes/Themes'
//import images 
import logo from '../../assets/logo.png'
import image from '../../assets/loginPageImage.jpg'
import InputField from '../../components/inputField/inputField'
import emailIcon from '../../assets/email-icon.svg'
import passwordIcon from '../../assets/password-icon.svg'

const LoginPage = () => {
    return (  
        <>
            <div className={styles.container}>
                <div className={styles.formContainer}> 
                    <img className={styles.logo} src={logo} alt="logo"  />
                    <InputField type="email" icon={emailIcon} placeholder="email" />
                    <InputField type="password" icon={passwordIcon} placeholder="password" />
                </div>
                <figure>
                    <img className={styles.image} src={image} alt="zina"/>
                </figure>
            </div>
        </>
    );
}
 
export default LoginPage;