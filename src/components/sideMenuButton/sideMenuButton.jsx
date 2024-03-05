import styles from './sideMenuButton.module.css'

const SideMenuButton = ({text, icon}) => {
    return ( 
        <button>
            <img className={styles.icone} src={icon}/>
            <p className={styles.texte}>{text}</p>
        </button>
     );
}
 
export default SideMenuButton;