import CustomTable from "../../../component/Table";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import constant from './constants';
import Select from 'react-select';
import './style.css';

function Team() {
  const [teamData, setTeamData] = useState([]);
  const [seasonValue, setSeasonValue] = useState({value: "2023-2024-regular", label: "2023-2024-regular"});
  const [selectSeason, setSelectSeason] = useState([{value: "", label: ""}]);
  const [rankingSeason, setRankingSeason] = useState([{value: "2023-2024-regular", label: "2023-2024-regular"}, {value: "2022-2023-regular", label: "2022-2023-regular"}]);
  const [currentSeason, setCurrentSeason] = useState({value: "2023-2024-regular", label: "2023-2024-regular"}); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/teams');
        const jsonObject = JSON.parse(response.data.body)
        // console.log("team", jsonObject)
        setTeamData(jsonObject);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchData2();
  }, []);

  const onClick = (user) => {
    navigate(`/cbb${PATH_LIST.TEAM_DETAIL}/${user.team_id}`);
  }
  
  const renderTable = () => {
    let season = seasonValue == null? "2023-2024-regular": seasonValue.value
    let data_filter = teamData.filter(x => x['season']==season)
    return <CustomTable search={true} search_placeholder="Search team on table" search_keys={['team']} header={constant.header} noRange={false} pagination={true} range={25} row={25} data={data_filter} loading={teamData.length == 0} onClick={(user) => onClick(user)}/>;
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

  return (
    <div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Team Stats</h2>
        {renderOptions()}
        <br></br>
        {renderTable()}
      </div>
    </div>    
  );

}

export default Team;
