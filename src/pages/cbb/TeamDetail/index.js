import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Col, Container, Modal, Row } from 'reactstrap';
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
import Chatbot from '../../../container/ChatBot';

export async function loader({ params }) {
    return params;
}

const getNewsSpecificPlayer = (player_name) => (
  `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) +NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
)

const renderTableNextGames = (data, backgroundColor = "#000", color='#fff') => {
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
            link={`/cbb${PATH_LIST.FORECAST_DETAIL}/${data.games[0]['home_team']}-${data.games[0]['away_team']}/${getDate2(data.games[0].date_z)}`}
          />
        </div>
      )
    }
    return null;
};

const renderTablePastGames =  (data, backgroundColor = "#000", color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerLastGames} data={data.last_games.map(x => ({...x, date_et: getDateString(x['date_et'])}))}/>;
}

const renderTablePlayers = (data, backgroundColor = "#000", color='#fff') => {
  return <CustomTable playeImage={true} backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPlayer} data={data.players}/>;
};

const renderTableRanking = (data, backgroundColor = "#000", color='#fff') => (
  <div className='d-flex flex-md-row flex-column ranking-summary'>
  <div className='team_hitter_stats'>
    <h4>Player Stats</h4>
    <div className='d-flex'>
    <p><strong>PTS:</strong> {data.ranking.player[0]['pts']}</p> 
    <p><strong>REB:</strong> {data.ranking.player[0]["reb"]}</p>
    <p><strong>AST:</strong> {data.ranking.player[0]["ast"]}</p>
    <p><strong>STL:</strong> {data.ranking.player[0]["stl"]}</p>
   </div>
   <div className='d-flex'>
    <p><strong>TOV:</strong> {data.ranking.player[0]["tov"]}</p>
    <p><strong>FG ATT:</strong> {data.ranking.player[0]["fg_att"]}</p>
    <p><strong>FG MADE:</strong> {data.ranking.player[0]["fg_made"]}</p>
    <p><strong>FT ATT:</strong> {data.ranking.player[0]["ft_att"]}</p>
    </div>
    <div className='d-flex'>
    <p><strong>FT MADE:</strong> {data.ranking.player[0]["ft_made"]}</p>
    <p><strong>OFF REB: </strong> {data.ranking.player[0]["off_reb"]}</p>
    <p><strong>DEF REB: </strong> {data.ranking.player[0]["def_reb"]}</p>
    <p><strong>+/-:</strong> {data.ranking.player[0]["plus_minus"]}</p>
    </div>
  </div>
  </div>
 );

const renderTableStats = (data, backgroundColor = "#000", color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerStats} data={data.stats.player}/>;

};

const renderTableSplit = (data, backgroundColor="#000", color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color}  noRange={true} loading={data.length == 0} header={constant.headeSplit} data={data.split.player}/>;
};

const renderTable3Games = (data, backgroundColor="#000", color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color}  noRange={true} loading={data.length == 0} header={constant.header3Games} data={data.last3Games.player}/>;
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
    const [modal, setModal] = useState(true);
    const toggle2 = () => setModal(!modal);
    const [gptStyle, setGptStyle] = useState('')

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/teams?id=${teamId}`);
                const jsonObject = JSON.parse(response.data.body)
                jsonObject.games = jsonObject.games.length ? jsonObject.games.map(x => ({...x, "date_et": getDate(x['date_et'])})) : []
                setteamDetail(jsonObject)
                console.log("klok", jsonObject)
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2()
    }, []);

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=basketball&subject=${teamDetail['odds_api']}`);
            setNewsData(response.data.content)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [teamDetail])

    const onClick = (user) => {
      navigate(`/cbb${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
    }

    const renderFooter = (article) => (
      <div className="">
        <div className="d-flex justify-content-center align-items-center">
        <span>{getTime(article.date_z)}</span>
        <div className="border-dash"></div>
        <span><FontAwesomeIcon className="icon" icon={faComments}  color="#ccc" />Analysis</span></div>
      </div>
    )

    const renderTableLeaders = (data, backgroundColor = "#000", color='#fff') => {

      return (
        <Row className='d-flex justify-content-between'>
        {data.leaders.player.map(x => (
          <CardProfileComponent link={`/cbb${PATH_LIST.PLAYER_DETAIL}/${x.player_id}`} title={`${x['first_name'][0]}. ${x['last_name']}`} className="col-2" body={<div className="w-100 d-flex justify-content-around"><span>{x['position']}.</span> <span>{x.feature}: <strong>{x.value}</strong></span></div>} imageSrc={x['image'] ||  Image.PROFILE}/>
        ))}
      </Row>
      )
    };

    const renderPage = () => {
      return (
        <div style={{}}>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex">
                  <div style={{ border: `5px solid ${constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img src={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img}/>
                  </div>
                  <div className='w-100'>
                      <h2>{teamDetail['odds_api']}</h2>
                      <div className='d-flex justify-content-between'>
                        <div>
                          {renderTableRanking(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
                        </div>
                        <div>
                          {renderTableNextGames(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
                        </div>
                      </div>
                      
                  </div>
              </div>
              <br></br>
          </div>
          <section id="leaders">
            <h3>Leaders</h3>
            {renderTableLeaders(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="lastGames">
            <h3>Last 3 Games</h3>
            <br></br>
            {renderTable3Games(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="splits">
            <h3>Splits</h3>
            {renderTableSplit(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="stats">
            <h3>Stats</h3>
            {renderTableStats(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="players">
            <h3>Players</h3>
            {renderTablePlayers(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="pastGames">
            <h3>Past Predictions</h3>
            {renderTablePastGames(teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          {
            newsData && newsData.length ?
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
          <Modal isOpen={modal} toggle={toggle2}>
            <Chatbot player={teamDetail.odds_api} pre_prompt={`${teamDetail.odds_api}' baseball team history`} gptStyle={gptStyle}/>
          </Modal>
        </div>    
      );
    }
    
    console.log(teamDetail)

    return (
      <div id="template" className="player_detail_container">
      {/* <div id="template"> */}
        <Menu sport_default={"cbb"} user={user} signOut={signOut} onChange={(e) => setGptStyle(e)}/>
        { teamDetail ? <SubMenu home={`/cbb${PATH_LIST.TEAM_DETAIL}/:${teamDetail.id}}`} links={constant.links} wins={teamDetail.wins} losses={teamDetail.losses} backgroundColor={"#041e42" || constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img} /> : null}
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