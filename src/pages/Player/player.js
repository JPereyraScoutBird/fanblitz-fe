import CustomTable from "../../component/Table";
import Menu from "../../container/Menu";
import Menu2 from "../../container/Menu2";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

function Player(route) {
    const location = useLocation();
    const [playerName, setplayerName] = useState(location.state.name);
    const [playerInfo, setplayerInfo] = useState(location.state.personalInfo);
    const [teamData, setTeamData] = useState(location.state.data);
    const [pitcherData, setPitcherData] = useState(location.state.pitcherData);
    const [batterData, setBatterData] = useState(location.state.batterData);
    const [showTable, setShowTable] = useState(location.state.table);
    console.log("playerName", playerName)
    const renderTable = () => {
        if (showTable === "hitters") {
        return teamData.length == 0 ? <div></div> :  <CustomTable header={headerHitting} data={teamData}/>;
        } else if (showTable === "pitchers") {
        return teamData.length == 0 ? <div></div> :  <CustomTable header={headerPitching} data={pitcherData}/>;
        }
        return null;
    };

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
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>Player Summary</h2>
            <div>
                <div style={{ width: "2rem", height: "2rem", border: "1px solid white", "margin-right": "1rem"}}>
                    <img src={playerInfo.image} alt="photo" />
                </div>
                <div>
                    <h4>{playerName}</h4>
                    <h7>Born: {playerInfo.born}</h7>
                    <br></br>
                    <h7>Height: {playerInfo.height}</h7>
                    <br></br>
                    <h7>Weight: {playerInfo.weight}</h7>
                </div>
            </div>
            <br></br>
            {renderTable()}
        </div>
        </div>    
    );

}

export default Player;
