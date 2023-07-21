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



function SubMenu(props) {
  const {backgroundColor="#000", color="#fff", logo=undefined, wins="", losses=""} = props
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const renderNavLink = (path, text) => (
    <NavLink
      // className={({ isActive, isPending }) =>
      //   isActive ? "active" : isPending ? "pending" : ""
      // }
      to={`${path}`}
      style={{color: "#fff", fontWeight: 'bold', fontSize: '1.2rem'}}
      color={color}
    >
      {text}
    </NavLink>
  );

  return (
    <div>
      <Navbar id="secondary_navbar" style={{backgroundImage: `linear-gradient(90deg, ${color} 0%, ${backgroundColor} 50%)` }}  expand="md" className='d-flex justify-content-end'>
        <div className='container d-flex justify-content-end'>
        <NavbarBrand href="/" style={{flexGrow: 0,  borderRadius: "25%"}}><div className='d-flex align-items-center'><img src={logo} height="50px" /><p className='nav-title'>{(wins && losses) ? `W ${wins} L ${losses}` : null}</p></div></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className='justify-content-end'>
          <Nav className="mr-auto" navbar>
            <NavItem>
                {renderNavLink(`#bio`, "Bio")}
            </NavItem>
            <NavItem>
                {renderNavLink(`#splits`, "Splits")}
            </NavItem>
            <NavItem>
                {renderNavLink(`#stats`, "Stats")}
            </NavItem>
            <NavItem>
                {renderNavLink(`#news`, "News")}
            </NavItem>
          </Nav>
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
}
export default SubMenu