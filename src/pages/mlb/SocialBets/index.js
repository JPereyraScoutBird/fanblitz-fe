import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { getDate2, getDateString, getTime, getTodayItems } from '../../../utils';
import Menu from '../../../container/Menu3';
import Footer from '../../../container/Footer';
import SubMenu from '../../../container/Menu2';
import { getDate, getPaid } from "../../../utils";
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import CardProfileComponent from '../../../component/CardProfile';
import CardTeamComponent from '../../../component/CardTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-regular-svg-icons";
import Image from '../../../img';
import { useOutletContext } from "react-router-dom";

function SocialBets() {
  const [bets, setBets] = useState([])
  const [betsFriend, setBetsFriend] = useState([])
  const [user] = useOutletContext();

  const [modal, setModal] = useState(false);
  const [game, setGameData] = useState([]);
  const [gameId, setGameId] = useState('');
  const [amount, setAmount] = useState('');
  const [bet, setBet] = useState('');
  const toggle = () => setModal(!modal);

  console.log("User: ", user)

  useEffect(() => {
    const fetchData2 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/users/bets?user_id=${user.username}`);
            let jsonObject = response.data.body
            let jsonObjectFriend = response.data.data_friend
            jsonObject = jsonObject.length ? jsonObject.map(x => ({...x, "created_date": getDate(x['created_date']), "updated_date": getDate(x['updated_date'])})) : []
            jsonObject = jsonObject.length ? jsonObject.map(x => ({...x, "paid": getPaid(x['paid'])})) : []

            jsonObjectFriend = jsonObjectFriend.length ? jsonObjectFriend.map(x => ({...x, "created_date": getDate(x['created_date']), "updated_date": getDate(x['updated_date'])})) : []
            jsonObjectFriend = jsonObjectFriend.length ? jsonObjectFriend.map(x => ({...x, "paid": getPaid(x['paid'])})) : []

            // console.log(jsonObject)
            setBets(jsonObject)
            setBetsFriend(jsonObjectFriend)
            
        } catch (error) {
            console.error('Error getting data:', error);
        }
    };

    fetchData2()
  }, []);
  

  const fetchData = async () => {
    // if (gameDataStore.length == 0) {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/games',
        );
        const jsonObject = JSON.parse(response.data.body)
        const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z']), "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])})) : []
        console.log(response_formated)
        setGameData(response_formated)
        // dispatch(setValue(response_formated))
      } catch (error) {
        console.error('Error getting data:', error);
      }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000)
    return () => clearInterval(interval)
  }, []);

  console.log('game: ', game.filter(x=> getTodayItems(x.date_z)))

  const submitBet = async (e) => {
    e.preventDefault()
    const body = {
    "user_id": user.username,
    "sport_id": 1,
    "game_id": gameId,
    "bet": bet,
    "bet_type": 'spread',
    "amount": amount,
    "currency": 'dollar',
    // "result": None,
    // "paid": None,
    "created_date": Date.now(),
    "status": true
    }

    console.log(body)
    try {
      const response_submit = await axios.post('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/users/bets', { headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
        },body });
      console.log(response_submit)
      // setAmount('')
      // setBet('')
      // setGameId('')
      // const jsonObject = JSON.parse(response.data.body)
      // const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z']), "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])})) : []
      // console.log(response_formated)
      // setGameData(response_formated)
      // dispatch(setValue(response_formated))
    } catch (error) {
      console.error('Error getting data:', error);
    }
  }
  
  return (
    <div id="socialbets">
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <div className='d-flex justify-content-between align-items-between'>
          <h2>My Wagers</h2>
          <Button onClick={toggle}>Place a new Bet</Button>
          </div>
          <CustomTable noRange={true} range={50} header={constant.headerBets} data={bets} loading={bets.length == 0}/>
        </div>
        <br></br>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>Friend Wagers</h2>
          <CustomTable noRange={true} range={50} header={constant.headerBets} data={betsFriend} loading={betsFriend.length == 0}/>
        </div>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader style={{backgroundColor: "#000", color: "#fff"}} toggle={toggle}>Set New Bet</ModalHeader>
        <ModalBody>
            <Form inline onSubmit={(e) => submitBet(e)}>
            <FormGroup>
              <Label for="gameSelect" className="mr-sm-2">Games</Label>
              <Input
                id="gameSelect"
                name="select"
                type="select"
                onChange={e => setGameId(e.target.value)}
              >
              {game.filter(x => getTodayItems(x.date_z)).map(y => {
                return (
                  <option value={y.id}>
                    {y.home_team_abbr} vs {y.away_team_abbr}
                  </option>
                )
              })}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="sportSelect" className="mr-sm-2">Sport</Label>
              <Input
                id="sportSelect"
                name="select"
                type="select"
              >
                <option value={1}>
                  MLB
                </option>
                {/* <option value={2}>
                  TENIS
                </option>
                <option value={3}>
                  NBA
                </option> */}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="bet" className="mr-sm-2">Bet</Label>
              <Input value={bet} onChange={e => setBet(e.target.value)}t type="currency" name="bet" id="bet" placeholder="-1" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="amount" className="mr-sm-2">Amount</Label>
              <Input value={amount} onChange={e => setAmount(e.target.value)}t type="currency" name="amount" id="amount" placeholder="7.00" />
            </FormGroup>
            {/* <FormGroup>
              <Label for="Result" className="mr-sm-2">Result</Label>
              <Input type="currency" name="amount" id="amount" placeholder="1000.00" />
            </FormGroup> */}
            <Button onSubmit={(e) => submitBet(e)}>Submit</Button>
          </Form>
        </ModalBody >
      </Modal>    
    </div>    
  );
}

export default SocialBets;
