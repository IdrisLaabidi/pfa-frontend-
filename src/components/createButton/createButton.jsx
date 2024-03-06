import styles from './createButton.module.css'
import icon from '../../assets/plus-icon.svg'

const CreateButton = () => {
    return ( 
        <button className={styles.create}>
            <figure className={styles.iconContainer}>
                <img className={styles.icon} src={icon}alt='taswira'></img>
            </figure>
            <span className={styles.text}>create a new project</span>
        </button>
     );
}
 
export default CreateButton;
