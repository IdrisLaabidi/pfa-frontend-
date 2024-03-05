import { Link } from "react-router-dom";
import styles from './listItem.module.css';

const ListItem = ({ item }) => {
    return (
        <div className={styles.menuItem}>
            <Link to="#">{item}</Link>
        </div>
    );
}

export default ListItem;
