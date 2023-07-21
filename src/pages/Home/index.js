import Menu from "../../container/Menu";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {setValue, cleanValue} from '../../reducers/Home';

import CustomTable from '../../component/Table';
import { getDate } from "../../utils";
import { Card, CardBody, CardFooter, CardImg } from "reactstrap";

function Home() {
  const dispatch = useDispatch();
  const gameDataStore = useSelector((state) => state.gameData.value);
  const [gameData, setGameData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (gameDataStore.length == 0) {
        try {
          const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/games',
          );
          const jsonObject = JSON.parse(response.data.body)
          console.log(jsonObject)
          const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "date_et": getDate(x['date_et']), "difference": Math.abs(x['home_spreads_draftkings'] - x['margin_spread_fanblitz'])})) : []
          setGameData(response_formated)
          dispatch(setValue(response_formated))
          console.log("response_formated", response_formated)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      else {
        console.log(gameDataStore)
        setGameData([...gameDataStore.payload])
      }

    };
    
    fetchData();
    

    console.log("gameData", gameData)
    console.log("gameDataStore", gameDataStore)

  }, []);

  const header = {
    "date_et": "Date",
    "home_team": "Home",
    "away_team": "Away",
    "home_spreads_draftkings": "Vegas",
    "margin_spread_fanblitz": "Fanblitz",
    "difference": "Difference"
  };


  return (
    <>
      <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>MLB Game Schedule</h2>
          {gameData && gameData.length > 0 ? <CustomTable noRange={true} range={50} header={header} data={gameData} loading={gameData.length == 0}/> : <>No Game Today</>}
        </div>
      </div>    
    </>    
  );

  
}

export default Home;
