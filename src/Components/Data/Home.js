import React, { useState } from "react";
import axios from 'axios';
import './styleSheet.css';
import { Button } from "react-bootstrap";
import Expense from "./Expenses/Expense";
import ExpenseList from "./Expenses/ExpenseList";
import { useSelector } from "react-redux";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const  token = useSelector((state) => state.userInfo.token)
  const  isVerified = useSelector((state) => state.userInfo.emailVerify )
  const  premium = useSelector((state) => state.userInfo.premium )


  const verifyEmailHandler = () => {
        console.log('verification sent');
        verifyEmail();
        alert('Please Check your Mail Box and verify to proceed further')

    }

    const verifyEmail = async () => {
      try {
        console.log('sending start');
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE",
          {
            idToken: token,
            requestType: "VERIFY_EMAIL",
          }
        );
        console.log('sending success');
        console.log(response.data); // Use response.data directly
      } catch (error) {
        console.error("Error sending email verification:", error);
      }
    };
    
    
  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

    return (
        <div className={premium && isDarkMode ? 'homePremiumbackground' : 'homepagebackground'}>
            {!isVerified && <Button className="verifyBtn" onClick={verifyEmailHandler}>Verify Email</Button>}
            {premium && (
                 <div className="divSwitch">
                 <label className="toggle">
                   <input
                     className="toggle-checkbox"
                     type="checkbox"
                     checked={isDarkMode}
                     onChange={handleToggle}
                   />
                   <div className="toggle-switch"></div>
                 </label>
               </div>
            )}
            <div className='main_div'>
                <Expense />
                <br />
                <ExpenseList />

            </div>
        </div>
    )
}

export default Home;