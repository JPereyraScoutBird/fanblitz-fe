import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomTable from '../../../component/Table';
import constant from './constant'
import PATH_LIST from "../../../routes/constant";
import { useNavigate } from "react-router-dom";
import { Button, Carousel, Container, CarouselItem, Row, UncontrolledCarousel, CarouselIndicators, CarouselControl } from "reactstrap";
import Select from 'react-select';
import IMAGE from '../../../img';
import './style.css';

function Standing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState("Team");
  const [showTableOptions, setShowTableOptions] = useState("Position");
  const [teamData, setTeamData] = useState({});
  const [teamDataStats, setTeamDataStats] = useState({});
  const [playerDataStats, setPlayerDataStats] = useState({});
  const [teamDataPosition, setTeamDataPosition] = useState({});
  const [playerData, setPlayerData] = useState([]);
  const [rankingSeason, setRankingSeason] = useState([{value: "", label: ""}]);
  const [rankingLeague, setRankingLeague] = useState([{value: "", label: ""}]);
  const [rankingTeamLeague, setRankingTeamLeague] = useState([{value: "League", label: "League"}, {value: "NCAA", label: "NCAA"}, {value: "Associated press", label: "Associated press"}]);
  const [rankingDivision, setRankingDivision] = useState([{value: "", label: ""}]);
  const [rankingPosition, setRankingPosition] = useState([{value: "", label: ""}]);
  const [rankingTeam, setRankingTeam] = useState([{value: "", label: ""}]);

  const [seasonValue, setSeasonValue] = useState({ value: "2023-2024-regular", label: "2023-2024-regular" });
  const [leagueValue, setLeagueValue] = useState(null);
  const [teamLeagueValue, setTeamLeagueValue] = useState(null);
  const [divisionValue, setDivisionValue] = useState(null);
  const [positionValue, setPositionValue] = useState(null);
  const [teamValue, setTeamValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
      try {
        const response = await axios.get('https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/rankingdata',
        );
        const jsonObject = JSON.parse(response.data.body)
        console.log("options", jsonObject)
        let season = jsonObject.season.map(x => ({ value: x, label: x }))
        season.push({ value: "2023-2024-regular", label: "2023-2024-regular" })
        setRankingSeason(jsonObject.season.map(x => ({ value: x, label: x })))
        setRankingLeague(jsonObject.league.map(x => ({ value: x, label: x })))
        setRankingPosition(jsonObject.position.map(x => ({ value: x, label: x })))
        setRankingTeam(jsonObject.team.map(x => ({ value: x, label: x })))
        setIsLoading(true);
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
      const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/players/ranking?season=${season}&position=${position}&league=${league}&division=${division}&team_id=${team}&option=${option}`,
      );
      // console.log("URL PLAYER", `https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/players/ranking?season=${season}&position=${position}&league=${league}&division=${division}&team_id=${team}&option=${option}`)
      if (option == "Stats") {
        let jsonObject = response.data.body
        console.log("player data1", jsonObject)
        let sortedKeys = Object.keys(jsonObject).sort();
        let sortedKeysStats = []
        let i = 0;
        let j = 0;
        while (i < sortedKeys.length) {
          j = 0;
          if (option == "Stats") {
            sortedKeysStats = Object.keys(jsonObject[sortedKeys[i]]).sort()
            while (j < sortedKeysStats.length) {
              jsonObject[sortedKeys[i]][sortedKeysStats[j]] = JSON.parse(jsonObject[sortedKeys[i]][sortedKeysStats[j]])
              j++;
            }
          }
          i++;
        }
        setPlayerDataStats(jsonObject)
        // console.log("player data2", jsonObject)
      }
      else{
        const jsonObject = JSON.parse(response.data.body)
        setPlayerData(jsonObject)
        // console.log("player data", jsonObject)
      }
      setIsLoading(true);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const fetchDataTeam = async (tableOptions=null) => {
    try {
      let season = seasonValue == null? "": seasonValue.value
      let teamLeague = teamLeagueValue == null? "": teamLeagueValue.value
      let league = leagueValue == null? "": leagueValue.value
      let option = tableOptions == null? showTableOptions: tableOptions
      const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/teams/ranking?season=${season}&filter=${teamLeague}&league=${league}&option=${option}`,
      );
      // console.log("URL TEAM", `https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/teams/ranking?season=${season}&filter=${teamLeague}&league=${league}&option=${option}`)
      let jsonObject = response.data.body
      // console.log("team data1", jsonObject)
      let sortedKeys = Object.keys(jsonObject).sort();
      let sortedKeysStats = []
      let i = 0;
      let j = 0;
      while (i < sortedKeys.length) {
        j = 0;
        if (option == "Stats") {
          sortedKeysStats = Object.keys(jsonObject[sortedKeys[i]]).sort()
          while (j < sortedKeysStats.length) {
            jsonObject[sortedKeys[i]][sortedKeysStats[j]] = JSON.parse(jsonObject[sortedKeys[i]][sortedKeysStats[j]])
            j++;
          }

        } else {
          jsonObject[sortedKeys[i]] = JSON.parse(jsonObject[sortedKeys[i]])
          if (sortedKeys[i] == "Associated press") {
            jsonObject[sortedKeys[i]].sort((a, b) => {
              if (a.pos_top_25 === null) return 1;
              if (b.pos_top_25 === null) return -1;
              return a.pos_top_25 - b.pos_top_25;
            });
          }
        }
        i++;
      }
      if (option == "Stats") {
        setTeamDataStats(jsonObject)
      }
      else{
        setTeamData(jsonObject)
      }
      setIsLoading(true);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
    fetchDataTeam();
  }, [], rankingTeam);

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

  const handleButtonStats = () => {
    setShowTableOptions("Stats");
    if (showTable === "Team") {
      fetchDataTeam("Stats");
    }
    else if (showTable === "Player"){
      fetchDataPlayer("Stats");
    }
  };

  const onClickPlayer = (user) => {
    navigate(`/cbb${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
  }

  const onClickTeam = (user) => {
    navigate(`/cbb${PATH_LIST.TEAM_DETAIL}/${user.team_id}`);
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
          <h4>{name}</h4>
          <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData[name].length == 0} pagination={true} range={30} header={constant.headerTeamNumber} data={teamData[name]} onClick={(user) => onClickTeam(user)}/>
          </div>
        ))  
      }
      if (showTableOptions === "Stats" && Object.keys(teamDataStats).length > 0){
        let sortedKeysStats = Object.keys(teamDataStats).sort();
        return sortedKeysStats.map((name, index) => (
          <div> 
          <h4>{name}</h4>
          <h5>Offensive Leaders</h5>
          <h7>Points</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamDataStats[name]['top_10_pts'].length == 0} pagination={true} range={30} header={constant.headerTeamPTS} data={teamDataStats[name]['top_10_pts']} onClick={(user) => onClickTeam(user)}/>
          <br></br>
          <h7>FIELD GOAL %</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamDataStats[name]['top_10_fg'].length == 0} pagination={true} range={30} header={constant.headerTeamFG} data={teamDataStats[name]['top_10_fg']} onClick={(user) => onClickTeam(user)}/>
          <br></br>
          <h7>POINTS DIFFERENTIAL</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamDataStats[name]['top_10_plus_minus'].length == 0} pagination={true} range={30} header={constant.headerTeamDiff} data={teamDataStats[name]['top_10_plus_minus']} onClick={(user) => onClickTeam(user)}/>
          <br></br>
          <br></br>
          <h5>Defensive Leaders</h5>
          <h7>POINTS ALLOWED</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamDataStats[name]['top_10_off_pts'].length == 0} pagination={true} range={30} header={constant.headerTeamPTSA} data={teamDataStats[name]['top_10_off_pts']} onClick={(user) => onClickTeam(user)}/>
          <br></br>
          <h7>REBOUNDS</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamDataStats[name]['top_10_reb'].length == 0} pagination={true} range={30} header={constant.headerTeamReb} data={teamDataStats[name]['top_10_reb']} onClick={(user) => onClickTeam(user)}/>
          <br></br>
          <h7>BLOCKS</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamDataStats[name]['top_10_blk'].length == 0} pagination={true} range={30} header={constant.headerTeamBlk} data={teamDataStats[name]['top_10_blk']} onClick={(user) => onClickTeam(user)}/>
          <br></br>

          </div>
        ))  
      }
      return sortedKeys.map((name, index) => (
        <div> 
        <h4>{name}</h4>
        <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={teamData[name].length == 0} pagination={true} range={30} header={constant.headerTeam} data={teamData[name]} onClick={(user) => onClickTeam(user)}/>
        </div>
      ))

    } else if (showTable === "Player") {
      if (showTableOptions === "Advance"){
        return <CustomTable search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerData.length == 0} pagination={true} range={15} header={constant.headerPlayerAdvance} data={playerData} onClick={(user) => onClickPlayer(user)}/>;  
      }
      if (showTableOptions === "Stats" && Object.keys(playerDataStats).length > 0){
        let sortedKeysStats = Object.keys(playerDataStats).sort();
        return sortedKeysStats.map((name, index) => (
          <div> 
          <h4>{name}</h4>
          <h5>Offensive Leaders</h5>
          <h7>Points</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerDataStats[name]['top_10_pts'].length == 0} pagination={true} range={10} header={constant.headerTeamPTS} data={playerDataStats[name]['top_10_pts']} onClick={(user) => onClickPlayer(user)}/>
          <br></br>
          <h7>ASSISTS</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerDataStats[name]['top_10_ast'].length == 0} pagination={true} range={10} header={constant.headerTeamAst} data={playerDataStats[name]['top_10_ast']} onClick={(user) => onClickPlayer(user)}/>
          <br></br>
          <h7>3-POINTERS MADE</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerDataStats[name]['top_10_3pm'].length == 0} pagination={true} range={10} header={constant.headerTeam3PTSM} data={playerDataStats[name]['top_10_3pm']} onClick={(user) => onClickPlayer(user)}/>
          <br></br>
          <br></br>
          <h5>Defensive Leaders</h5>
          <h7>STEALS</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerDataStats[name]['top_10_stl'].length == 0} pagination={true} range={10} header={constant.headerTeamSTL} data={playerDataStats[name]['top_10_stl']} onClick={(user) => onClickPlayer(user)}/>
          <br></br>
          <h7>REBOUNDS</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerDataStats[name]['top_10_reb'].length == 0} pagination={true} range={10} header={constant.headerTeamReb} data={playerDataStats[name]['top_10_reb']} onClick={(user) => onClickPlayer(user)}/>
          <br></br>
          <h7>BLOCKS</h7>
          <CustomTable playeImage={true} search={false} search_placeholder="Search player name or team on table" search_keys={['full_name']} loading={playerDataStats[name]['top_10_blk'].length == 0} pagination={true} range={10} header={constant.headerTeamBlk} data={playerDataStats[name]['top_10_blk']} onClick={(user) => onClickPlayer(user)}/>
          <br></br>

          </div>
        ))  
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
        <button className="button" style={{fontWeight: `${showTableOptions == "Stats" ? "bold" : "normal"}`}} onClick={handleButtonStats}>Stats</button>
      </div>
      )
    } 
    else if (showTable === "Team") {
      return (
      <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
        <br></br>
        <button className="button" style={{fontWeight: `${showTableOptions == "Position" ? "bold" : "normal"}`}} onClick={handleButtonPosition} >Positions</button>
        <button className="button" style={{fontWeight: `${showTableOptions == "Advance" ? "bold" : "normal"}`}} onClick={handleButtonAdvance}>Advance</button>
        <button className="button" style={{fontWeight: `${showTableOptions == "Stats" ? "bold" : "normal"}`}} onClick={handleButtonStats}>Stats</button>
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
          {showTable == "Team" && showTableOptions != "Stats" ? (
          <Select
            className="dropdown"
            options={rankingTeamLeague}
            placeholder="League"
            value={teamLeagueValue}
            onChange={setTeamLeagueValue}
          />) : null}
          {showTable == "Player" || showTableOptions == "Stats"? (
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

  const getLoading = () => {
    return  (
    <div className = "loading-container" >
      <img src = {IMAGE["loading"]} alt = "loading" className = "loading-image" />
    </div>
    )    
  }

  return (
    <>
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>NCAA Men Basketball Standing</h2>
          <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
          <button className="button" style={{fontWeight: `${showTable == "Team" ? "bold" : "normal"}`}} onClick={handleButtonTeam} >Team</button>
          <button className="button" style={{fontWeight: `${showTable == "Player" ? "bold" : "normal"}`}} onClick={handleButtonPlayer}>Player</button>
          </div>
          {renderOptions()}
          <br></br>
          {renderRankingOptions()}
          {/* {renderTable()} */}
          {isLoading == false ? getLoading() : renderTable()}
        </div>
      </Container>    
    </>    
  );

  
}

export default Standing;
