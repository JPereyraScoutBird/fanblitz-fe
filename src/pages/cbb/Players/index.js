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
                const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/players');
                const jsonObject = JSON.parse(response.data.body)
                
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

    const onClick = (user) => {
        navigate(`/cbb${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
    }

    const renderTable = () => {
        return <CustomTable search={true} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData.length == 0} pagination={true} range={15} header={header} data={teamData} onClick={(user) => onClick(user)}/>;
    };

    const header = {
        "position": "Position",
        "full_name": "Name",
        "mysportfeeds_abbreviation": "Team",
        "pts_per_game": "PTS",
        "reb_per_game": "REB",
        "ast_per_game": "AST",
        "stl_per_game": "STL",
        "blk_per_game": "BLK",
        "tov_per_game": "TOV",
        "fg_att": "FG ATT",
        "fg_made": "FG M",
        "ft_att": "FT ATT",
        "ft_made": "FT M",
        "off_reb": "OFF REB",
        "def_reb": "DEF REB",
        "plus_minus_per_game": "+/-",
        "games_played": "GAMES"
    }
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
            <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000" }} >Players</button>
            </div>
            {renderTable()}
        </div>
        </div>    
    );

}

export default Players;
