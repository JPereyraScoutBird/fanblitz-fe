import Menu from "../../../container/Menu3";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '../../../component/Table';
import { filterByDate, getDate, getDate2, getTime, getTodayItems } from "../../../utils";
import CardForecastComponent from "../../../component/CardForecast";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl, Modal, ModalHeader, ModalBody, ModalFooter, Col, Card, CardTitle, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import IMAGE from '../../../img';
import constant from "../PlayerDetail/constant";
import './style.css';
import DatePagination from "../../../component/DatePagination";
import moment from 'moment'
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import Chatbot from "../../../container/ChatBot";
import CardComponent from "../../../component/Card";
import CardTeamLiveComponent from "../../../component/CardTeamLive";


function LiveGame(props) {
  const dispatch = useDispatch();
  const {user, signOut} = props
  // const gameDataStore = useSelector((state) => state.gameData.value);
  const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal)
  const toggle2 = () => setModal2(!modal2)

  // const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})))

  // const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/games/gamescore');
  //       const jsonObject = JSON.parse(response.data.body)
  //       const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z']), "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])})) : []
  //       setGameData(response_formated)
  //     } catch (error) {
  //       console.error('Error getting data:', error);
  //     }
  // };

  // useEffect(() => {
  //   fetchData()
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 60000)
  //   return () => clearInterval(interval)
  // }, []);

React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const renderTodaysGame = () => {
    console.log()
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>MLB Today Games</h2>
            <div className="mb-4">
              <Row>
              
              </Row>
            </div>
          </div>
        )
  };

  return (
    <div id="home">
      <Menu sport_default={"mlb"} signOut={signOut} user={user}/>
      <Container>
        {
          renderTodaysGame()
        }
      </Container>
      {/* <Modal isOpen={modal} toggle={toggle}>
        <Chatbot player={team || pitcher} pre_prompt={prompt} />
      </Modal> */}
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
    </div>    
  );

  
}

export default LiveGame;
