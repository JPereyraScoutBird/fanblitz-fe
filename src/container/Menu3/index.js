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

import Menu from '../Menu';
/**
 * Menu Navbar with Bootstrap
 * @param {*} args 
 * @returns 
 */


function Menu3(props) {
    const {sport_default = "mlb"} = props
    const [sport, setSport] = useState(sport_default);

  return (
    <div>    
        <Navbar style={{backgroundColor: "#666666"}}>
        <Nav className="mr-auto d-flex flex-row" navbar>
          <Button outline className='btn btn-primary-outline' onClick={() => setSport("mlb")}>
              MLB
          </Button>
          <Button outline className='btn btn-primary-outline' onClick={() => setSport("tennis")}>
              Tennis
          </Button>
        </Nav>
      </Navbar>
      <Menu sport={sport}/>
    </div>
  );
}
export default Menu3