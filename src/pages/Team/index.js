import CustomTable from "../../component/Table";
import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function Team() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/teams');
        const jsonObject = JSON.parse(response.data.body.body)
        const response2 = jsonObject.map(x => ({...x, "g": x.wins + x.losses, "ops": x.batter_on_base_percentage + x.batter_slugging_percentage}))
        console.log(response2)
        setTeamData(response2);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData2();
  }, []);

  const header = {
    "odds_api": "Team",
    "g": "G",
    "wins": "W",
    "at_bats": "AB",
    "runs": "R",
    "hits": "H",
    "homeruns": "HR",
    "batter_strike_outs": "SO",
    "runs_batted_in": "RBI",
    "batting_average": "AVG",
    "ops": "OPS",
    "batter_on_base_percentage": "OBP",
    "batter_slugging_percentage": "SLG",
    "earned_run_agerage": "ERA",
    "innings_pitched": "IP",
    "hits_allowed": "H Allow",
    "earned_runs_allowed": "R Allow",
    "homeruns_allowed": "HR Allow",
    "pitcher_strikeouts": "SO Opp",
    "walks_and_hits_per_inning_pitched": "WHIP",
    "pitching_average": "AVG Opp"
  }
 
  return (
    <div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Team Stats</h2>
        {teamData.length == 0 ? <div></div> :  <CustomTable header={header} data={teamData}/>}
      </div>
    </div>    
  );

}

export default Team;
