import CustomTable from "../../../component/Table";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import SearchTable from "../../../component/SearchTable";
import Select from 'react-select';
import './style.css';

function Players() {
    const [teamData, setTeamData] = useState([]);
    const [pitcherData, setPitcherData] = useState([]);
    const [batterData, setBatterData] = useState([]);
    const [showTable, setShowTable] = useState("hitters");
    const [seasonValue, setSeasonValue] = useState({value: "2023-2024-regular", label: "2023-2024-regular"});
    const [selectSeason, setSelectSeason] = useState([{value: "", label: ""}]);
    const [rankingSeason, setRankingSeason] = useState([{value: "2023-2024-regular", label: "2023-2024-regular"}, {value: "2022-2023-regular", label: "2022-2023-regular"}]);
    const [currentSeason, setCurrentSeason] = useState({value: "2023-2024-regular", label: "2023-2024-regular"}); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/players');
                const jsonObject = JSON.parse(response.data.body)
                
                // setPitcherData(jsonObject.filter(x => x['position'] == 'P'))
                // setBatterData(jsonObject.filter(x => x['position'] != 'P'))
                setTeamData(jsonObject);
                // console.log("player stats data", jsonObject)
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
        let season = seasonValue == null? "2023-2024-regular": seasonValue.value
        let data_filter = teamData.filter(x => x['season']==season)
        // console.log("current season", season)
        // console.log("filtrado", data_filter)
        return <CustomTable search={true} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData.length == 0} pagination={true} range={15} header={header} data={data_filter} onClick={(user) => onClick(user)}/>;
    };

    const handleFilter = () => {
        setCurrentSeason(seasonValue)
    };

    const handleClear = () => {
        setSeasonValue(null)
    };

    const renderOptions = () => {
        return (
          <div>
              <div className="dropdown-container">
              <Select
                className="dropdown"
                options={rankingSeason}
                placeholder="Season"
                value={seasonValue}
                onChange={setSeasonValue}
              />
            </div>
            {/* <div className="button-container">
              <button onClick={handleFilter} className="button">Apply</button>
              <button onClick={handleClear} className="button">Clear</button>
            </div> */}
          </div>
        );
        
      };

    const header = {
        "position": "Pos.",
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
        "games_played": "G.",
        // "season": "Season"
    }
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
            <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000", fontWeight: "bold" }} >Players</button>
            </div>
            {renderOptions()}
            <br></br>
            {renderTable()}
        </div>
        </div>    
    );

}

export default Players;
