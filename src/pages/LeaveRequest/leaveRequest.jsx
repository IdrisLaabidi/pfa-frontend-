
import styles1 from '../../components/project/project.module.css'

import { CompactTable } from '@table-library/react-table-library/compact';
import { BeatLoader } from "react-spinners";
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';


import LoadingModal from '../../components/loadingModal/LoadingModal';
import Cookies from 'js-cookie';


const LeaveRequest = () => {
  const token = Cookies.get("token");

  const { data: nodes, isPending, error } = useFetch('http://localhost:4000/api/leave/leaves/');
  let data
  if(nodes){
    
    data={nodes}
  
  }
 
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const columns = [
    { label: 'Name', renderCell: (leave) => `${leave.concernedUser.firstName} ${leave.concernedUser.lastName}` },
    { label: 'Email', renderCell: (leave) => leave.concernedUser.email },
    {label: 'Request Date' , renderCell: (leave)=>format(new Date(leave.createdAt), 'dd/MM/yyyy') }
    
  ];

  return (
    <div className={styles1.container}>
      {data && <CompactTable columns={columns} data={data} theme={theme}/>}
      {isPending && <BeatLoader color="#ffffff"></BeatLoader>}
      <LoadingModal open={data === null} />
    </div>
  );
};

export default LeaveRequest;