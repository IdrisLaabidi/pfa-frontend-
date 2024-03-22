import styles from './leave.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Submit from '../submitButton/submitButton';



const LeavePage = ({token}) => {

  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = ['application/pdf', 'image/png', 'image/jpeg'];

    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert('Invalid file type. Please select a PDF, PNG, or JPG file.');
    }
  };
  const isFormValid = () => {
    return leaveType && startDate && endDate && reason && selectedFile;
  };
  
   
    const handleSubmit =async (e) => {
      e.preventDefault();
      if (!isFormValid()) {
        alert('All fields must be filled in.');
        return;
      }
      console.log('Token: ', token);
    
      const form = {
        leaveType: leaveType,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        file: selectedFile
      };
    
      const formData = new FormData();
      formData.append('leaveType', leaveType);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('reason', reason);
      formData.append('file', selectedFile);
    
      try {
        const response = await fetch('http://localhost:4000/api/leave', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: formData
        });
    
        if (!response.ok) {
          alert('Submission unsuccessful. Please try again.');
        } else {
          const data = await response.json();
          console.log('Form submitted successfully:', data);
          // Redirect or perform other actions upon successful submission
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error accordingly
      }
    };
    
  

  return (
    
    <div className={styles.form}>
        <h1>Leave Application Form</h1>
        <h3>Please provide information about your leave</h3>
        <form>
          
            <label htmlFor="leaveType" className={styles.label}>Leave Type:</label>
            <select
              className={styles.input}
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Choose leave type...</option>
              <option value="sick">Sick Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="normal">Normal Leave</option>
            </select>
          
          
            <label htmlFor="startDate" className={styles.label}>Start Date:</label>
            <input
              className={styles.input}
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          
            <label htmlFor="endDate" className={styles.label}>End Date:</label>
            <input
              className={styles.input}
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
        
            <label htmlFor="reason"  className={styles.label}>Reason:</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
        
        <div className={styles.container}>
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.png,.jpg"
                onChange={handleFileInputChange}
                style={{ display: 'none' }} // Hide the default file input
              
              />
              <label htmlFor="fileInput" className={styles.customButton}>
                Upload
              </label>
              <div
                  className={styles.placeholder}
                  contentEditable={false}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {selectedFile ? selectedFile.name : 'Attach Pdf, Png, Jpg files:'}
              </div>
          </div>
        
         <Submit handleSubmit={handleSubmit}></Submit>
        </form>
    </div>
   
  );
};

export default LeavePage;