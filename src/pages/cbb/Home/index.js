import Menu from "../../../container/Menu3";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '../../../component/Table';
import { filterByDate, getDate, getDate2, getTodayItems, getTimeGame } from "../../../utils";
import CardForecastComponent from "../../../component/CardForecast";
import { Form, FormGroup, Label, Input, Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
import Footer from "../../../container/Footer";
import {
  setStatus,
  selectUserStatus,
} from '../../../reducers/userLogin';
import {
  setBetHomeStatus,
  selectBetStatus,
} from '../../../reducers/betFromHome';


function Home(props) {
  const dispatch = useDispatch();
  // const isUserLogin = false
  const isUserLogin = useSelector(selectUserStatus);
  const isBetFromHome = useSelector(selectBetStatus);
  const {user, signOut} = props
  const [gptStyle, setGptStye] = useState('')
  // const gameDataStore = useSelector((state) => state.gameData.value);
  const [gameData, setGameData] = useState([]);
  const [pitcherStrikeoutData, setPitcherStrikeout] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(0);
  // const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [team, setTeam] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modalBet, setModalBet] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [pitcher, setPitcher] = useState('')
  const [standing, setStanding] = useState(0)
  const [bet, setBet] = useState('')
  const [amount, setAmount] = useState('');
  const [gameBet, setGame] = useState(<></>);
  const [gameId, setGameId] = useState('');

  const toggle = () => setModal(!modal)
  const toggle2 = () => setModal2(!modal2)
  const toggle3 = () => setModal3(!modal3)
  const toggleSetBet = () => setModalBet(!modalBet)

  const breakpoint = 620;
  const [showTable, setShowTable] = useState("score");

  // console.log("Reducer User home: ", isUserLogin)
  console.log("REDUCER isBetFromHome home: ", isBetFromHome)

  if(isBetFromHome == true && isUserLogin != undefined){
    dispatch(setBetHomeStatus(false))
  }

  const fetchData = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/games',);
        const jsonObject = JSON.parse(response.data.body)
        // console.log(" Data: ", jsonObject)
        const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z']), "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])})) : []
        console.log("Data: ", response_formated)
        // console.log("games", response_formated)
        const standing_home = response_formated.length ? Math.min(...response_formated.map(item => item.home_position)) : 0
        const standing_away = response_formated.length ? Math.min(...response_formated.map(item => item.away_position)) : 0
        setGameData(response_formated)
        // console.log("standing home", standing_home)
        // console.log("standing away", standing_away)
        if (standing_home>standing_away){
          setStanding(standing_away)
        }else{
          setStanding(standing_home)
        }
        
      } catch (error) {
        console.error('Error getting data:', error);
      }
  };

  const fetchDataScoreData = async () => {
    try {
      const responseModel = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/teams/score');
      const jsonObjectModel = JSON.parse(responseModel.data.body)
      let response_formatedModel = jsonObjectModel.length ? jsonObjectModel.map(x => ({
        ...x,
        "date_z": getDate(x['date_z']),
        "time_z": getTimeGame(x['date_z']),
        "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])
      })) : []

      response_formatedModel = response_formatedModel.length ? response_formatedModel.map(x => ({
        ...x,
        "away_pts": (x['pts_home'] + x['margin_spread_fanblitz']).toFixed(0),
        'pts_home': x['pts_home'].toFixed(0),
        "home_name": x['home_team_city'],
        "away_name": x['away_team_city'],
        "game_name": x['home_team_city'] + " " + x['home_team'] + " vs " + x['away_team_city'] + " " + x['away_team']
      })) : []
      console.log("games2", response_formatedModel)
      setPitcherStrikeout(response_formatedModel)
    } catch (error) {
      console.error('Error getting data:', error);
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataScoreData();
  }, [], gameData);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const geImage = (homeTeam, homeImage) =>{
    try{
      let aux = homeTeam.replace(/\s+/g, "_")
      aux = aux.replace(/&/g, "_")
      if (IMAGE.CBB.hasOwnProperty(aux)){
        return IMAGE.CBB[aux]
      }
      return homeImage
    }
    catch(e){
      return IMAGE.CBB["Logo0"]
    }
  }

  const renderForecastComponent = (game) => {
    console.log("game card", game)
    if(game.home_pos_top_25 <= 25 || game.away_pos_top_25 <= 25 || true){
      game.home_pos_top_25 = game.home_pos_top_25 == null? "": game.home_pos_top_25
      game.away_pos_top_25 = game.away_pos_top_25 == null? "": game.away_pos_top_25
      return <CardForecastComponent
              key={uuid()} 
              className="col-12 col-md-6"
              title={`${game.home_team_city} ${game.home_pos_top_25} vs. ${game.away_team_city} ${game.away_pos_top_25}`}
              imageSrc={(geImage(game.home_team_abbr, game.home_image))}
              // imageSrc={IMAGE[game.home_team_abbr]}
              body={
                <div>
                  <p>{game.venue}.<br></br>
                  {/* <p>{constant.team_detail[game.home_team_abbr].stadium}.<br></br> */}
                  {game.date_z}<br></br>
                  Spread (H): Vegas {game.home_spreads_draftkings}, FB:{game.margin_spread_fanblitz}</p>
                </div>
              }
              footer={<Link to={`/cbb${PATH_LIST.FORECAST_DETAIL}/${game.home_team_abbr}-${game.away_team_abbr}/${getDate2(game.date_z)}`} className="btn btn-outline-light" outline={true}>FanBlitz Analysis</Link>}
            />
    }
    return <></>
  }
    

  const next = (items) => {
    if(items.length - 1 > indexCarousel) {
      setIndexCarousel(indexCarousel + 1)
    } else {
      setIndexCarousel(0)
    }
  }

  const prev = (items) => {
    if(indexCarousel == 0) {
      setIndexCarousel(items.length - 1)
    } else {
      setIndexCarousel(indexCarousel - 1)
    }
  }

  const handleButtonHome = () => {
    setShowTable("home");
  };

  const handleButtonScoreModel = () => {
    setShowTable("score");
  };

  const onClick = (game) => {
    navigate(`/cbb${PATH_LIST.LIVE}`);
  }
  
  const onClick2 = (game) => {
    const new_team = gameData.find(x => x['home_team_abbr'] == game.home_team_abbr)['home_name']
    const city = game['home_team_city']
    const name = game['home_team']

    // console.log("home team klok 2", new_team)
    const new_team2 = `${city} ${name}`
    setTeam(new_team2)
    setPrompt(`${new_team2}' college basketball team history`)
    toggle()
  }
  
  const onClick3 = (game) => {
    const new_team = gameData.find(x => x['away_team_abbr'] == game.away_team_abbr)['away_team']
    const city = game['away_team_city']
    const name = game['away_team']
    const new_team2 = `${city} ${name}`

    setTeam(new_team2)
    setPrompt(`${new_team2}' college basketball team history`)
    toggle()
  }

  
  const onClick4 = (game) => {
    toggle2()
  }

  const onClick6 = (pitcher_name) => {
    // console.log("pitcher", player_full_name)
    setPitcher(pitcher_name['player_full_name'])
    setPrompt(`${pitcher_name['player_full_name']} college basketball player short biography`)
    toggle()
  }

  const onClick7 = (player) => {
    setTeam(player['pitcher_team_full'])
    setPrompt(`${player['pitcher_team_full']}' college basketball team history`)
    toggle()
  }

  const onClick8 = (player) => {
    setTeam(player['opp_team_full'])
    setPrompt(`${player['opp_team_full']}' college basketball team history`)
    toggle()
  }

  const onClickSetBet = (game) => {
    setGame(<option value={game.id}>
      {game.home_team_abbr} vs {game.away_team_abbr}
    </option>)
  }
  
  const onClick5 = (game) => {
    navigate(`/cbb${PATH_LIST.FORECAST_DETAIL}/${game.home_team_abbr}-${game.away_team_abbr}/${getDate2(game.date_z)}`);
  }

  const setBets = () =>{
    if(isUserLogin == undefined){
      dispatch(setBetHomeStatus(true))
      toggle3()
    }else{
      toggleSetBet()
    }
  }

  const onClickLogin = () => {
    navigate(`/cbb${PATH_LIST.SOCIAL_BETS}`);
  }

  const renderTableStrikeoutModel = (table, data, date, backgroundColor = "#000", color='#fff') => {
      if(table == 'score' || false) {
        // let dataAux = data["strikeout"]
        let dataAux = data["strikeout"].length ? data["strikeout"].map(x => ({...x, "bet_icon": <a onClick={setBets}>Set a Bet</a>})) : []
        dataAux = dataAux.sort((a,b) => a.time_z.localeCompare(b.time_z))
        console.log("Data aux", dataAux)

        // <a onClick={toggle2}>See Bet</a>
        const header = {
          "time_z": "Time",
          "home_name": "Home",
          "away_name": "Away",
          "pts_home": "Fanblitz Home Score",
          "away_pts": "Fanblitz Away Score",
          "margin_spread_fanblitz": "Fanblitz spread",
          "home_spreads_draftkings": "Vegas spread",
          "difference": "Diff.",
          // "max_bet": "Max bet",
          // "min_bet": "Min bet",
          // "average_bet": "Avg. bet",
          // "bet_icon": "Bet",
        };
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>NCAA Men Basketball Game Schedule</h2>
            <br></br>
            <div className="mb-4">
              <DatePagination date={date} onClick={(date) => setDate(date)}/>
            </div>
            <CustomTable search={true} search_placeholder="Search game on table"  search_keys={['game_name']} noRange={false} pagination={true} range={50} header={header} data={dataAux.filter(x => filterByDate(x.date_z, date.toDate()))} loading={dataAux.length == 0} onClickList={[(game) => onClick(game), (game) => onClick2(game), (game) => onClick3(game), (game) => onClick4(game), (game) => onClick5(game), undefined, undefined, undefined, undefined, undefined, undefined, (game) => onClickSetBet(game)]}/>
          </div>
        )
      }
      else {
        const dataAux = data["home"].sort((a,b) => a.date_z - b.date_z)
        console.log("Data aux", dataAux)
        // dataAux = dataAux.sort((a,b) => b.date_z - a.date_z)

        const header = {
          "date_z": "Date",
          "home_team_abbr": "Home",
          "away_team_abbr": "Away",
          "home_spreads_draftkings": "Vegas",
          "margin_spread_fanblitz": "Fanblitz",
          "difference": "Difference",
        };
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>NCAA Men Basketball Game Schedule</h2>
            <div className="mb-4">
              <DatePagination date={date} onClick={(date) => setDate(date)}/>
            </div>
            <CustomTable noRange={false} pagination={true} range={50} header={header} data={dataAux.filter(x => filterByDate(x.date_z, date.toDate()))} loading={dataAux.length == 0} onClickList={[(game) => onClick(game), (game) => onClick2(game), (game) => onClick3(game), (game) => onClick4(game), (game) => onClick5(game)]}/>
          </div>
        )
      }
  };

  const renderCards = () => {
    console.log("klok", pitcherStrikeoutData)
    if (pitcherStrikeoutData != undefined && pitcherStrikeoutData.length > 0) {
      const today_games = pitcherStrikeoutData.filter(x => (getTodayItems(x.date_z) && (parseInt(x.home_pos_top_25) <= 25 || parseInt(x.away_pos_top_25) <= 25) && (x.venue != "Reed Arena")))
      const today_games2 = [...today_games]
      const newArr = []
      while(today_games.length) newArr.push(today_games.splice(0,2))
      if (width > breakpoint ) {
        return (
        <Carousel style={{zIndex: "4"}} activeIndex={indexCarousel} next={() => next(newArr)} previous={() => prev()}>
          <CarouselIndicators items={newArr} activeIndex={indexCarousel} onClickHandler={(index) => setIndexCarousel(index)} />
          {newArr.map(x => x.length > 1 ? 
          <CarouselItem>
            <Row>
              {renderForecastComponent(x[0])}
              {renderForecastComponent(x[1])}
            </Row>
          </CarouselItem> :
          <CarouselItem>
          <Row>{renderForecastComponent(x[0])}</Row>  
          </CarouselItem>)}
          <CarouselControl style={{zIndex: "20"}} direction="prev" directionText="Previous" onClickHandler={() => prev(newArr)} />
          <CarouselControl style={{zIndex: "20"}} direction="next" directionText="Next" onClickHandler={() => next(newArr)} />
        </Carousel>
        )
      }
      return (
        <Carousel style={{zIndex: "4"}} activeIndex={indexCarousel} next={() => next(today_games2)} previous={() => prev()}>
          <CarouselIndicators items={today_games2} activeIndex={indexCarousel} onClickHandler={(index) => setIndexCarousel(index)} />
          {today_games2.map(x => (
          <CarouselItem>
            <Row>
              {renderForecastComponent(x)}
            </Row>
          </CarouselItem>
          ))}
          <CarouselControl style={{zIndex: "20"}} direction="prev" directionText="Previous" onClickHandler={() => prev(newArr)} />
          <CarouselControl style={{zIndex: "20"}} direction="next" directionText="Next" onClickHandler={() => next(newArr)} />
        </Carousel>
      )
    } else {
      return null
    }
  }

  const submitBet = async (e) => {
    e.preventDefault()
    console.log("users", isUserLogin)
    const body = {
    "user_id": isUserLogin.username,
    "username": isUserLogin.attributes.email,
    "email": isUserLogin.attributes.email,
    "sport_id": 2,
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
      fetchDataScoreData()
      toggleSetBet()
      
      console.log("response set bet", response_submit)

    } catch (error) {
      console.error('Error getting data:', error);
    }
  }
  
  return (
    <div id="home">
      <Menu sport_default={"cbb"} signOut={signOut} user={user} onChange={(e) => setGptStye(e)}/>
        {
          renderCards()
        }
        <br></br>
      <Container>
        <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
          {/* <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000", fontWeight: `${showTable == "home" ? "bold" : "normal"}`}} onClick={handleButtonHome} >Spread Model</button> */}
          <button style={{ border: "none", background: "transparent", padding: "0", color: "#000", fontWeight: `${showTable == "score" ? "bold" : "normal"}`}} onClick={handleButtonScoreModel}>Score Model</button>
        </div>
      </Container>
      <Container>
        {renderTableStrikeoutModel(showTable, {"home": gameData, "strikeout": pitcherStrikeoutData}, date)}
      </Container>
      <Footer />  
      <Modal isOpen={modal} toggle={toggle}>
        <Chatbot player={team || pitcher} pre_prompt={prompt} gptStyle={gptStyle}/>
      </Modal>
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader>FANBLITZ WANTS YOU TO BET RESPONSIBLY!</ModalHeader>
        <ModalBody>
          <p>FanBlitz understands and embraces the excitement of sports betting, but we also promote responsible betting. It's important to remember to only bet what you can afford to lose and not go over your budget.</p>
          <p>While it's assured that you will lose some bets, using FanDuel's tools, information, and data can help you minimize your losses and even potentially win some! So, enjoy the thrill of sports betting, but always remember to bet responsibly.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle2}>Cancel</Button>
          <Button color="primary" href="https://ny.sportsbook.fanduel.com/navigation/cbb">Continue</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal3} toggle={toggle3}>
        <ModalHeader>FANBLITZ WANTS YOU TO BET RESPONSIBLY!</ModalHeader>
        <ModalBody>
          <p>FanBlitz understands and embraces the excitement of sports betting, but we also promote responsible betting. It's important to remember to only bet what you can afford to lose and not go over your budget.</p>
          <p>While it's assured that you will lose some bets, using FanDuel's tools, information, and data can help you minimize your losses and even potentially win some! So, enjoy the thrill of sports betting, but always remember to bet responsibly.</p>
          <p>In order to create your bet we need to identify you. If you wish to register or login please press continue.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle3}>Cancel</Button>
          <Button color="primary" onClick={onClickLogin}>Continue</Button>
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalBet} toggle={toggleSetBet}>
        <ModalHeader style={{backgroundColor: "#000", color: "#fff"}} toggle={toggleSetBet}>Set New Bet</ModalHeader>
        <ModalBody>
            <Form inline onSubmit={(e) => submitBet(e)}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="sportSelect" className="mr-sm-2">Sport</Label>
              <Input
                id="sportSelect"
                name="select"
                type="select"
              >
                <option value={2} hidden>NCAA Men Basketball</option>
                <option value={2}>
                  NCAA Men Basketball
                </option>
              </Input>
            </FormGroup>
            <br></br>
            <FormGroup>
              <Label for="gameSelect" className="mr-sm-2">Games</Label>
              <Input
                id="gameSelect"
                name="select"
                type="select"
                onChange={e => setGameId(e.target.value)}
              >
              <option value="" hidden>Please select</option>
              {gameBet}
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
              <Button outline className='btn mt-4 mr-4 mb-4' onSubmit={(e) => toggleSetBet()}>Cancel</Button>
              <Button disabled={bet=='' || amount == ''} className='btn ml-2 mt-4 mb-4' onSubmit={(e) => submitBet(e)}>Submit</Button>
            </div>
          </Form>
        </ModalBody >
      </Modal> 


    </div>    
  );

  
}

export default Home;
