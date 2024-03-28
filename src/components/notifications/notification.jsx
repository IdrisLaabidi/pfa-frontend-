import styles from './notification.module.css';

const Notifications = ({ notifications }) => {
    return (
      <div className={styles.notifications}>
        {notifications && notifications.map((notif, index) => (
          <div key={index} className={styles.notification}>
            {notif.content}
          </div>
        ))}
      </div>
    );
  }

  export default Notifications;