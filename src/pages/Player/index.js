import CustomTable from "../../component/Table";
import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function Player() {
  const [teamData, setTeamData] = useState([]);
  const [pitcherData, setPitcherData] = useState([]);
  const [batterData, setBatterData] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players');
        const jsonObject = JSON.parse(response.data.body.body)
        const response2 = jsonObject.map(x => ({...x, "full_name": x.first_name + ", " + x.last_name, "ops": x.batter_on_base_percentage + x.batter_slugging_percentage}))
        setPitcherData(response2.filter(x => x['position'] == 'P'))
        setBatterData(response2.filter(x => x['position'] != 'P'))
        setTeamData(jsonObject);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData2();
  }, []);


  const header = {
    "full_name": "Name",
    "odds_api": "Team",
    "ops": "OPS",
    "batter_slugging_percentage": "SLG",
    "batter_on_base_percentage": "OBP",
    "batter_ground_balls": "GP",
    "at_bats": "AB",
    "runs": "R",
    "hits": "H",
    "batter_double_plays": "2B",
    "batter_triple_plays": "3B",
    "homeruns": "HR",
    "runs_batted_in": "RBI",
    "earned_run_agerage": "BB",
    "strikeouts_per_9_innings": "SO",
    "stolen_bases": "SB",
    "balks": "BA"
  }
 
  return (
    <div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Team Stats</h2>
        {teamData.length == 0 ? <div></div> :  <CustomTable header={header} data={batterData}/>}
      </div>
    </div>    
  );

}

export default Player;
