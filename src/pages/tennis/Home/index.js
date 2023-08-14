import Menu from "../../../container/Menu3";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '../../../component/Table';
import { filterByDate, getDate, getDate2, getTodayItems, removechars } from "../../../utils";
import CardForecastComponent from "../../../component/CardForecast";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import IMAGE from '../../../img';
import constant from "../PlayerDetail/constant";
import DatePagination from "../../../component/DatePagination";
import moment from 'moment'
import uuid from 'react-uuid';

import './style.css'

function HomeTennis(props) {
  const {user, signOut} = props
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(0)
  const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) ))
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const fetchData = async () => {
    // if (gameDataStore.length == 0) {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/tennis/games',
        );
        const jsonObject = JSON.parse(response.data.body)
        // console.log(jsonObject)
        const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_z": getDate(x['date_z'])})) : []
        setGameData(response_formated)
        // dispatch(setValue(response_formated))
      } catch (error) {
        console.error('Error getting data:', error);
      }
    // }
    // else {
    //   // setGameData([...gameDataStore.payload])
    // }

  };

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000)
    return () => clearInterval(interval)
  }, []);
    

  // }, []);

  const header = {
    "date_z": "Date",
    "home_player": "Player Home",
    "away_player": "Player Away",
    "home_score": "Home score",
    "away_score": "Away score",
    "tournament_name": "Tournament",
    "event_type": "Tournament Type"
  };

  const renderForecastComponent = (game, img) => (
    <CardForecastComponent
        key={uuid()} 
        className="col-12 col-md-6"
        title={`${game.home_player} vs. ${game.away_player}`}
        imageSrc={IMAGE.TENNIS[img]}
        body={
          <div>
            {game.tournament_name}.<br></br>
            {game.date_z}<br></br>
            {/* Spread (H): Vegas {game.home_spreads_draftkings}, FB:{game.margin_spread_fanblitz}</p> */}
          </div>
        }
        footer={<Link to={`/tennis${PATH_LIST.FORECAST_DETAIL}/${removechars(game.home_player)}-${removechars(game.away_player)}/${getDate2(game.date_z)}`} className="btn btn-outline-light" outline={true}>FanBlitz Analysis</Link>}
      />
  )

  // const renderForecastComponent = (game, img) => (
  //   <CardForecastComponent 
  //       className="col-12 col-md-6"
  //       title={`${game.home_player} vs. ${game.away_player}`}
  //       imageSrc={IMAGE.TENNIS[img]}
  //       body={
  //         <div>
  //           <p>
  //           {game.tournament_name}.<br></br>
  //           {game.date_z}<br></br>
  //           {/* Spread (H): Vegas {game.home_spreads_draftkings}, FB:{game.margin_spread_fanblitz} */}
  //           </p>
  //         </div>
  //       }
  //       footer={<Link to={`/tennis${PATH_LIST.FORECAST_DETAIL}/${removechars(game.home_player)}-${removechars(game.away_player)}/${getDate2(game.date_z)}`} className="btn btn-outline-light" outline={true}>FanBlitz Analysis</Link>}
  //     />
  // )

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
    // const renderCards = () => {
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
            {newArr.map((x, pos) => x.length > 1 ? 
            <CarouselItem>
              <Row>
                {renderForecastComponent(x[0], `Logo${pos}`)}
                {renderForecastComponent(x[1], `Logo${newArr.length - pos}`)}
              </Row>
            </CarouselItem> :
            <CarouselItem>
            <Row>{renderForecastComponent(x[0], `Logo${pos}`)}</Row>  
            </CarouselItem>)}
            <CarouselControl style={{zIndex: "20"}} direction="prev" directionText="Previous" onClickHandler={() => prev(newArr)} />
            <CarouselControl style={{zIndex: "20"}} direction="next" directionText="Next" onClickHandler={() => next(newArr)} />
          </Carousel>
          )
        }
        console.log("width < breakpoint ?: ", today_games)
        return (
          <Carousel style={{zIndex: "4"}} activeIndex={indexCarousel} next={() => next(today_games2)} previous={() => prev()}>
            <CarouselIndicators items={today_games2} activeIndex={indexCarousel} onClickHandler={(index) => setIndexCarousel(index)} />
            {today_games2.map(x => (
            <CarouselItem>
              <Row>
                {renderForecastComponent(x, "Logo1")}
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
    // if (gameData != undefined && gameData.length > 0) {
    //   const today_games = gameData.filter(x => getTodayItems(x.date_z))
    //   const newArr = []
    //   while(today_games.length) newArr.push(today_games.splice(0,2))
    //   return (
    //   <Carousel activeIndex={indexCarousel} next={() => next(newArr)} previous={() => prev()}>
    //     <CarouselIndicators items={newArr} activeIndex={indexCarousel} onClickHandler={(index) => setIndexCarousel(index)} />
    //     {newArr.map(x => x.length > 1 ? 
    //     <CarouselItem>
    //       <Row>{renderForecastComponent(x[0], "Logo1")}
    //       {renderForecastComponent(x[1], 'Logo2')}
    //     </Row>
    //     </CarouselItem> :
    //     <CarouselItem>
    //     <Row>{renderForecastComponent(x[0], "Logo1")}</Row>  
    //     </CarouselItem>)}
    //     <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => prev()} />
    //     <CarouselControl direction="next" directionText="Next" onClickHandler={() => next(newArr)} />
    //   </Carousel>
    //   )
    // } else {
    //   return null
    // }
  // }

  return (
    <div id="home">
      <Menu sport_default={"tennis"} signOut={signOut} user={user}/>
        {
          renderCards()
        }
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>Tennis Game Schedule</h2>
          <div className="mb-4">
            <DatePagination date={date} onClick={(date) => setDate(date)}/>
          </div>
          <CustomTable noRange={true} range={50} header={header} data={gameData.filter(x => filterByDate(x.date_z, date.toDate()))} loading={gameData.length == 0}/>
        </div>
      </Container>    
    </div>    
  );

  
}

export default HomeTennis;
