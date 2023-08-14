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

function Home(props) {
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

  const toggle = () => setModal(!modal)
  const toggle2 = () => setModal2(!modal2)
  const breakpoint = 620;


  const fetchData = async () => {
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
    
  const onClick = (game) => {
    navigate(`/mlb${PATH_LIST.GAME_DETAIL}/${game.id}`);
  }

  const onClick2 = (game) => {
    setTeam(gameData.find(x => x['home_team_abbr'] == game.home_team_abbr)['home_team'])
    toggle()
  }

  const onClick3 = (game) => {
    setTeam(gameData.find(x => x['away_team_abbr'] == game.away_team_abbr)['away_team'])
    toggle()
  }

  const onClick4 = (game) => {
    toggle2()
  }

  const onClick5 = (game) => {
    navigate(`/mlb${PATH_LIST.FORECAST_DETAIL}/${game.home_team_abbr}-${game.away_team_abbr}/${getDate2(game.date_z)}`);
  }

// =======
  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);


  const header = {
    "date_z": "Date",
    "home_team_abbr": "Home",
    "away_team_abbr": "Away",
    "home_spreads_draftkings": "Vegas",
    "margin_spread_fanblitz": "Fanblitz",
    "difference": "Difference"
  };

  const renderForecastComponent = (game) => (
    <CardForecastComponent
        key={uuid()} 
        className="col-12 col-md-6"
        title={`${game.home_team} vs. ${game.away_team}`}
        imageSrc={IMAGE[game.home_team_abbr]}
        body={
          <div>
            <p>{constant.team_detail[game.home_team_abbr].stadium}.<br></br>
            {game.date_z}<br></br>
            Spread (H): Vegas {game.home_spreads_draftkings}, FB:{game.margin_spread_fanblitz}</p>
          </div>
        }
        footer={<Link to={`/mlb${PATH_LIST.FORECAST_DETAIL}/${game.home_team_abbr}-${game.away_team_abbr}/${getDate2(game.date_z)}`} className="btn btn-outline-light" outline={true}>FanBlitz Analysis</Link>}
      />
  )

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

  const renderCards = () => {
    // console.log(gameData)
    if (gameData != undefined && gameData.length > 0) {
      const today_games = gameData.filter(x => getTodayItems(x.date_z))
      const today_games2 = [...today_games]
      const newArr = []
      while(today_games.length) newArr.push(today_games.splice(0,2))
      // console.log("today games: ", newArr)
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
      <Menu sport_default={"mlb"} signOut={signOut} user={user}/>
        {
          renderCards()
        }
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>MLB Game Schedule</h2>
          <div className="mb-4">
            <DatePagination date={date} onClick={(date) => setDate(date)}/>
          </div>
          <CustomTable noRange={true} range={50} header={header} data={gameData.filter(x => filterByDate(x.date_z, date.toDate()))} loading={gameData.length == 0} onClickList={[(game) => onClick(game), (game) => onClick2(game), (game) => onClick3(game), (game) => onClick4(game), (game) => onClick5(game)]}/>
        </div>
      </Container>    
      <Modal isOpen={modal} toggle={toggle}>
        <Chatbot player={team} pre_prompt={`${team}' baseball team history`} />
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
    </div>    
  );

  
}

export default Home;
