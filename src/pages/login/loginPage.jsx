
import styles from './login.module.css' //import the css module 
//import images 
import logo from '../../assets/logo.png'
import image from '../../assets/loginPageImage.jpg'

const LoginPage = () => {
    return (  
        <>
            <div className={styles.container}>
                <div className={styles.formContainer}> 
                    <img className={styles.logo} src={logo} alt="logo"  />
                </div>
                <figure>
                    <img className={styles.image} src={image} alt="zina"/>
                </figure>
            </div>
        </>
    );
}
 
export default LoginPage;