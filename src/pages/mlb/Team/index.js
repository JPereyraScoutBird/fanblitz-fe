import CustomTable from "../../../component/Table";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import constant from './constants';


function Team() {
  const [teamData, setTeamData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/teams');
        const jsonObject = JSON.parse(response.data.body)
        setTeamData(jsonObject);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchData2();
  }, []);

  const onClick = (user) => {
    console.log("klok", user)
    navigate(`/mlb${PATH_LIST.TEAM_DETAIL}/${user.team_id}`);
  }
  
  const renderTable = () => {
    return <CustomTable header={constant.header} noRange={true} range={30} row={30} data={teamData} loading={teamData.length == 0} onClick={(user) => onClick(user)}/>;
  };


  return (
    <div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Team Stats</h2>
        {renderTable()}
      </div>
    </div>    
  );

}

export default Team;
