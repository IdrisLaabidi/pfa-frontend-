import styles from "./styles.module.css"
import styles1 from '../../components/project/project.module.css'

import { CompactTable } from '@table-library/react-table-library/compact';
import { BeatLoader } from "react-spinners";
import Modal from "../../components/modal/Modal";

import useFetch from "../../hooks/useFetch";
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import DeleteIcon from '../../assets/delete-icon.svg'
import EditIcon from '../../assets/edit-icon.svg'



const AdminDashboard = () => {

    const navigate = useNavigate()
    const [isOpen , setIsOpen] = useState(false)
    const [selectedUser,setSelected] = useState(null)

    const role = localStorage.getItem("role")

    const token = Cookies.get("token")

    useEffect(() => {
        if(role !== 'admin'){
            navigate('/notAuthorized')
        }
    },[])


    const handleDelete = async () => {
        const response = await fetch('http://localhost:4000/api/auth/users/'+selectedUser,{
            method : 'DELETE',
            headers :{
                'Authorization': `Bearer ${token}`
            }
        }) 
        if(! response.ok ) {
            console.log(error)
        }
        if(response.ok){
            console.log('user Deleted')
            navigate(0)
        }
    }

    const COLUMNS = [
        { 
            label: 'Name', 
            renderCell: (item) => <div style={{width: '20%'}}>{item.firstName+' '+item.lastName}</div> 
          },
        { label: 'Email', renderCell: (item) => item.email, className: styles.column2 },
        { label: 'Role', renderCell: (item) => item.role, className: styles.column3 },
        { label : 'Edit' , renderCell : (item) => <button title="Edit user" className={styles1.button} onClick={() => {
            sessionStorage.setItem("selectedUser",JSON.stringify(item))
            navigate("/admin/profile")
        }}>
                <img alt="icon" src={EditIcon} className={styles.icon} />
            </button>, className: styles.column4},
        { label : 'Delete' , renderCell : (item) => <button title="Delete user" className={styles1.button} onClick={() =>{setIsOpen(true) ; setSelected(item._id);}} >
            <img alt="icon" src={DeleteIcon} className={styles.icon} />
        </button>, className: styles.column4}
      ];

    const materialTheme = getTheme(DEFAULT_OPTIONS);
    const theme = useTheme(materialTheme);

    const {data :nodes  ,isPending,error} =useFetch('http://localhost:4000/api/auth/users')
    let data
    if(nodes){
        data ={nodes}
    } 
    
    return ( <div className={styles.container}>
        {data && <CompactTable columns={COLUMNS} data={data} theme={theme}/>}
        {isPending && <BeatLoader color="#ffffff"></BeatLoader>}
        <Modal className={styles1.deletemodal} open={isOpen} onClose={() => setIsOpen(false)} title='Delete user'>
                <div className={styles1.msg}>Are you sure you want to delete the user ?</div>
                <div className={styles1.buttons}>
                    <button className={styles1.deletebutton} onClick={handleDelete}>Delete</button>
                    <button className={styles1.cancelbutton} onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
        </Modal>
    </div> );
}
 
export default AdminDashboard;