import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function Team() {
  const [teamData, setTeamData] = useState({});

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/teams');
        const jsonObject = JSON.parse(response.data.body.body)
        console.log(jsonObject)
        setTeamData(jsonObject);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData2();
  }, []);

  return (
    <div>
      <div>
         <Menu2 />
       </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h1>Game data</h1>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              {/* <th>League</th> */}
              <th>G</th>
              <th>W</th>
              <th>AB</th>
              <th>R</th>
              <th>H</th>
              {/* <th>2B</th> */}
              {/* <th>3B</th> */}
              <th>HR</th>
              <th>SO</th>
              <th>RBI</th>
              <th>AVG</th>
              <th>OPS</th>
              <th>OBP</th>
              <th>SLG</th>
              <th>ERA</th>
              <th>IP</th>
              <th>H Allow</th>
              <th>R Allow</th>
              <th>HR Allow</th>
              <th>SO Opp</th>
              <th>WHIP</th>
              <th>AVG Opp</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((fila, index) => (
              <tr key={index}>
                <td>{fila.odds_api}</td>
                <td>{fila.wins + fila.losses}</td>
                <td>{fila.wins}</td>
                <td>{fila.at_bats}</td>
                <td>{fila.runs}</td>
                <td>{fila.hits}</td>
                <td>{fila.homeruns}</td>
                <td>{fila.batter_strike_outs}</td>
                <td>{fila.runs_batted_in}</td>
                <td>{fila.batting_average}</td>
                <td>{fila.batter_on_base_percentage + fila.batter_slugging_percentage}</td>
                <td>{fila.batter_on_base_percentage}</td>
                <td>{fila.batter_slugging_percentage}</td>
                <td>{fila.earned_run_agerage}</td>
                <td>{fila.innings_pitched}</td>
                <td>{fila.hits_allowed}</td>
                <td>{fila.earned_runs_allowed}</td>
                <td>{fila.homeruns_allowed}</td>
                <td>{fila.pitcher_strikeouts}</td>
                <td>{fila.walks_and_hits_per_inning_pitched}</td>
                <td>{fila.pitching_average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );

}

export default Team;
