import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/spinner/spinner';
import styles from './leaveRequest.css';
import LoadingModal from '../../components/loadingModal/LoadingModal';

const LeaveRequest = () => {
 
const { data: leaves, isPending, error } = useFetch('http://localhost:4000/api/leave/leaves/');

 const userIdArray = leaves?.map((leave) => leave.concernedUser) || [];

  const FetchUser = (userId) => {
    const { data, isPending, error } = useFetch('http://localhost:4000/api/auth/users/${userId}');
    return { userData: data, isLoading: isPending, userError: error };
  };

  const users = userIdArray.map(userId => FetchUser(userId));

  return (
    <div className={styles.allLeaves}>
      {error && <div>{error}</div>}
      {isPending && <Spinner />}
      {users && (
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => 
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
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

