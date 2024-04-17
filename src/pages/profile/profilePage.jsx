import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useConnect from '../../hooks/useConnect';
import InputField from '../../components/inputField/inputField';
import DropDownList from '../../components/dropDownList/DropDownList';
import LoadingModal from '../../components/loadingModal/LoadingModal';
import emailIcon from '../../assets/email-icon.svg';
import userIcon from '../../assets/user-icon.svg';
import pwdIcon from '../../assets/password-icon.svg';
import styles from './profilePage.module.css';

const ProfilePage = () => {
    const types = ['image/png', 'image/jpeg']; // image types
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [user, isPending, error] = useConnect();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPending && user) {
            const { firstName, lastName, email } = user;
            setFirstName(firstName || "");
            setLastName(lastName || "");
            setEmail(email || "");
        }
    }, [user, isPending]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (!(file && types.includes(file.type))) {
            alert('Please select a valid image type (jpg or png)');
            return;
        }
        const reader = new FileReader();
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxFileSize) {
            alert('Picture size should not exceed 5MB');
            return;
        }
        reader.onloadend = () => {
            setProfilePicture(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const saveChangesHandler = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                throw new Error('User ID is not found. Please log in again');
            }
            if (newPassword !== confirmNewPassword) {
                throw new Error('New password does not match. Please check your password again');
            }
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('You are not logged in. Please log in again');
            }
            const updatedUserData = {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                email: email || user.email,
                currentPassword,
                newPassword,
                profilePicture
            };
            const url = `http://localhost:4000/api/auth/users/${userId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUserData),
            });
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid request. Please check your information again');
                } else if (response.status === 401) {
                    throw new Error('You are not authorized');
                } else if (response.status === 404) {
                    throw new Error('User not found');
                } else {
                    throw new Error('An unexpected error occurred');
                }
            }
            Cookies.remove('token');
            navigate(0);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.profilePageContainer}>
            <LoadingModal open={isPending} />
            <div className={styles.profilePictureContainer}>
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className={styles.profilePicture} />
                ) : (
                    <div className={styles.defaultProfilePicture}>Default Pic</div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className={styles.profilePictureInput}
                />
            </div>
            <div className={styles.inputRow}>
                <div className={styles.inputContainer}>
                    <span className={styles.label}>FIRST NAME</span>
                    <InputField 
                        icon={userIcon} 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <span className={styles.label}>LAST NAME</span>
                    <InputField 
                        icon={userIcon} 
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.inputRow}> 
                <div className={styles.inputContainer}>
                    <span className={styles.label}>EMAIL</span>
                    <InputField 
                        icon={emailIcon} 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    &nbsp;
                </div>
            </div>
            <div className={styles.inputContainer}>
                <span className={styles.label}>GENDER</span>
                <DropDownList 
                    options={[{ value: 'male', label: 'Male' },{ value: 'female', label: 'Female' }]} 
                    placeholder='Select your gender'
                />
            </div>
            <hr style={{width:'90%',margin:'30px'}}/>
            <div className={styles.inputRow}>
                <div className={styles.inputContainer} >
                    <span className={styles.label}>CURRENT PASSWORD</span>
                    <InputField 
                        icon={pwdIcon} 
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    &nbsp;
                </div>
            </div>    
            
            <div className={styles.inputRow}>
                <div className={styles.inputContainer}>
                    <span className={styles.label}>NEW PASSWORD</span>
                    <InputField 
                        icon={pwdIcon} 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <span className={styles.label}>CONFIRM NEW PASSWORD</span>
                    <InputField 
                        icon={pwdIcon} 
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>
            </div>
            <button className={styles.saveChanges} onClick={saveChangesHandler}>
                SAVE CHANGES
            </button><br/>
            <span className={styles.label}>You will be asked to log in again with your new password after you save your changes</span>    
        </div>
    );
};

export default ProfilePage;
