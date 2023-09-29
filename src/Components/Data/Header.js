import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from "react-redux";
import './styleSheet.css';
import { Button } from "react-bootstrap";
import { FaCalculator,FaUser, FaSignOutAlt } from 'react-icons/fa';
import { userAction } from "../Store/UserSlice";

function Header() {
  
  const userName = useSelector((state) => state.userInfo.userName )
  const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn )
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(userAction.logOutMethod());
    console.log('userLogOut');
    
  }

  return (
    <Navbar expand="lg" className="navBar">
      <Container>
        <Navbar.Brand>
          <h3 className="navTitle">
          Day -To -Day Tracker
            <FaCalculator className="calculatorIcon"  style={{ color : "green"}}/> 
          </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href='/about' className="nav-link">About</Nav.Link>

            {isLoggedIn && (
              <>
                <Nav.Link href="/home" className="nav-link">Home</Nav.Link>
                <NavDropdown title={ userName ? userName : 'user'} id="basic-nav-dropdown">
                  
                  <NavDropdown.Item href="/user/profile">
                  <FaUser className="calculatorIcon" /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/changepassword">Change Password</NavDropdown.Item>
                  <NavDropdown.Item href="/contact">ContactUs</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOutHandler} href="/login"> 
                   <FaSignOutAlt /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          {!isLoggedIn &&
            <Button className="loginBtn" href="/login">Login</Button>
          }
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
