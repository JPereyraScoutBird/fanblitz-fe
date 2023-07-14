import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import PATH_LIST from '../../routes/constant';
import './style.css'
import { NavLink } from "react-router-dom";
import Images from '../../img';
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

  return (
    <div>
      <Navbar id="primary_navbar" color="light" light expand="md" className='d-flex justify-content-end'>
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
                {renderNavLink(`${PATH_LIST.STATS}`, "Stats")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.TUTORIAL}`, "Tutorial")}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Menu