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
  const [boxData, setBoxData] = useState({
    "home_team_abb": "NYY",
    "away_team_abb": "ATL",
    "home_team": "New York Yankees",
    "away_team": "Atlanta Brave",
    "home_score": 1,
    "away_score": 4
  });
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

  const renderTeamColumn = (team_abbr = "ATL") => {
    return (
    <div className="d-flex">
      <img style={{marginRight: "0.5rem"}} src={constant.team_detail[boxData.home_team_abb || "NYY"].img} height={"24px"} />
      <p>{team_abbr}</p>
    </div>
    )
  }


  const renderPitcherTable = (team_abbr) => (
    <>
      <h5>Pitcher {team_abbr}</h5>
        <CustomTable 
          noRange
          header={{'name': '', 'ip':'IP','h': 'H','r': 'R' , 'er': 'ER' , 'bb': 'BB','k': 'K', 'hr': 'HR','era': 'ERA' }}
          data={
            [
              {
                'name': 'Altuve','ip': 0,'h': 1,'r': 0,'er': 1,'bb': 1,'k': 3,'hr': 3,'era': 4
              },
              {
                'name': 'Tucker', 'ip': 0,'h': 0,'r': 0,'er':0,'bb': 1,'k': 1,'hr': 1,'era': 3
              }, 
              {
                'name': 'Bregman', 'ip': 0,'h': 0,'r': 0,'er':0,'bb': 1,'k': 1,'hr': 1,'era': 4
              }
            ]
          }
        />
    </>
  )

  const renderBatterTable = (team_abbr) => (
    <>
      <h5>Batters {team_abbr}</h5>
        <CustomTable 
          noRange
          header={{'name': '', 'ab':'AB','r': 'R' ,'h': 'H', 'rbi': 'RBI' , 'bb': 'BB','k': 'K', 'avg': 'AVG','ops': 'OPS' }}
          data={
            [
              {
                'name': 'Altuve','ab': 0,'r': 0,'h': 1,'rbi': 1,'bb': 1,'k': 3,'avg': 3,'ops': 4
              },
              {
                'name': 'Tucker', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 3
              }, 
              {
                'name': 'Bregman', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 4
              },
              {
                'name': 'Altuve','ab': 0,'r': 0,'h': 1,'rbi': 1,'bb': 1,'k': 3,'avg': 3,'ops': 4
              },
              {
                'name': 'Tucker', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 3
              }, 
              {
                'name': 'Bregman', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 4
              },
              {
                'name': 'Tucker', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 3
              }, 
              {
                'name': 'Bregman', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 4
              },
              {
                'name': 'Tucker', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 3
              }, 
              {
                'name': 'Total', 'ab': 0,'r': 0,'h': 0,'rbi':0,'bb': 1,'k': 1,'avg': 1,'ops': 4
              }
            ]
          }
        />
    </>
  )

  const renderTodaysGame = () => {
    console.log()
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <div className="w-100 d-flex flex-md-row flex-column align-items-center">
              <div className="w-100 d-flex align-items-center">
                <img style={{marginRight: "0.5rem"}} src={constant.team_detail[boxData.home_team_abb || "NYY"].img} height={"32px"} />
                <h2 style={{marginRight: "0.5rem"}} className="mb-0"> {boxData.home_team || "NYY"} </h2>
              {/* </div> */}
              <h2 className="mr-2 ml-2" style={{marginLeft: "1rem", marginRight: "1rem"}}> vs </h2>
              {/* <div className="w-100 d-flex align-items-center"> */}
                <img style={{marginRight: "0.5rem"}} src={constant.team_detail[boxData.away_team_abb || "ATL"].img} height={"32px"} />
                <h2 style={{marginRight: "0.5rem"}} className="ml-2 mb-0"> {boxData.away_team || "ATL"}</h2>
              </div>
            </div>
            <div>
              <CustomTable 
                noRange
                header={{'name': '', '1st': '1','2nd': '2','3rd': '3','4th': '4','5th': '5','6th': '6','7th': '7','8th': '8','9th': '9','R': 'R', 'H': 'H', 'E': 'E'}}
                data={
                  [
                    {
                      'name': renderTeamColumn(boxData.home_team),'1st': 0,'2nd': 0,'3rd': 1,'4th': 1,'5th': 1,'6th': 3,'7th': 3,'8th': 3,'9th': 3,'R': 3, 'H': 14, 'E': 3
                    },
                    {
                      'name': renderTeamColumn(boxData.away_team), '1st': 0,'2nd': 0,'3rd': 0,'4th':0,'5th': 1,'6th': 1,'7th': 1,'8th':2,'9th': 2,'R': 2, 'H': 5, 'E': 6
                    }
                  ]
                }
              />
            </div>
            <Row className="mb-4 mt-4">
              <Col xs={6}>
                  {renderBatterTable(boxData.home_team)}
              </Col>
              <Col xs={6}>
                  {renderBatterTable(boxData.away_team)}
              </Col>
            </Row>
            <Row className="mb-4 mt-4">
              <Col xs={6}>
                  {renderPitcherTable(boxData.home_team)}
              </Col>
              <Col xs={6}>
                  {renderPitcherTable(boxData.away_team)}
              </Col>
            </Row>
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
