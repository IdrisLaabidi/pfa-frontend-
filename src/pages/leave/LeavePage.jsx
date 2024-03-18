import React, { useState } from 'react';
import styles from './leave.module.css'

const LeavePage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { leaveType, startDate, endDate, reason, selectedFile });
  };

  return (
    
    <div className={styles.form}>
      <h1>Leave Application Form</h1>
      <h3>Please provide information about your leave</h3>
      <form onSubmit={handleSubmit}>
        
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
       
          <label htmlFor="fileInput" className={styles.label}>Attach Pdf, Png, Jpg files:</label>
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.png,.jpg"
            onChange={handleFileInputChange}
          />
       
        <button type="submit"  className={styles.submit}>Submit</button>
      </form>
    </div>
   
  );
};

export default LeavePage;