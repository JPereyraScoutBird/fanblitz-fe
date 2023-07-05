import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import PATH_LIST from '../../routes/constant';
import './style.css'
import { NavLink } from "react-router-dom";

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
      <Navbar color="light" light expand="md" className='d-flex justify-content-end'>
        <NavbarBrand href="/" style={{flexGrow: 1}}>Fanblitz</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                {renderNavLink(`${PATH_LIST.HOME}`, "Home")}
            </NavItem>
            <NavItem>
                {renderNavLink(`${PATH_LIST.PLAYER}`, "Player")}
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
            
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Menu