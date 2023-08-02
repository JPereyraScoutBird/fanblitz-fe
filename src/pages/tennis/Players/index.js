import CustomTable from "../../../component/Table";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import { getDate, getDate2, getTodayItems } from "../../../utils";

function PlayersTennis() {
    const [teamData, setTeamData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/tennis/stats/players');
                const jsonObject = JSON.parse(response.data.body)
                const response_formated = jsonObject.length ? jsonObject.map(x => ({...x, "birth_date": getDate(x['birth_date'])})) : []
                setTeamData(response_formated);
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2();
    }, []);


    const onClick = (user) => {
        navigate(`/tennis${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
    }

    const renderTable = () => {
        return <CustomTable loading={teamData.length == 0} pagination={true} range={15} header={headerPlayers} data={teamData} onClick={(user) => onClick(user)}/>;
    };

    const headerPlayers = {
        "name": "Name",
        // "birth_date": "Birth Date",
        "age": "Age",
        // "logo": "logo",
        "type": "type",
        "rank": "rank",
        "titles": "titles",
        "matches_won": "matches won",
        "matches_lost": "matches lost",
        "hard_won": "hard won",
        "hard_lost": "hard lost",
        "clay_won": "clay won",
        "clay_lost": "clay lost",
        "grass_won": "grass won",
        "grass_lost": "grass lost"
    }
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>Player Stats</h2>
            <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
            </div>
            {renderTable()}
        </div>
        </div>    
    );

}

export default PlayersTennis;
