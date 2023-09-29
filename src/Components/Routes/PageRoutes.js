import React, { Fragment} from "react";
import { Route, Routes } from "react-router";
import Login from "../Page/Login";
// import Login from "../Page/Login";
import Home from "../Page/HomePage";
import About from "../Page/AboutPage";
import ContactUsPage from "../Page/ContactUsPage";
import ChangePassPage from "../Page/ChangePassPage";
import Profile from "../Page/Profile";
import ForgotPassPage from "../Page/ForgotPassPage";

const PageRoutes = ({loggedIn}) => {
   
    return (
        <Fragment>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/forgotPassword" element={<ForgotPassPage />} />
  
          {/* Pages which should render when the user is logged in */}
          {loggedIn && (
            <Fragment>
              <Route path="/*" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/changepassword" element={<ChangePassPage />} />
            </Fragment>
          )}
  
          {/* Pages which should render when the user is not logged in */}
          {!loggedIn && (
            <Fragment>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Login />} />
            </Fragment>
          )}
        </Routes>
      </Fragment>
    );
  };
  
  export default PageRoutes;