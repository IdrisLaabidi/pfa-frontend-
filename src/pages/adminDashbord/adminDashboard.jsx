import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css"
import { useEffect } from "react";

const AdminDashboard = () => {

    const navigate = useNavigate()

    const role = localStorage.getItem("role")

    useEffect(() => {
        if(role !== 'admin'){
            navigate('/notAuthorized')
        }
    },[])
   

    return ( <div className={styles.container}>
        halawlh
    </div> );
}
 
export default AdminDashboard;