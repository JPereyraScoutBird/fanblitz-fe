<<<<<<< HEAD
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";


export async function loader({ params }) {
    return params;
}


function Player(route) {
    const location = useLocation();
    const { playerId } = useLoaderData();
    const [playerDetail, setplayerDetail] = useState([])
    console.log("User id: ", playerId)

    useEffect(() => {
        const fetchData2 = async () => {
            console.log("User id: ", playerId)
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players?id=${playerId}`);
                const jsonObject = JSON.parse(response.data.body)
                setplayerDetail(jsonObject[0])
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData2();
    }, []);
    
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>Player Summary</h2>
            <div className="d-flex">
                <div style={{ border: "1px solid white", "margin-right": "1rem"}}>
                    <img src={playerDetail.image} alt="photo" />
                </div>
                <div>
                    <h4>{playerDetail['full_name']}</h4>
                    <h7>Born: {playerDetail.birth_date}</h7>
                    <br></br>
                    <h7>Height: {playerDetail.height}</h7>
                    <br></br>
                    <h7>Weight: {playerDetail.weight}</h7>
                </div>
            </div>
            <br></br>
        </div>
        </div>    
    );
=======
import CustomTable from "../../component/Table";
import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function Player() {
  const [teamData, setTeamData] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [batterData, setBatterData] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players');
        const jsonObject = JSON.parse(response.data.body.body)
        const response2 = jsonObject.map(x => ({...x, "full_name": x.first_name + ", " + x.last_name, "ops": x.batter_on_base_percentage + x.batter_slugging_percentage}))
        setPlayerData(response2.filter(x => x['position'] == 'P')[0])
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
 
  renderPlayerProfile = (player) => (
    <div>
        <h2>{player.first_name} {player.last_name}</h2>
    </div>
  )

  return (
    <div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Player Stats</h2>
        {teamData.length == 0 ? <div></div> :  <CustomTable header={header} data={batterData}/>}
      </div>
    </div>    
  );
>>>>>>> 33c6417af4dc8396ad86337a67d1ee42f853a414

}

export default Player;
