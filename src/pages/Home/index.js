import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {setValue, cleanValue} from '../../reducers/Home'

function Home() {
  const dispatch = useDispatch();
  const gameDataStore = useSelector((state) => state.gameData.value);
  const [gameData, setGameData] = useState([]);
  console.log("dime")

  useEffect(() => {
    const fetchData = async () => {
      if (gameDataStore.length == 0) {
        try {
          const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/games',
          {
            // mode:'cors',
            // headers: {
            //   'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Methods': 'GET, OPTIONS ',
            //   'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            //   "Access-Control-Allow-Credentials": true
            // }
          }
          );
          const jsonObject = JSON.parse(response.data.body.body)
          dispatch(setValue(jsonObject))
          setGameData(jsonObject)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      // else{
      //   setGameData(gameDataStore);
      // }
    };
    
    fetchData();

    console.log("gameData", gameData)
    console.log("gameDataStore", gameDataStore)

  }, []);

  return (
    <div>
      <div>
         <Menu2 />
       </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h1>Game data</h1>
        <h4>gameDataStore {gameDataStore.length}</h4>
        <h4>gameData {gameData.length}</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Spread DraftKings</th>
              <th>Spread Fanblitz</th>
            </tr>
          </thead>
          {/* <tbody>
            {gameData.map((fila, index) => (
              <tr key={index}>
                <td>{fila.date_et}</td>
                <td>{fila.home_team}</td>
                <td>{fila.away_team}</td>
                <td>{fila.home_spreads_draftkings}</td>
                <td>{fila.margin_spread_fanblitz}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
    
  );
}

export default Home;
