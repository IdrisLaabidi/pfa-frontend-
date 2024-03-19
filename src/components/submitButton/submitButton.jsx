import styles from './submitButton.module.css'

const Submit = ({handleSubmit}) => {
    return ( <div className={styles.submitbutton} onClick={handleSubmit}>Submit</div> );
}
 
export default Submit;