import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setSport,
  selectSport,
} from '../../reducers/sportSlide';


import Menu from '../Menu';
/**
 * Menu Navbar with Bootstrap
 * @param {*} args 
 * @returns 
 */


function Menu3(props) {
  const sportReducer = useSelector(selectSport);
  const dispatch = useDispatch();
  const {sport_default = "mlb"} = props
  const [sport, setSportData] = useState(sport_default);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData2 = async () => {
  //       try {
  //           const sportReducer = useSelector(selectSport);
  //           setSport(sportReducer);
  //       } catch (error) {
  //           console.error('Error getting data:', error);
  //       }
  //   };

  //   fetchData2();
  // }, []);

  const onClick = (newSport) => {
    setSportData(newSport)
    dispatch(setSport(newSport))
    navigate(`/${newSport}`)
    }

  return (
    <div>    
        <Navbar style={{backgroundColor: "#666666"}}>
        <Nav className="mr-auto d-flex flex-row align-items-center" navbar>
          <Button outline className='btn btn-link' onClick={() => onClick("mlb")} style={{textDecoration: 'none', color: "#ffffff", margin: '0px', padding: '0px'}}>
              MLB
          </Button>
          <div className="border-dash" style={{margin: "0px 0.5rem"}}></div>
          <Button outline className='btn btn-link' onClick={() => onClick("tennis")} style={{textDecoration: 'none', color: "#ffffff", margin: '0px', padding: '0px'}}>
              Tennis
          </Button>
        </Nav>
      </Navbar>
      <Menu sport={sportReducer}/>
    </div>
  );
}
export default Menu3