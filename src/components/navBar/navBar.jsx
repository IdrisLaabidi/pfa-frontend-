import NotifButton from '../notifButton/notifButton';
import UserAccount from '../userAccount/userAccount';
import styles from './navBar.module.css';
import useFetch from '../../hooks/useFetch';
import React, {useState } from 'react';
import Notifications from '../notifications/notification';
import Modal from '../../components/modal/Modal';
import { BeatLoader } from 'react-spinners';


const NavBar = ({title,user,isLoading,error}) => {
  const [isOpen , setIsOpen] = useState(false)
  const id = localStorage.getItem('user_id');
  const role=localStorage.getItem('role');
  const [notification, setNotifications] = useState([]);
  const { data: notif, isPending } = useFetch(`http://localhost:4000/api/notification/notifications/${id}`);

  const handleNotificationClick = () => {
    setIsOpen(true); 
    setNotifications(notif);
   };
    return ( 
        <nav className={styles.navbar}>
          <div className={styles.navbarItem}>{title}</div>
          <div className={styles.side}>
            <input className={styles.Search} type="text" placeholder="Search for something" />
            {role !=="admin" &&  <div>
                <NotifButton onClick={handleNotificationClick} />
           
                <Modal title={"Notifications"}  open={isOpen} onClose={()=>{setIsOpen(false)}}>
                       <div className={styles.container}>
                        {isPending && <BeatLoader></BeatLoader>}
                        {notification.length!==0 && <Notifications notifications={notification} />}
                        {notification.length===0 && <div>No notifications!</div>}
                      </div>
                  </Modal>
             
                </div>
           }
           
          

            <UserAccount user={user} isLoading={isLoading}/>
          </div>
       </nav>
     );
}

export default NavBar;
