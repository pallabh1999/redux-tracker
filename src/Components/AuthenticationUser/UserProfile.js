import React, { useRef,  useState,useEffect } from 'react';
import classes from './UserProfile.module.css';
import { FaAddressCard} from 'react-icons/fa';
import { onUpdate } from '../Store/USerAction';
import { useDispatch, useSelector } from 'react-redux';

const ProfileForm = () => {
  const nameRef = useRef();
  const profileRef = useRef();
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(50);
  const profilePicture = useSelector((state) => state.userInfo.profilePicture);
  const userName = useSelector((state) => state.userInfo.userName);
  const token = useSelector((state) => state.userInfo.token);
console.log(profilePicture , userName);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const profile = profileRef.current.value;
    const data ={
      name : name,
      profile : profile,
      token :token
    }
    setPercentage(100)
    dispatch(onUpdate(data));
  };

  
  useEffect(() => {
    let completionPercentage = 50; // Initial 50%
    
    if (userName) {
      completionPercentage += 25;
    }
    
    if (profilePicture) {
      completionPercentage += 25;
    }

    setPercentage(completionPercentage);
  },[userName,profilePicture]);

  return (
    <div className={classes.profileBG}>
      <div className={classes.profileStatusContainer}>
        <h6 className={classes.profileStatus}>Your profile is {percentage}% complete</h6>
      </div>
      <div className={classes.form}>
        <h3><b>Update details <FaAddressCard/> : </b></h3>
        <form onSubmit={handleUpdate}>
          <label>Full Name :  </label>
          <input
            type='text'
            ref={nameRef}
            defaultValue={userName || ''}
            className={classes.input}
            required
          />

          <label>Profile Photo Url : </label>
          <input
            type='text'
            ref={profileRef}
            defaultValue={profilePicture || ''}
            required
            className={classes.input}
          />

          <div className={classes.buttonContainer}>
            <button className={classes.button}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
