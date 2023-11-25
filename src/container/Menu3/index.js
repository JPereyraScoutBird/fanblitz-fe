import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {
  setSport,
  selectSport,
} from '../../reducers/sportSlide';

import {
  setStatus,
  selectUserStatus,
} from '../../reducers/userLogin';

import { faBaseball, faVolleyballBall, faBasketball } from "@fortawesome/free-solid-svg-icons";
import Menu from '../Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**
 * Menu Navbar with Bootstrap
 * @param {*} args 
 * @returns 
 */


function Menu3(props) {
  const isUserLogin = useSelector(selectUserStatus);
  const sportReducer = useSelector(selectSport);
  const dispatch = useDispatch();
  const {sport_default = "cbb", user, signOut, onChange} = props
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

  const userSignOut = (e) => {
    console.log("==")
    console.log("salida")
    dispatch(setStatus(false))
  }
  

  return (
    <div>    
        <Navbar style={{backgroundColor: "#666666"}}>
        <Nav className="mr-auto d-flex flex-row align-items-center" navbar>
          <Button outline className='btn btn-link' onClick={() => onClick("mlb")} style={{textDecoration: 'none', color: "#ffffff", margin: '0px', padding: '0px'}}>
              <FontAwesomeIcon icon={faBaseball}/>MLB
          </Button>
          <div className="border-dash" style={{margin: "0px 0.5rem"}}></div>
          <Button outline className='btn btn-link' onClick={() => onClick("tennis")} style={{textDecoration: 'none', color: "#ffffff", margin: '0px', padding: '0px'}}>
            <FontAwesomeIcon icon={faVolleyballBall}/>Tennis
          </Button>
          <div className="border-dash" style={{margin: "0px 0.5rem"}}></div>
          <Button outline className='btn btn-link' onClick={() => onClick("cbb")} style={{textDecoration: 'none', color: "#ffffff", margin: '0px', padding: '0px'}}>
            <FontAwesomeIcon icon={faBasketball}/>NCAA BM
          </Button>
          <div className="border-dash" style={{margin: "0px 0.5rem"}}></div>
          <Button outline className='btn btn-link' onClick={() => onClick("nba")} style={{textDecoration: 'none', color: "#ffffff", margin: '0px', padding: '0px'}}>
            <FontAwesomeIcon icon={faBasketball}/>NBA
          </Button>
        </Nav>
        {signOut != undefined? 
         <div className='d-none d-md-block '>
            <Button style={{borderRadius: "50px"}} className='btn' onClick={signOut} > <Button style={{borderRadius: "50px"}} className='btn' onClick={(e) => userSignOut(e)} >Sign out</Button></Button>
          </div>
        :null} 
      </Navbar>
      <Menu sport={sportReducer} onChange={(e) => onChange(e)}/>
    </div>
  );
}
export default Menu3