import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useGetCurrentUser,uploadProfilePhoto,updateProfileDetails} from './firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
const ProfileUpdate = () => {
  const currentUser = useGetCurrentUser();
  const [photo,setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [isEmailVerified,setIsEmailVerified] = useState(false);
  const handleProfilePhoto = (e) => {
    if(e.target.files[0]){
      setPhoto(e.target.files[0]);
    }
  }
  const uploadPhoto = () => {
    uploadProfilePhoto(photo,currentUser);
  }
  const updateProfile = () => {
    updateProfileDetails(name,currentUser);
  }
  useEffect(() => {
    if(!currentUser) return;
    currentUser.photoURL ? setPhotoURL(currentUser.photoURL) : setPhotoURL('');
    currentUser.displayName ? setName(currentUser.displayName) : setName('');
    currentUser.email ? setEmail(currentUser.email) : setEmail('');
    currentUser.emailVerified ? setIsEmailVerified(true) : setIsEmailVerified(false);
  },[currentUser])
  return (
    <div>
      <div>
    <div className='homeContainer' style={{fontSize:"larger"}}>Winners never quite, Quitters never win.</div>
    <div className='profileContainer' style={{fontSize:"larger",width:"40%"}}>Your Profile is 64% completed. A complete Profile has higher chances of landing a job.<Link to='/updateProfile'>Complete now</Link></div>
    </div><br /><br/>
    <div className='contactContainer'>
      <h2>Contact Details</h2>
      <div className='fullNameContainer'>
      <label htmlFor='fullName' className='labelDesign'>Full Name</label>
      <input type='text' name='fullName' className='inputFieldContainer' onChange={(e) => setName(e.target.value)} value={name}/>
      </div>
      <div className='fullNameContainer'>
      <label htmlFor='fullName' className='labelDesign'>Email</label>
      <input type='text' name='fullName' className='inputFieldContainer' value={email} disabled />
      {
        isEmailVerified ? (<span style={{color:'green',fontWeight:'600'}}>Verified</span>) : (<button style={{backgroundColor:'antiquewhite',border:'2px groove sandybrown',borderRadius:'5px',cursor:'pointer'}} onClick={() => sendEmailVerification(currentUser)}>Verify Email</button>
        )
      }
      </div>
      <div className='profilePhotoContainer'>
        <label htmlFor='profilePhoto'className='labelDesign'>Profile Photo</label>
        <input type='file' name='profilePhoto' className='inputFieldContainer' onChange={handleProfilePhoto}/>
        <button style={{backgroundColor:'antiquewhite',border:'2px groove sandybrown',borderRadius:'5px'}} onClick={uploadPhoto}>Upload</button>
        <img src={photoURL} alt="Avatar" className="avatar" />
      </div>
      <div className='profileButtonContainer'>
      <button className='profileUpdateButton' onClick={updateProfile}>Update</button>
      <button className='profileUpdateButton'><Link to='/home'>Cancel</Link></button>
      </div>
    </div>
    
    </div>
  )
}

export default ProfileUpdate