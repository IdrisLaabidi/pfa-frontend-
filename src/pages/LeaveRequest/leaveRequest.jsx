import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/spinner/spinner';
import styles from './leaveRequest.css';
import LoadingModal from '../../components/loadingModal/LoadingModal';
import Cookies from 'js-cookie';

const LeaveRequest = () => {
const token=Cookies.get("token");
const { data: leaves, isPending, error } = useFetch('http://localhost:4000/api/leave/leaves/');
const userIdArray = leaves.map((leave) => leave.concernedUser) || [];
const [user, setUser] = useState(null);
const fetching =async()=>{
  try {
      
    const response = fetch('http://localhost:4000/api/auth/Leaveusers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userIdArray})
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const user = await response.json();
    setUser(user);
    console.log(user);
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  
}
   
    

  return (
    <div className={styles.allLeaves}>
      {error && <div>{error}</div>}
      {isPending && <Spinner />}
      {user && (
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {user?.map(user1 => 
              <tr key={user1.id}>
                <td>{user1.firstName} {user1.lastName}</td>
                <td>{user1.email}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <LoadingModal open={isPending} />
    </div>
  );
};

export default LeaveRequest;

