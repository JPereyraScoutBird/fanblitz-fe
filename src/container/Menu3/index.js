import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Navbar,
  Nav,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {
  setSport,
  selectSport,
} from '../../reducers/sportSlide';

import { faBaseball, faVolleyballBall } from "@fortawesome/free-solid-svg-icons";
import Menu from '../Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**
 * Menu Navbar with Bootstrap
 * @param {*} args 
 * @returns 
 */


function Menu3(props) {
  const sportReducer = useSelector(selectSport);
  const dispatch = useDispatch();
  const {sport_default = "mlb", user, signOut, onChange} = props
  const [sport, setSportData] = useState(sport_default);
  const [friend, setFriend] = useState([])
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData2 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/users/friends?user_id=${user.username}`);
            const jsonObject = response.data.body
            setFriend(jsonObject)
        } catch (error) {
            console.error('Error getting data:', error);
        }
    };

    fetchData2();
  }, []);

  const onClick = (newSport) => {
    setSportData(newSport)
    dispatch(setSport(newSport))
    navigate(`/${newSport}`)
    }

    const submitAccept = async (e) => {
      e.preventDefault()
      const body = {
        "user_id": user.username,
        "friend_username": friend.username,
        "action": "create",
        "approved": true
      }
  
      console.log("sending body", body)
      try {
        const response_submit = await axios.post('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/users/friends', body);
        toggle()
      } catch (error) {
        console.error('Error getting data:', error);
      }
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
        </Nav>
        <div className='d-none d-md-block '>
            <Button style={{borderRadius: "50px"}} className='btn' onClick={toggle}>Notifications</Button>
          </div>
         <div className='d-none d-md-block '>
            <Button style={{borderRadius: "50px"}} className='btn' onClick={signOut}>Sign out</Button>
          </div>
      </Navbar>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Friends requests</ModalHeader>
        <Form inline onSubmit={(e) => submitAccept(e)}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="sportSelect" className="mr-sm-2">Usenames</Label>
              <Input
                id="gameSelect"
                name="select"
                type="select"
                onChange={e => setUsername(e.target.value)}
              >
              <option value="" hidden>Please select</option>
              {friend.filter(x => x.approved == 0).map(y => {
                return (
                  <option value={y.id}>
                    {y.username}
                  </option>
                )
              })}
              </Input>
            </FormGroup>
            <div className='d-flex justify-content-end'>
              <Button outline className='btn mt-4 mr-4 mb-4' onSubmit={(e) => toggle()}>Cancel</Button>
              <Button disabled={username==''} className='btn ml-2 mt-4 mb-4' onSubmit={(e) => submitAccept(e)}>Accept</Button>
            </div>
        </Form>
        
      </Modal>
      <Menu sport={sportReducer} onChange={(e) => onChange(e)}/>
    </div>
  );
}
export default Menu3