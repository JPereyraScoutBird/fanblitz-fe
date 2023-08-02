import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';

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
}

  return (
    <div>    
        <Navbar style={{backgroundColor: "#666666"}}>
        <Nav className="mr-auto d-flex flex-row" navbar>
          <Button outline className='btn btn-primary-outline' onClick={() => onClick("mlb")}>
              MLB
          </Button>
          <Button outline className='btn btn-primary-outline' onClick={() => onClick("tennis")}>
              Tennis
          </Button>
        </Nav>
      </Navbar>
      <Menu sport={sportReducer}/>
    </div>
  );
}
export default Menu3