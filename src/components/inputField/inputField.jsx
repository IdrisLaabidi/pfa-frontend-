import styles from './input.module.css'
//import icon from '../../assets/email-icon.svg'
import PropTypes from 'prop-types'



const InputField = (props) => {
    return ( 
        <div className={styles.container}>
            <input className={styles.input} type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value}></input>
            <div className={styles.iconContainer}>
                <img className={styles.image} src={props.icon} alt='icon'></img>
            </div>
        </div>
     );
}
InputField.propTypes= {
    type: PropTypes.string,
    placeholder : PropTypes.string,
    icon : PropTypes.object.isRequired,
    onChange : PropTypes.func,
    value : PropTypes.string
};
 
export default InputField;

