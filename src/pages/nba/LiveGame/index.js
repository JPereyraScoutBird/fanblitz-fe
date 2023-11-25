import Menu from "../../../container/Menu3";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '../../../component/Table';
import { filterByDate, getDate, getDate2, getTime, getTodayItems, filterByDateGameCard } from "../../../utils";
import CardForecastComponent from "../../../component/CardForecast";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl, Modal, ModalHeader, ModalBody, ModalFooter, Col, Card, CardTitle, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import IMAGE from '../../../img';
import constant from "../PlayerDetail/constant";
import constantTeams from "../constants";
import './style.css';
import DatePagination from "../../../component/DatePagination";
import moment from 'moment'
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import Chatbot from "../../../container/ChatBot";
import CardComponent from "../../../component/Card";
import CardTeamLiveComponent from "../../../component/CardTeamNBALive";


function LiveGame(props) {
  const dispatch = useDispatch();
  const {user, signOut} = props
  // const gameDataStore = useSelector((state) => state.gameData.value);
  const [gameData, setGameData] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [team, setTeam] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [pitcher, setPitcher] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  const toggle = () => setModal(!modal)
  const toggle2 = () => setModal2(!modal2)
  const breakpoint = 620;
  const [showTable, setShowTable] = useState("home");
  const [forecastData, setForecastData] = useState([])
  // const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})))

  const fetchData = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/qanba/nba/games/gamescore');
        // const responseBox = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/nba/dev/games/box');
        const jsonObject = JSON.parse(response.data.body)
        console.log(jsonObject.length)
        // const jsonObjectBox = JSON.parse(responseBox.data.body)
        const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z'])})) : []
        console.log("game score", response_formated)
        setGameData(response_formated.sort((a,b) => a.date_z.localeCompare(b.date_z)))
        setIsLoading(true);
      } catch (error) {
        console.error('Error getting data:', error);
      }
  };

  useEffect(() => {
    setIsLoading(false);
    fetchData()
    const interval = setInterval(() => {
      fetchData();
    }, 60000)
    return () => clearInterval(interval)
  }, []);

// =======
  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  
  const renderTodaysGame = () => {
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>NBA Games</h2>
            <div className="mb-4">
              <DatePagination date={date} onClick={(date) => setDate(date)}/>
            </div>
            <div className="mb-4">
              <Row>
              {gameData.map(x => {
                if(filterByDateGameCard(x.date_z, date.toDate(), x.status)){
                  // console.log("game card", x)
                  return (
                  <Col xs={12} md={4}>
                      <div className="mb-4">
                      <CardTeamLiveComponent 
                      homeImg={x['home_image']}
                      awayImg={x['away_image']}
                      home_abbr={x.home_team_abbr}
                      away_abbr={x.away_team_abbr}
                      home={x['home_team_city']} 
                      away={x['away_team_city']} 
                      footer={getTime(x.date_z)} 
                      home_score={x['home_score']}
                      away_score={x['away_score']}
                      quarter_1_home={x['quarter_1_home']}
                      quarter_1_away={x['quarter_1_away']}
                      quarter_2_home={x['quarter_2_home']}
                      quarter_2_away={x['quarter_2_away']}
                      quarter_3_home={x['quarter_3_home']}
                      quarter_3_away={x['quarter_3_away']}
                      quarter_4_home={x['quarter_4_home']}
                      quarter_4_away={x['quarter_4_away']}
                      status={x['status']}
                      current_quarter={x['current_quarter']}
                      current_quarter_seconds_remaining={x['current_quarter_seconds_remaining']}
                      home_pitcher={x['home_pitcher']}
                      home_pitcher_image={x['home_pitcher_image']}
                      home_pitcher_link={`/nba${PATH_LIST.PLAYER_DETAIL}/${x['home_pitcher_id']}`}
                      home_pitcher_era={x['home_pitcher_era']}
                      home_pitcher_wins={x['home_pitcher_wins']}
                      home_pitcher_loss={x['home_pitcher_loss']}
                      away_pitcher={x['away_pitcher']}
                      away_pitcher_image={x['away_pitcher_image']}
                      away_pitcher_link={`/nba${PATH_LIST.PLAYER_DETAIL}/${x['away_pitcher_id']}`}
                      away_pitcher_era={x['away_pitcher_era']}
                      away_pitcher_wins={x['away_pitcher_wins']}
                      away_pitcher_loss={x['away_pitcher_loss']}
                      pitcher_live_name={x['pitcher_live']}
                      pitcher_live_image={x['pitcher_live_image']}
                      pitcher_link={`/nba${PATH_LIST.PLAYER_DETAIL}/${x['pitcher_live_id']}`}
                      hitter_live_name={x['hitter_live']}
                      hitter_live_image={x['hitter_live_image']}
                      hitter_link={`/nba${PATH_LIST.PLAYER_DETAIL}/${x['hitter_live_id']}`}
                      link2={`/nba${PATH_LIST.GAME_DETAIL}/${x['id']}`}
                      linkBox={`/nba${PATH_LIST.BOX}/${x['id']}`}
                      date={x['date_z']}
                      link={`/nba${PATH_LIST.FORECAST_DETAIL}/${x['home_team_abbr']}-${x['away_team_abbr']}/${getDate2(x.date_z)}`}
                    />
                    </div>
                  </Col>
                )
                }
                })}
              </Row>
            </div>
          </div>
        )
  };

  const getLoading = () => {
    return  (
    <div className = "loading-container" >
      <img src = {IMAGE["loading"]} alt = "loading" className = "loading-image" />
    </div>
    )    
  }

  return (
    <div id="home">
      <Menu sport_default={"nba"} signOut={signOut} user={user}/>
      <Container>
        {/* {
          renderTodaysGame()
        } */}
        {
          isLoading == false ? getLoading() : renderTodaysGame()
        }
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <Chatbot player={team || pitcher} pre_prompt={prompt} />
      </Modal>
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader>FANBLITZ WANTS YOU TO BET RESPONSIBLY!</ModalHeader>
        <ModalBody>
          <p>FanBlitz understands and embraces the excitement of sports betting, but we also promote responsible betting. It's important to remember to only bet what you can afford to lose and not go over your budget.</p>
          <p>While it's assured that you will lose some bets, using FanDuel's tools, information, and data can help you minimize your losses and even potentially win some! So, enjoy the thrill of sports betting, but always remember to bet responsibly.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle2}>Cancel</Button>
          <Button color="primary" href="https://ny.sportsbook.fanduel.com/navigation/nba">Continue</Button>
        </ModalFooter>
      </Modal>
    </div>    
  );

  
}

export default LiveGame;
