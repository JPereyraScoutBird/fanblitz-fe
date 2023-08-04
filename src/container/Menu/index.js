import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  Col
} from 'reactstrap';
import PATH_LIST from '../../routes/constant';
import './style.css'
import { NavLink } from "react-router-dom";
import Images from '../../img';
import Chatbot from '../ChatBot';
import SearchComponent from '../../component/Search';
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

function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);

  const {sport} = props

  return (
    <div>
      <Navbar id="primary_navbar" color="dark" light expand="md" className='d-flex justify-content-end'>
        <NavbarBrand href={`/${sport}`} style={{flexGrow: 1}}><img src={Images.Logo} height="50px" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Col xs={12} md={3}>
          <SearchComponent/>
        </Col>
        <Collapse isOpen={isOpen} navbar className='justify-content-end'>
          <Nav className="mr-auto" navbar>
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.HOME}`, "Home")}
            </NavItem>
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.PLAYER}`, "Players")}
            </NavItem>
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.NEWS}`, "News")}
            </NavItem>
            {sport == "mlb" ? (
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.TEAM}`, "Team")}
            </NavItem>
            ): null}
            {sport == "tennis" ? (
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.STANDING_TENNIS}`, "Standing")}
            </NavItem>
            ): null}
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.FORECAST}`, "Forecasts")}
            </NavItem>
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.SOCIAL_BETS}`, "SocialBets")}
            </NavItem>
            <NavItem>
              <a className="pointer" onClick={toggle2}>FanBlitz GPT</a>
            </NavItem>
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.TUTORIAL}`, "Tutorial")}
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