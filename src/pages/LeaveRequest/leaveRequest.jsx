import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/spinner/spinner';
import styles from './leaveRequest.css';
import LoadingModal from '../../components/loadingModal/LoadingModal';
import Cookies from 'js-cookie';

const LeaveRequest = () => {
  const token = Cookies.get("token");

  const [user, setUser] = useState(null);

  const url = 'http://localhost:4000/api/auth/Leaveusers';

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetching(); // Call the fetching function
  }, [token]);

  return (
    <div className={styles.allLeaves}>
      {user ? (
        Array.isArray(user) && user.length > 0 ? (
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {user.map(user1 => (
                <tr key={user1.id}>
                  <td>{user1.firstName} {user1.lastName}</td>
                  <td>{user1.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No users found</div>
        )
      ) : (
        <Spinner />
      )}

      <LoadingModal open={user === null} />
    </div>
  );
};

export default LeaveRequest;