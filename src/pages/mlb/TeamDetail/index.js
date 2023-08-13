import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Col, Container, Row } from 'reactstrap';
import { getDate2, getDateString, getTime } from '../../../utils';
import Menu from '../../../container/Menu3';
import Footer from '../../../container/Footer';
import './style.css'
import SubMenu from '../../../container/Menu2';
import { getDate } from "../../../utils";
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import CardProfileComponent from '../../../component/CardProfile';
import CardTeamComponent from '../../../component/CardTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-regular-svg-icons";
import Image from '../../../img';

export async function loader({ params }) {
    return params;
}

const getNewsSpecificPlayer = (player_name) => (
  `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) +NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
)

const renderTableNextGames = (position, data, backgroundColor = "#000", color='#fff') => {
    if(data && data.games.length > 0) {
      return (
        <div className='w-100 d-flex flex-column align-items-center'>
          <CardTeamComponent 
            homeImg={constant.team_detail[data.games[0]['home_team']].img}
            awayImg={constant.team_detail[data.games[0]['away_team']].img}
            home={data.games[0]['home_team']} 
            away={data.games[0]['away_team']} 
            footer={getTime(data.games[0].date_et)} 
            home_score={data.games[0]['home_score']}
            away_score={data.games[0]['away_score']}
            link={`/mlb${PATH_LIST.FORECAST_DETAIL}/${data.games[0]['home_team']}-${data.games[0]['away_team']}/${getDate2(data.games[0].date_et)}`}
          />
        </div>
      )
    }
    return null;
};

const renderTablePastGames =  (position, data, backgroundColor = "#000", color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerLastGames} data={data.last_games.map(x => ({...x, date_et: getDateString(x['date_et'])}))}/>;
}

const renderTablePlayers = (position, data, backgroundColor = "#000", color='#fff') => {
  return <CustomTable playeImage={true} backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPlayer} data={data.players}/>;
};

const renderTableRanking = (position, data, backgroundColor = "#000", color='#fff') => (
  <div className='d-flex ranking-summary'>
  <div>
    <h4>Hitter Stats</h4>
    <div className='d-flex'>
    <p><strong>H</strong> {data.ranking.hitter[0]['hits']}</p> 
    <p><strong>2B:</strong> {data.ranking.hitter[0]["second_based_hits"]}</p>
    <p><strong>3B:</strong> {data.ranking.hitter[0]["third_base_hits"]}</p>
    <p><strong>HR:</strong> {data.ranking.hitter[0]["homeruns"]}</p>
   </div>
   <div className='d-flex'>
    <p><strong>R:</strong> {data.ranking.hitter[0]["runs"]}</p>
    <p><strong>RBI:</strong> {data.ranking.hitter[0]["runs_batted_in"]}</p>
    <p><strong>BB:</strong> {data.ranking.hitter[0]["batter_walks"]}</p>
    <p><strong>SB:</strong> {data.ranking.hitter[0]["stolen_bases"]}</p>
    </div>
    <div className='d-flex'>
    <p><strong>SO:</strong> {data.ranking.hitter[0]["batter_strike_outs"]}</p>
    <p><strong>AVG: </strong> {data.ranking.hitter[0]["batting_average"]}</p>
    <p><strong>OBP: </strong> {data.ranking.hitter[0]["batter_on_base_percentage"]}</p>
    <p><strong>SLG:</strong> {data.ranking.hitter[0]["batter_slugging_percentage"]}</p>
    <p><strong>OPS:</strong> {data.ranking.hitter[0]["ops"]}</p>
    </div>
  </div>
  <div style={{marginLeft: "4rem"}}>
    <h4>Pitching Stats</h4>
    <div className='d-flex'>
      <p><strong>W:</strong> {data.ranking.pitcher[0]["wins"]}</p>
      <p><strong>ERA:</strong> {data.ranking.pitcher[0]["earned_run_agerage"]}</p>
      <p><strong>AVG:</strong> {data.ranking.pitcher[0]["pitching_average"]}</p>
      <p><strong>SO:</strong> {data.ranking.pitcher[0]["pitcher_strikeouts"]}</p>
      </div>
      <div className='d-flex'>
      <p><strong>HR: </strong> {data.ranking.pitcher[0]["homeruns_allowed"]}</p>
      <p><strong>R:</strong> {data.ranking.pitcher[0]["runs_allowed"]}</p>
      <p><strong>ER:</strong> {data.ranking.pitcher[0]["earned_runs_allowed"]}</p>
      </div>
    </div>
  </div>
 );

const renderTableStats = (position, data, backgroundColor = "#000", color='#fff') => {
  if (position=='hitters') {
    return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHittingStats} data={data.stats.hitter}/>;
  }
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitchingStats} data={data.stats.pitcher}/>;

};

const renderTableSplit = (position, data, backgroundColor="#000", color='#fff') => {
  if (position=='hitters'){
  return <CustomTable backgroundColor={backgroundColor} color={color}  noRange={true}  loading={data.length == 0} header={constant.headerHittingSplit} data={data.split.hitter}/>;
  } 
  return <CustomTable backgroundColor={backgroundColor} color={color}  noRange={true} loading={data.length == 0} header={constant.headerPitchingSplit} data={data.split.pitcher}/>;

};

const renderTable3Games = (position, data, backgroundColor="#000", color='#fff') => {
  if (position=='hitters'){
    return <CustomTable backgroundColor={backgroundColor} color={color}  noRange={true} loading={data.length == 0} header={constant.headerHitting3Games} data={data.last3Games.hitter}/>;
  }
  return <CustomTable backgroundColor={backgroundColor} color={color}  noRange={true} loading={data.length == 0} header={constant.headerPitching3Games} data={data.last3Games.pitcher}/>;

};

function TeamDetail(props) {
    const {user, signOut} = props
    const location = useLocation();
    const { teamId } = useLoaderData();
    const [teamDetail, setteamDetail] = useState(undefined)
    const [newsData, setNewsData] = useState([])
    const [bio, setBio] = useState({})
    const [forecast, setForecastData] = useState({})
    const [showTable, setShowTable] = useState("hitters");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/teams?id=${teamId}`);
                const jsonObject = JSON.parse(response.data.body)
                jsonObject.games = jsonObject.games.length ? jsonObject.games.map(x => ({...x, "date_et": getDate(x['date_et'])})) : []

                setteamDetail(jsonObject)
                
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2()
    }, []);

    const handleButtonHitting = () => {
      setShowTable("hitters");
    };

    const handleButtonPitching = () => {
      setShowTable("pitchers");
    };

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=baseball&subject=${teamDetail['odds_api']}`);
            setNewsData(response.data.content)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [teamDetail])

    const onClick = (user) => {
      navigate(`/mlb${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
    }

    const renderFooter = (article) => (
      <div className="">
        <div className="d-flex justify-content-center align-items-center">
        <span>{getTime(article.date_z)}</span>
        <div className="border-dash"></div>
        <span><FontAwesomeIcon className="icon" icon={faComments}  color="#ccc" />Analisis</span></div>
      </div>
    )

    const renderTableLeaders = (position, data, backgroundColor = "#000", color='#fff') => {
      // if (data.leaders) {
        if(position == 'hitters') {
          return (
            <Row className='d-flex justify-content-between'>
            {data.leaders.hitter.map(x => (
            <CardProfileComponent link={`/mlb${PATH_LIST.PLAYER_DETAIL}/${x.player_id}`} title={`${x['first_name'][0]}. ${x['last_name']}`} className="col-2" body={<div className="w-100 d-flex justify-content-around"><span>{x['position']}.</span> <span>{x.feature}: <strong>{x.value}</strong></span></div>} imageSrc={x['image'] || Image.PROFILE}/>
            ))}
          </Row>
          )
        }
        else {
          return (
            <Row className='d-flex justify-content-between'>
            {data.leaders.pitcher.map(x => (
              <CardProfileComponent link={`/mlb${PATH_LIST.PLAYER_DETAIL}/${x.player_id}`} title={`${x['first_name'][0]}. ${x['last_name']}`} className="col-2" body={<div className="w-100 d-flex justify-content-around"><span>{x['position']}.</span> <span>{x.feature}: <strong>{x.value}</strong></span></div>} imageSrc={x['image'] ||  Image.PROFILE}/>
            ))}
          </Row>
          )
        }
      // }
    };

    const renderPage = () => {
      return (
        <div style={{}}>
          {/* <SubMenu backgroundColor={constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img} /> */}
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex">
                  <div style={{ border: `5px solid ${constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img src={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img}/>
                  </div>
                  <div className='w-100'>
                      <h2>{teamDetail['odds_api']}</h2>
                      <div className='d-flex justify-content-between'>
                        <div>
                          {renderTableRanking(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
                        </div>
                        <div>
                          {renderTableNextGames(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
                        </div>
                      </div>
                      
                  </div>
              </div>
              <br></br>
          </div>
          <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
            <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000", fontWeight: `${showTable == "hitters" ? "bold" : "normal"}`}} onClick={handleButtonHitting} >Hitting</button>
            <button style={{ border: "none", background: "transparent", padding: "0", color: "#000", fontWeight: `${showTable == "pitchers" ? "bold" : "normal"}`}} onClick={handleButtonPitching}>Pitching</button>
          </div>
          {/* <section id="ranking"> */}
            {/* <h3>Ranking</h3> */}
            {/* {renderTableRanking(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])} */}
          {/* </section> */}
          <section id="leaders">
            <h3>Leaders</h3>
            {renderTableLeaders(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="lastGames">
            <h3>Last 3 Games</h3>
            <br></br>
            {renderTable3Games(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="splits">
            <h3>Splits</h3>
            {renderTableSplit(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="stats">
            <h3>Stats</h3>
            {renderTableStats(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          {/* <section id="games">
            <h3>Next games</h3>
            {renderTableNextGames(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section> */}
          <section id="players">
            <h3>Players</h3>
            {renderTablePlayers(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="pastGames">
            <h3>Past Predictions</h3>
            {renderTablePastGames(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          {
            newsData.length ?
            <section id="news">
              <h3>News</h3>
              <Row>
                {
                  newsData.map(article => (
                      <CardComponent 
                        style="card-news"
                        className={'col-12 col-md-3'}
                        title={article.title}
                        imageSrc={article.urlToImage}
                        linkTitle={article.url}
                        footer={getDateString(article.publishedAt)}
                      />
                  ))
                }
            </Row>
            </section>
            : null
          } 
        </div>    
      );
    }
    
    console.log(teamDetail)

    return (
      <div id="template" className="player_detail_container">
      {/* <div id="template"> */}
        <Menu sport_default={"mlb"} user={user} signOut={signOut}/>
        { teamDetail ? <SubMenu home={`/mlb${PATH_LIST.TEAM_DETAIL}/:${teamDetail.id}}`} links={constant.links} wins={teamDetail.wins} losses={teamDetail.losses} backgroundColor={"#041e42" || constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img} /> : null}
        <Container className="template">
          <div id="detail">
            {teamDetail ? renderPage() : <></> }
          </div>
        </Container>
        <Footer />
      </div>
    );
}

export default TeamDetail;
