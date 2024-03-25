
import styles1 from '../../components/project/project.module.css'
import styles from './leaveRequest.module.css'

import { CompactTable } from '@table-library/react-table-library/compact';
import { BeatLoader } from "react-spinners";
import ProgressBar from '@ramonak/react-progress-bar';
import LoadingModal from '../../components/loadingModal/LoadingModal';

import fromIcon from '../../assets/form-icon.svg'

import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';
import Cookies from 'js-cookie';



const LeaveRequest = () => {
  const token = Cookies.get("token");

  const { data: nodes, isPending, error } = useFetch('http://localhost:4000/api/leave/leaves/');
  let data
  if(nodes){
    
    data={nodes}
  
  }
 
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([materialTheme , {
    Table: `
      --data-table-library_grid-template-columns:  20% 32% 10% 30% 8%;
    `,
}]);

  const columns = [
    { label: 'Name', renderCell: (leave) => `${leave.concernedUser.firstName} ${leave.concernedUser.lastName}` },
    { label: 'Email', renderCell: (leave) => leave.concernedUser.email },
    {label: 'Request Date' , renderCell: (leave)=>format(new Date(leave.createdAt), 'dd/MM/yyyy') },
    {label :'leave Count' , renderCell :(leave => <ProgressBar 
        completed={leave.concernedUser.leaveCount.toString()} 
        maxCompleted="90"
        bgColor='#08639c'
        ></ProgressBar>)},
    {label : 'details' , renderCell : leave => <button title='show details' className={styles.buttn}>
      <img className={styles.icon} alt='details' src={fromIcon}></img>
    </button>}
    
  ];

  return (
    <div className={styles.container}>
      {data && <CompactTable columns={columns} data={data} theme={theme} layout={{ fixedHeader: true , custom :true}}/>}
      {isPending && <BeatLoader color="#ffffff"></BeatLoader>}
      
      <LoadingModal open={data === null} />
    </div>
  );
};

export default LeaveRequest;