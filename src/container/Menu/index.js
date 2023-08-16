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
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
      isActive ? "active btn" : isPending ? "pending btn" : "btn"
    }
    to={`${path}`}
  >
    {text}
  </NavLink>
);

function Menu(props) {
  const { onChange = () => {} } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState();
  const [modal, setModal] = useState(false);
  const [gptStyle, setGtpStyle] = useState('')

  const toggle = () => setIsOpen(!isOpen);
  const toggle2 = () => setModal(!modal);
  const toggle3 = () => setDropDownOpen(!dropdownOpen);

  const onClick = (value) => {
    setGtpStyle(value)
    return onChange(value)
  }

  const {sport} = props

  return (
    <div>
      <Navbar id="primary_navbar" light expand="md" className='d-flex justify-content-end'>
        <NavbarBrand href={`/${sport}`} style={{flexGrow: 1}}><img src={Images.Logo} height="50px" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Col xs={12} md={3}>
          <SearchComponent/>
        </Col>
        <Collapse isOpen={isOpen} navbar className='justify-content-end'>
          <Nav pills={true} className="mr-auto" navbar>
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.HOME}`, "Home")}
            </NavItem>
            {sport == "mlb" ? (
            <NavItem>
                {renderNavLink(`/${sport}${PATH_LIST.LIVE}`, "Score")}
            </NavItem>
            ): null}
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
                {renderNavLink(`/${sport}${PATH_LIST.TUTORIAL}`, "Tutorial")}
            </NavItem>
            <NavItem>
              <a className="pointer btn" onClick={toggle2}>FanBlitz GPT</a>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} value={gptStyle} toggle={toggle3}>
              <DropdownToggle nav caret>
                {gptStyle != '' ? gptStyle : "GPT Style"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem value="Howard Cosell" onClick={(e) => onClick(e.target.value)}>Howard Cosell</DropdownItem>
                <DropdownItem value="Vin Scully" onClick={(e) => onClick(e.target.value)}>Vin Scully</DropdownItem>
                <DropdownItem value="Dick Vitale" onClick={(e) => onClick(e.target.value)}>Dick Vitale</DropdownItem>
                <DropdownItem value="Bill Walton" onClick={(e) => onClick(e.target.value)}>Bill Walton</DropdownItem>
                <DropdownItem value="Andres Cantor" onClick={(e) => onClick(e.target.value)}>Andres Cantor</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <Modal isOpen={modal} toggle={toggle2}>
        <Chatbot gptStyle={gptStyle} />
      </Modal>
    </div>
  );
}
export default Menu