import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal
} from 'reactstrap';
import PATH_LIST from '../../routes/constant';
import './style.css'
import { NavLink } from "react-router-dom";
import Images from '../../img';
import Chatbot from '../ChatBot';
/**
 * Menu Navbar with Bootstrap
 * @param {*} args 
 * @returns 
 */

const renderNavLink = (path, text) => (
  <NavLink
    className={({ isActive, isPending }) =>
      isActive ? "active" : isPending ? "pending" : ""
    }
    to={`${path}`}
  >
    {text}
  </NavLink>
);

function Menu(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);

  return (
    <div>
      <Navbar id="primary_navbar" color="dark" light expand="md" className='d-flex justify-content-end'>
        <NavbarBrand href="/" style={{flexGrow: 1}}><img src={Images.Logo} height="50px" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className='justify-content-end'>
          <Nav className="mr-auto" navbar>
            <NavItem>
                {renderNavLink(`${PATH_LIST.HOME}`, "Home")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.PLAYER}`, "Players")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.NEWS}`, "News")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.TEAM}`, "Team")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.FORECAST}`, "Forecasts")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.SOCIAL_BETS}`, "SocialBets")}
            </NavItem>
            <NavItem>
              <a className="pointer" onClick={toggle2}>FanBlitz GPT</a>
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.TUTORIAL}`, "Tutorial")}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Modal isOpen={modal} toggle={toggle2}>
        <Chatbot />
      </Modal>
    </div>
  );
}
export default Menu