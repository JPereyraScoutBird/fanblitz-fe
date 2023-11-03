import Menu from "../../../container/Menu3";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '../../../component/Table';
import { filterByDate, getDate, getDate2, getTodayItems } from "../../../utils";
import CardForecastComponent from "../../../component/CardForecast";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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


function Home(props) {
  const dispatch = useDispatch();
  const {user, signOut} = props
  const [gptStyle, setGptStye] = useState('')
  // const gameDataStore = useSelector((state) => state.gameData.value);
  const [gameData, setGameData] = useState([]);
  const [pitcherStrikeoutData, setPitcherStrikeout] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(0);
  // const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const [date, setDate] = useState(moment(new Date('2023-11-07').toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [team, setTeam] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [pitcher, setPitcher] = useState('')
  const [standing, setStanding] = useState(0)

  const toggle = () => setModal(!modal)
  const toggle2 = () => setModal2(!modal2)
  const breakpoint = 620;
  const [showTable, setShowTable] = useState("home");

  const fetchData = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/games',);
        const jsonObject = JSON.parse(response.data.body)
        const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z']), "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])})) : []
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
      let response_formatedModel = jsonObjectModel.length ? jsonObjectModel.map(x => ({...x, "date_z": getDate(x['date_z']), "difference":  x['margin_spread_fanblitz']  })) : []
      response_formatedModel = response_formatedModel.length ? response_formatedModel.map(x => ({...x,  "away_pts": (x['pts_home'] + x['margin_spread_fanblitz']).toFixed(1), 'pts_home':x['pts_home'].toFixed(1)       })) : []
      
      // console.log("games2", response_formatedModel)
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
    if(game.home_position <= 0 || game.away_position <= 0 || true){
      return <CardForecastComponent
              key={uuid()} 
              className="col-12 col-md-6"
              title={`${game.home_team} ${parseInt(game.home_position)+1} vs. ${game.away_team} ${parseInt(game.away_position)+1}`}
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
    const new_team = gameData.find(x => x['home_team_abbr'] == game.home_team_abbr)['home_team']
    setTeam(new_team)
    setPrompt(`${new_team}' college basketball team history`)
    toggle()
  }
  
  const onClick3 = (game) => {
    const new_team = gameData.find(x => x['away_team_abbr'] == game.away_team_abbr)['away_team']
    setTeam(new_team)
    setPrompt(`${new_team}' college basketball team history`)
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
  
  const onClick5 = (game) => {
    navigate(`/cbb${PATH_LIST.FORECAST_DETAIL}/${game.home_team_abbr}-${game.away_team_abbr}/${getDate2(game.date_z)}`);
  }
  
  const renderTableStrikeoutModel = (table, data, date, backgroundColor = "#000", color='#fff') => {
      if(table == 'score' || false) {
        const dataAux = data["strikeout"]
        const header = {
          "date_z": "Date",
          "home_team_abbr": "Home",
          "away_team_abbr": "Away",
          "pts_home": "Fanblitz Home Score",
          "away_pts": "Fanblitz Away Score",
          "difference": "Difference",
        };
        return (
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>NCAA Men Basketball Game Schedule</h2>
            <br></br>
            <div className="mb-4">
              <DatePagination date={date} onClick={(date) => setDate(date)}/>
            </div>
            <CustomTable noRange={false} pagination={true} range={50} header={header} data={dataAux.filter(x => filterByDate(x.date_z, date.toDate()))} loading={dataAux.length == 0} onClickList={[(game) => onClick(game), (game) => onClick2(game), (game) => onClick3(game), (game) => onClick4(game), (game) => onClick5(game)]}/>
          </div>
        )
      }
      else {
        const dataAux = data["home"]
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
    if (gameData != undefined && gameData.length > 0) {
      const today_games = gameData.filter(x => (getTodayItems(x.date_z, '2023-11-07') && (x.home_position <= standing || x.away_position <= standing)))
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
  
  return (
    <div id="home">
      <Menu sport_default={"cbb"} signOut={signOut} user={user} onChange={(e) => setGptStye(e)}/>
        {
          renderCards()
        }
        <br></br>
      <Container>
        <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
          <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000", fontWeight: `${showTable == "home" ? "bold" : "normal"}`}} onClick={handleButtonHome} >Spread Model</button>
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
    </div>    
  );

  
}

export default Home;
