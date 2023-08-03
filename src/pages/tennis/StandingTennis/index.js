import Menu from "../../../container/Menu";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '../../../component/Table';
import CardForecastComponent from "../../../component/CardForecast";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl } from "reactstrap";
import IMAGE from '../../../img';

function StandingTennis() {
  const dispatch = useDispatch();
  // const gameDataStore = useSelector((state) => state.gameData.value);
  const [gameData, setGameData] = useState(undefined);
  const [gameATP, setATPData] = useState(undefined);
  const [gameWTA, setWATData] = useState(undefined);
  const [indexCarousel, setIndexCarousel] = useState(0)

  const fetchData = async () => {
    // if (gameDataStore.length == 0) {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/tennis/standing',
        );
        const jsonObject = JSON.parse(response.data.body)
        const response_formated = jsonObject.length ? jsonObject.map(x => ({...x})) : []
        const response_formatedATP = jsonObject.hasOwnProperty('atp') ? jsonObject.atp : []
        const response_formatedWTA = jsonObject.hasOwnProperty('wta') ? jsonObject.wta : []
        setGameData(response_formated)
        setATPData(response_formatedATP)
        setWATData(response_formatedWTA)
        // dispatch(setValue(response_formated))
      } catch (error) {
        console.error('Error getting data:', error);
      }
    // }
    // else {
    //   // setGameData([...gameDataStore.payload])
    // }

  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000)
    return () => clearInterval(interval)
  }, []);
    
  // }, []);

  const header = {
    "player_name": "Player",
    "player_country": "Country",
    "league": "League",
    "place": "Place",
    "points": "Points",
    "movement": "Movement"
  };

  const renderForecastComponent = (img, league) => (
    <CardForecastComponent 
        className="col-12 col-md-6"
        title={`${league}`}
        imageSrc={IMAGE.TENNIS[img]}
        body={
          <div>
            <p>
            </p>
          </div>
        }
      />
  )

  const next = (items) => {
    if(items.length < indexCarousel) {
      setIndexCarousel(indexCarousel + 1)
    } else {
      setIndexCarousel(0)
    }
  }

  const prev = () => {
    if(indexCarousel == 0) {
      setIndexCarousel(0)
    } else {
      setIndexCarousel(indexCarousel - 1)
    }
  }

  const renderCards = () => {
    if (gameWTA != undefined && gameWTA.length > 0 && gameATP != undefined && gameATP.length > 0) {
      const newArr = [{'ATP':0}, {'WTA':0}]
      return (
        <CarouselItem>
          <Row>{renderForecastComponent("Logo1", 'ATP')}
          {renderForecastComponent('Logo2', 'WTA')}
        </Row>
        </CarouselItem>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>Tennis Standing</h2>
          <br></br>
          <h3>ATP</h3>
          {gameATP && gameATP.length > 0 ? <CustomTable pagination={true} range={10} header={header} data={gameATP} loading={gameATP.length == 0}/> : <>No Standing Today</>}
          <br></br>
          <h3>WTA</h3>
          {gameWTA && gameWTA.length > 0 ? <CustomTable pagination={true} range={10} header={header} data={gameWTA} loading={gameWTA.length == 0}/> : <>No Standing Today</>}
        </div>
      </Container>    
    </>    
  );

  
}

export default StandingTennis;
