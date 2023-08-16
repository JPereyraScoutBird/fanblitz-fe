import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
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
import Image from '../../../img';
import { useOutletContext } from "react-router-dom";
import { faBaseball } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './style.css';

function SocialBets() {
  const [bets, setBets] = useState(undefined)
  const [betsFriend, setBetsFriend] = useState(undefined)
  const [user] = useOutletContext();

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [game, setGameData] = useState([]);
  const [gameId, setGameId] = useState('');
  const [amount, setAmount] = useState('');
  const [bet, setBet] = useState('');
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  console.log("User: ", user)

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

  useEffect(() => {

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
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000)
    return () => clearInterval(interval)
  }, []);

  console.log("email: ", user.attributes.email)

  const submitBet = async (e) => {
    e.preventDefault()
    const body = {
    "user_id": user.username,
    "username": user.attributes.email,
    "email": user.attributes.email,
    "sport_id": 1,
    "game_id": gameId,
    "bet": bet,
    "bet_type": 'spread',
    "amount": amount,
    "currency": 'dollar',
    "created_date": Date.now(),
    "status": true,
    "action": "create",
    }

    console.log("sending body", body)
    try {
      const response_submit = await axios.post('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/users/bets', body);
      setAmount('')
      setBet('')
      setGameId('')
      toggle()
      fetchData2()

    } catch (error) {
      console.error('Error getting data:', error);
    }
  }

  const renderBrands = (x) => (
    <div className='d-flex'>
      <a style={{color: "#000", marginRight: "12px"}} href={`https://twitter.com/intent/tweet?text=${x.team_home} vs ${x.team_away}, spread ${x.bet} in MLB. More info www.fanblitz.com`}><FontAwesomeIcon icon={faTwitter} /> </a>
      <a style={{color: "#000"}} href={`http://www.facebook.com/sharer.php?u=https://v6.scoutbird.net&summary=MySummary&title=MyTitle&text=THE_CUSTOM_TEXT`}><FontAwesomeIcon icon={faFacebook} /> </a>
      {/* <a  href={`https://twitter.com/intent/tweet?text=I am betting ${x.amount} that ${x.team_home} spread will be ${x.bet} in ${x.team_home} vs ${x.team_away} game`}><FontAwesomeIcon icon={faInstagram} /> </a> */}
    </div>
  )
  
  return (
    <div id="socialbets">
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <div className='d-flex justify-content-between align-items-between'>
          <h2>My Wagers</h2>
          <Button style={{borderRadius: "50px", border: "1px solid #666666", backgroundColor: "transparent", color: "#666666"}} color="secondary" onClick={toggle}>Place a new Bet</Button>
          </div>
          <CustomTable noRange={true} range={50} header={constant.headerBets} data={bets ? 
          bets.map(x => ({...x, 
            "sport": <><FontAwesomeIcon icon={faBaseball} /> <span>MLB</span></>, 
            "result": "TBD",
            "fanduel": <a onClick={toggle2}>See Bet</a>, 
            "share": renderBrands(x)})) : []} loading={bets == undefined}/>
        </div>
        <br></br>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>Friend Wagers</h2>
          <CustomTable noRange={true} range={50} header={constant.headerBets2} data={bets ? betsFriend.map(x => ({...x, "sport": <><FontAwesomeIcon icon={faBaseball} /> <span>MLB</span></>, "fanduel":  <a onClick={toggle2}>See Bet</a>})): []} loading={betsFriend == undefined}/>
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
              <option value="" hidden>Please select</option>
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
            <div className='d-flex justify-content-end'>
              <Button outline className='btn mt-4 mr-4 mb-4' onSubmit={(e) => toggle()}>Cancel</Button>
              <Button disabled={bet=='' || amount == '' || game == ''} className='btn ml-2 mt-4 mb-4' onSubmit={(e) => submitBet(e)}>Submit</Button>
            </div>
          </Form>
        </ModalBody >
      </Modal>  
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader>FANBLITZ WANTS YOU TO BET RESPONSIBLY!</ModalHeader>
        <ModalBody>
          <p>FanBlitz understands and embraces the excitement of sports betting, but we also promote responsible betting. It's important to remember to only bet what you can afford to lose and not go over your budget.</p>
          <p>While it's assured that you will lose some bets, using FanDuel's tools, information, and data can help you minimize your losses and even potentially win some! So, enjoy the thrill of sports betting, but always remember to bet responsibly.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle2}>Cancel</Button>
          <Button color="primary" href="https://ny.sportsbook.fanduel.com/navigation/mlb">Continue</Button>
        </ModalFooter>
      </Modal>  
      <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
    </div>    
  );
}

export default SocialBets;
