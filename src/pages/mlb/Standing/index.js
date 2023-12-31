import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomTable from '../../../component/Table';
import constant from './constant'
import PATH_LIST from "../../../routes/constant";
import { useNavigate } from "react-router-dom";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl } from "reactstrap";
import Select from 'react-select';
import './style.css';

function Standing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState("Team");
  const [showTableOptions, setShowTableOptions] = useState("Position");
  const [teamData, setTeamData] = useState({});
  const [teamDataPosition, setTeamDataPosition] = useState({});
  const [playerData, setPlayerData] = useState([]);
  const [rankingSeason, setRankingSeason] = useState([{value: "", label: ""}]);
  const [rankingLeague, setRankingLeague] = useState([{value: "", label: ""}]);
  const [rankingTeamLeague, setRankingTeamLeague] = useState([{value: "League", label: "League"}, {value: "Division", label: "Division"}, {value: "MLB", label: "MLB"}]);
  const [rankingDivision, setRankingDivision] = useState([{value: "", label: ""}]);
  const [rankingPosition, setRankingPosition] = useState([{value: "", label: ""}]);
  const [rankingTeam, setRankingTeam] = useState([{value: "", label: ""}]);

  const [seasonValue, setSeasonValue] = useState(null);
  const [leagueValue, setLeagueValue] = useState(null);
  const [teamLeagueValue, setTeamLeagueValue] = useState(null);
  const [divisionValue, setDivisionValue] = useState(null);
  const [positionValue, setPositionValue] = useState(null);
  const [teamValue, setTeamValue] = useState(null);

  const fetchData = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/mlb/dev/stats/rankingdata',
        );
        const jsonObject = JSON.parse(response.data.body)
        setRankingSeason(jsonObject.season.map(x => ({ value: x, label: x })))
        setRankingLeague(jsonObject.league.map(x => ({ value: x, label: x })))
        setRankingDivision(jsonObject.division.map(x => ({ value: x, label: x })))
        setRankingPosition(jsonObject.position.map(x => ({ value: x, label: x })))
        setRankingTeam(jsonObject.team.map(x => ({ value: x, label: x })))
        
      } catch (error) {
        console.error('Error getting data:', error);
      }
  };

  const fetchDataPlayer = async (tableOptions=null) => {
    try {
      let season = seasonValue == null? "": seasonValue.value
      let league = leagueValue == null? "": leagueValue.value
      let division = divisionValue == null? "": divisionValue.value
      let position = positionValue == null? "": positionValue.value
      let team = teamValue == null? "": teamValue.value
      let option = tableOptions == null? showTableOptions: tableOptions
      const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/mlb/dev/stats/players/ranking?season=${season}&position=${position}&league=${league}&division=${division}&team_id=${team}&option=${option}`,
      );
      console.log("URL PLAYER", `https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/mlb/dev/stats/players/ranking?season=${season}&position=${position}&league=${league}&division=${division}&team_id=${team}&option=${option}`)
      const jsonObject = JSON.parse(response.data.body)
      setPlayerData(jsonObject)
      console.log("player data", jsonObject)
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const fetchDataTeam = async (tableOptions=null) => {
    try {
      let season = seasonValue == null? "": seasonValue.value
      let teamLeague = teamLeagueValue == null? "": teamLeagueValue.value
      let option = tableOptions == null? showTableOptions: tableOptions
      const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/mlb/dev/stats/teams/ranking?season=${season}&filter=${teamLeague}&option=${option}`,
      );
      // console.log("URL TEAM", `https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/mlb/dev/stats/teams/ranking?season=${season}&filter=${teamLeague}&option=${option}`)
      let jsonObject = response.data.body
      let sortedKeys = Object.keys(jsonObject).sort();
      let i = 0;
      while (i < sortedKeys.length) {
        jsonObject[sortedKeys[i]] = JSON.parse(jsonObject[sortedKeys[i]])
        i++;
      }
      setTeamData(jsonObject)
      console.log("team data", jsonObject)
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataTeam();
  }, [], rankingTeam);

  // useEffect(() => {
  //   fetchDataPlayer();
  // }, [], teamData);

  const handleButtonTeam = () => {
    setShowTable("Team");
    fetchDataTeam();
  };

  const handleButtonPlayer = () => {
    setShowTable("Player");
    fetchDataPlayer()
  };

  const handleButtonPosition = () => {
    setShowTableOptions("Position");
    if (showTable === "Team") {
      fetchDataTeam("Position");
    }
    else if (showTable === "Player"){
      fetchDataPlayer("Position");
    }
  };

  const handleButtonAdvance = () => {
    setShowTableOptions("Advance");
    if (showTable === "Team") {
      fetchDataTeam("Advance");
    }
    else if (showTable === "Player"){
      fetchDataPlayer("Advance");
    }
  };

  const onClickPlayer = (user) => {
    navigate(`/mlb${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
  }

  const onClickTeam = (user) => {
    navigate(`/mlb${PATH_LIST.TEAM_DETAIL}/${user.team_id}`);
  }

  const handleFilter = () => {
    if (showTable === "Team") {
      fetchDataTeam();
    }
    else if (showTable === "Player"){
      fetchDataPlayer();
    }
  };

  const handleClear = () => {
    setSeasonValue(null)
    setLeagueValue(null)
    setTeamLeagueValue(null)
    setDivisionValue(null)
    setPositionValue(null)
    setTeamValue(null)
  };

  const renderTable = () => {
    if (showTable === "Team") {
      let sortedKeys = Object.keys(teamData).sort();
      if (showTableOptions === "Advance"){
        return sortedKeys.map((name, index) => (
          <div> 
          <p>{name}</p>
          <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData[name].length == 0} pagination={true} range={30} header={constant.headerTeamNumber} data={teamData[name]} onClick={(user) => onClickPlayer(user)}/>
          </div>
        ))  
      }
      return sortedKeys.map((name, index) => (
        <div> 
        <p>{name}</p>
        <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData[name].length == 0} pagination={true} range={30} header={constant.headerTeam} data={teamData[name]} onClick={(user) => onClickPlayer(user)}/>
        </div>
      ))

    } else if (showTable === "Player") {
      let position = positionValue == null? "": positionValue.value
      if (showTableOptions === "Advance"){
        if (position === "P"){
          return <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerData.length == 0} pagination={true} range={15} header={constant.headerPlayerPitcherAdvance} data={playerData} onClick={(user) => onClickPlayer(user)}/>;
        }
        return <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerData.length == 0} pagination={true} range={15} header={constant.headerPlayerAdvance} data={playerData} onClick={(user) => onClickPlayer(user)}/>;  
      }
      
      if (position === "P"){
        return <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerData.length == 0} pagination={true} range={15} header={constant.headerPlayerPitcher} data={playerData} onClick={(user) => onClickPlayer(user)}/>;
      }
      return <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerData.length == 0} pagination={true} range={15} header={constant.headerPlayer} data={playerData} onClick={(user) => onClickPlayer(user)}/>;
    }
    return null;
  };

  const renderRankingOptions = () => {
    if (showTable === "Player") {
      return (
      <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
        <br></br>
        <button className="button" style={{fontWeight: `${showTableOptions == "Position" ? "bold" : "normal"}`}} onClick={handleButtonPosition} >Positions</button>
        <button className="button" style={{fontWeight: `${showTableOptions == "Advance" ? "bold" : "normal"}`}} onClick={handleButtonAdvance}>Advance</button>
      </div>
      )
    } 
    else if (showTable === "Team") {
      return (
      <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
        <br></br>
        <button className="button" style={{fontWeight: `${showTableOptions == "Position" ? "bold" : "normal"}`}} onClick={handleButtonPosition} >Positions</button>
        <button className="button" style={{fontWeight: `${showTableOptions == "Advance" ? "bold" : "normal"}`}} onClick={handleButtonAdvance}>Advance</button>
      </div>
      )
    } 
    return null;
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
          {showTable == "Team"? (
          <Select
            className="dropdown"
            options={rankingTeamLeague}
            placeholder="League"
            value={teamLeagueValue}
            onChange={setTeamLeagueValue}
          />) : null}
          {showTable == "Player"? (
          <Select
            className="dropdown"
            options={rankingLeague}
            placeholder="League"
            value={leagueValue}
            onChange={setLeagueValue}
          />) : null}
          {showTable == "Player"? (
          <Select
            className="dropdown"
            options={rankingDivision}
            placeholder="Division"
            value={divisionValue}
            onChange={setDivisionValue}
          />) : null}
          {showTable == "Player"? (
          <Select
            className="dropdown"
            options={rankingPosition}
            placeholder="Position"
            value={positionValue}
            onChange={setPositionValue}
          />) : null}
          {showTable == "Player"? (
          <Select
            className="dropdown"
            options={rankingTeam}
            placeholder="Team"
            value={teamValue}
            onChange={setTeamValue}
          />) : null}
        </div>
        <div className="button-container">
          <button onClick={handleFilter} className="button">Apply</button>
          <button onClick={handleClear} className="button">Clear</button>
        </div>
      </div>
    );
    
  };

  return (
    <>
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>MLB Standing</h2>
          <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
          <button className="button" style={{fontWeight: `${showTable == "Team" ? "bold" : "normal"}`}} onClick={handleButtonTeam} >Team</button>
          <button className="button" style={{fontWeight: `${showTable == "Player" ? "bold" : "normal"}`}} onClick={handleButtonPlayer}>Player</button>
          </div>
          {renderOptions()}
          <br></br>
          {renderRankingOptions()}
          {renderTable()}
        </div>
      </Container>    
    </>    
  );

  
}

export default Standing;
