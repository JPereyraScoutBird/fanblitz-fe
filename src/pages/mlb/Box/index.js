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
import { useLoaderData } from "react-router-dom";
import constantLocal from './constant';


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
  // const [boxData, setBoxData] = useState({
  //   "home_team_abb": "NYY",
  //   "away_team_abb": "ATL",
  //   "home_team": "New York Yankees",
  //   "away_team": "Atlanta Brave",
  //   "home_score": 1,
  //   "away_score": 4
  // });
  const [boxDataHitHome, setBoxDataHitHome] = useState([])
  const [boxDataHitAway, setBoxDataHitAway] = useState([])
  const [boxDataPitcherHome, setBoxDataPitcherHome] = useState([])
  const [boxDataPitcherAway, setBoxDataPitcherAway] = useState([])
  const [boxDataInnings, setBoxDataInnings] = useState([])
  const [boxDataInningsHome, setBoxDataInningsHome] = useState([])
  const [boxDataInningsAway, setBoxDataInningsAway] = useState([])
  const { gameId } = useLoaderData();
  const toggle = () => setModal(!modal)
  const toggle2 = () => setModal2(!modal2)

  const fetchData = async () => {
      try {
        const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/games/box?game_id=${gameId}`);
        const jsonObjectHome = JSON.parse(response.data.body_home)
        const jsonObjectAway = JSON.parse(response.data.body_away)
        const jsonObjectHomePit = JSON.parse(response.data.body_home_pitcher)
        const jsonObjectAwayPit = JSON.parse(response.data.body_away_pitcher)
        setBoxDataHitHome(jsonObjectHome)
        setBoxDataHitAway(jsonObjectAway)
        setBoxDataPitcherHome(jsonObjectHomePit)
        setBoxDataPitcherAway(jsonObjectAwayPit)
      } catch (error) {
        console.error('Error getting data:', error);
      }
  };

  const fetchDataInnings = async () => {
    try {
      const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/games/gamescore?game_id=${gameId}`);
      const jsonObject = response.data.body2
      // if (jsonObject != undefined && jsonObject.hasOwnProperty("home")){
      //   setBoxDataInningsHome(jsonObject.home)
      // }
      // if (jsonObject != undefined && jsonObject.hasOwnProperty("away")){
      //   setBoxDataInningsAway(jsonObject.away)
      // }
      setBoxDataInnings(jsonObject)
    } catch (error) {
      console.error('Error getting data:', error);
    }
};

  useEffect(() => {
    fetchData()
    fetchDataInnings()
    // const interval = setInterval(() => {
    //   fetchData();
    //   fetchDataInnings();
    // }, 1000000)
    // return () => clearInterval(interval)
  }, []);

React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const renderTeamColumn = (teamNameAbb) => {
    console.log("la melmelada", teamNameAbb)
    return (
    <div className="d-flex">
      <img style={{marginRight: "0.5rem"}} src={constant.team_detail[teamNameAbb || "AMERICAN"].img} height={"24px"} />
      <p>{teamNameAbb}</p>
    </div>
    )
  }

  const fixRenderLogo = (data) => {
    if (data.length != 0){
      return data.map(x => ({...x, "_team": renderTeamColumn(x["_team"])}))
    }
  }

  const getTeam = (data) => {
    if (data.length != 0){
      return data[0]["_team"]
    }
    return "AMERICAN"
  }

  const getHomeInning = (data) =>{
    if (data.length != 0){
      return data[0]["_team"]
    }
    return "AMERICAN"
  }

  const getAwayInning = (data) =>{
    if (data.length != 0){
      return data[1]["_team"]
    }
    return "AMERICAN"
  }

  const renderPitcherTable = (data) => (
    <>
      <h5>Pitchers {getTeam(data)}</h5>
        <CustomTable 
          noRange={false} pagination={true} range={5} row={5}
          header={constantLocal.headerpitchers}
          data={data}
        />
    </>
  )

  const renderBatterTable = (data) => (
    <>
      <h5>Batters {getTeam(data)}</h5>
        <CustomTable 
          noRange={false} pagination={true} range={9} row={10}
          header={constantLocal.headerHitters}
          data={data}
        />
    </>
  )

  const renderBoxGame = () => {
    console.log("DALIDA", fixRenderLogo(boxDataInnings))
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <div className="w-100 d-flex flex-md-row flex-column align-items-center">
              <div className="w-100 d-flex align-items-center">
                <img style={{marginRight: "0.5rem"}} src={constant.team_detail[getHomeInning(boxDataInnings) || "NYY"].img} height={"32px"} />
                <h2 style={{marginRight: "0.5rem"}} className="mb-0"> {getHomeInning(boxDataInnings) || "NYY"} </h2>
              {/* </div> */}
              <h2 className="mr-2 ml-2" style={{marginLeft: "1rem", marginRight: "1rem"}}> vs </h2>
              {/* <div className="w-100 d-flex align-items-center"> */}
                <img style={{marginRight: "0.5rem"}} src={constant.team_detail[getAwayInning(boxDataInnings) || "ATL"].img} height={"32px"} />
                <h2 style={{marginRight: "0.5rem"}} className="ml-2 mb-0"> {getAwayInning(boxDataInnings) || "ATL"}</h2>
              </div>
            </div>
            <div>
              <CustomTable 
                noRange
                header={constantLocal.headerInnings}
                data={fixRenderLogo(boxDataInnings)}
              />
            </div>
            <Row className="mb-4 mt-4">
              <Col xs={6}>
                  {renderBatterTable(boxDataHitAway)}
              </Col>
              <Col xs={6}>
                  {renderBatterTable(boxDataHitHome)}
              </Col>
            </Row>
            <Row className="mb-4 mt-4">
              <Col xs={6}>
                  {renderPitcherTable(boxDataPitcherAway)}
              </Col>
              <Col xs={6}>
                  {renderPitcherTable(boxDataPitcherHome)}
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
          renderBoxGame()
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
