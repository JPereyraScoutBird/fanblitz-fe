import CustomTable from "../../component/Table";
import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";


export async function loader({ params }) {
    return params;
}


function Player(route) {
    const location = useLocation();
    const { userId } = useLoaderData();
    // const [playerName, setplayerName] = useState(location.state.name);
    // const [playerInfo, setplayerInfo] = useState(location.state.personalInfo);
    // const [teamData, setTeamData] = useState(location.state.data);
    // const [pitcherData, setPitcherData] = useState(location.state.pitcherData);
    // const [batterData, setBatterData] = useState(location.state.batterData);
    // const [showTable, setShowTable] = useState(location.state.table);
    // console.log("playerName", playerName)
    const [playerDetail, setplayerDetail] = useState([])
    console.log("User id: ", userId)

    useEffect(() => {
        const fetchData2 = async () => {
            console.log("User id: ", userId)
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players?id=${userId}`);
                //  axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players');
                const jsonObject = JSON.parse(response.data.body)
                // const response2 = jsonObject.map(x => ({...x, "full_name": x.first_name + ", " + x.last_name, "ops": x.batter_on_base_percentage + x.batter_slugging_percentage}))
                setplayerDetail(jsonObject[0])
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData2();
    }, []);
    
    // const renderTable = () => {
    //     if (playerDetail['position'] !== "p") {
    //     return  <CustomTable loading={playerDetail.length == 0} header={headerHitting} data={playerDetail}/>;
    //     } else if (playerDetail['position'] === "p") {
    //     return  <CustomTable loading={playerDetail.length == 0} header={headerPitching} data={playerDetail}/>;
    //     }
    //     return null;
    // };

    const headerHitting = {
        "season": "Year",
        "mysportfeeds_abbreviation": "Team",
        "position": "P",
        "ops": "OPS",
        "batter_slugging_percentage": "SLG",
        "batter_on_base_percentage": "OBP",
        "batting_average": "AVG",
        "at_bats": "AB",
        "runs": "R",
        "hits": "H",
        "batter_double_plays": "2B",
        "batter_triple_plays": "3B",
        "homeruns": "HR",
        "runs_batted_in": "RBI",
        "batter_walks": "BB",
        "batter_strike_outs": "SO",
        "stolen_bases": "SB"
    }

    const headerPitching = {
        "season": "Year",
        "mysportfeeds_abbreviation": "Team",
        "games_played": "G",
        "wins": "W",
        "losses": "L",
        "saves": "S",
        "earned_run_agerage": "ERA",
        "innings_pitched": "IP",
        "hits_allowed": "H",
        "second_base_hits_allowed": "2H",
        "homeruns_allowed": "HR",
        "pitcher_walks": "BB",
        "runs_allowed": "R",
        "earned_runs_allowed": "ER",
        "pitching_average": "AVG",
        "pitcher_on_base_percentage": "OBP",
        "pitcher_slugging_percentage": "SLG",
        "pitcher_ops": "OPS",
        "pitcher_strikeouts": "SO",
        "walks_and_hits_per_inning_pitched": "WHIP"
        
    }

    console.log("ASD: ", playerDetail)
    
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
                    <h7>Born: {playerDetail.born}</h7>
                    <br></br>
                    <h7>Height: {playerDetail.height}</h7>
                    <br></br>
                    <h7>Weight: {playerDetail.weight}</h7>
                </div>
            </div>
            <br></br>
            {/* {renderTable()} */}
        </div>
        </div>    
    );

}

export default Player;
