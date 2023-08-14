import CustomTable from "../../../component/Table";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import SearchTable from "../../../component/SearchTable";

function Players() {
    const [teamData, setTeamData] = useState([]);
    const [pitcherData, setPitcherData] = useState([]);
    const [batterData, setBatterData] = useState([]);
    const [showTable, setShowTable] = useState("hitters");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players');
                const jsonObject = JSON.parse(response.data.body)
                // const response2 = jsonObject.map(x => ({...x, "full_name": x.first_name + ", " + x.last_name, "ops": x.batter_on_base_percentage + x.batter_slugging_percentage}))
                setPitcherData(jsonObject.filter(x => x['position'] == 'P'))
                setBatterData(jsonObject.filter(x => x['position'] != 'P'))
                setTeamData(jsonObject);
                console.log("jsonObject", jsonObject.length)
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2();
    }, []);

    const handleButtonHitting = () => {
        setShowTable("hitters");
    };

    const handleButtonPitching = () => {
        setShowTable("pitchers");
    };

    const onClick = (user) => {
        navigate(`/mlb${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
    }

    const renderTable = () => {
        if (showTable === "hitters") {
        return <CustomTable search={true} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData.length == 0} pagination={true} range={15} header={headerHitting} data={batterData} onClick={(user) => onClick(user)}/>;
        } else if (showTable === "pitchers") {
        return <CustomTable search={true} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData.length == 0} pagination={true} range={15} header={headerPitching} data={pitcherData} onClick={(user) => onClick(user)}/>;
        }
        return null;
    };

    const headerHitting = {
        "full_name": "Name",
        "mysportfeeds_abbreviation": "Team",
        "ops": "OPS",
        "batter_slugging_percentage": "SLG",
        "batter_on_base_percentage": "OBP",
        "batting_average": "AVG",
        "at_bats": "AB",
        "runs": "R",
        "hits": "H",
        "second_based_hits": "2B",
        "third_base_hits": "3B",
        "homeruns": "HR",
        "runs_batted_in": "RBI",
        "batter_walks": "BB",
        "batter_strike_outs": "SO",
        "stolen_bases": "SB",
        "position": "P"
    }

    const headerPitching = {
        "full_name": "Name",
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
        "walks_and_hits_per_inning_pitched": "WHIP",
        // "walks_allowed_per_9_innings": "BB/IP",
        // "hits_allowed_per_9_innings": "H/IP",
        // "strikeouts_to_walks_ratio": "SO/IP"
    }
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            {/* <div className="d-flex align-items-center">            
                <h2 className="mr-4">Player Stats</h2>
                <SearchTable className="ml-4" placeholder="Player name or team" list={batterData} onChange={e => setBatterData(e)}/>
            </div> */}
            <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
            <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000" }} onClick={handleButtonHitting} >Hitting</button>
            <button style={{ border: "none", background: "transparent", padding: "0", color: "#000" }} onClick={handleButtonPitching}>Pitching</button>
            </div>
            {renderTable()}
        </div>
        </div>    
    );

}

export default Players;
