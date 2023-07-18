import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../component/Table';
import CardComponent from '../../component/Card';
import { Col, Container, Row } from 'reactstrap';
import { getDateString } from '../../utils';
import Menu from '../../container/Menu';
import Footer from '../../container/Footer';
import './style.css'
import SubMenu from '../../container/Menu2';
import { getDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../routes/constant";
// import { Line } from 'react-chartjs-2';
// import Line from 'react-chart-js-2';

export async function loader({ params }) {
    return params;
}

const getNewsSpecificPlayer = (player_name) => (
  `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) (yankees OR baltimore OR boston OR cleveland OR "white sox" OR twins OR detroit OR "kansas city" OR houston OR seattle OR angels OR ranger OR oakland OR atlanta OR mets OR phildelphia OR miami OR nationals OR louis OR milwaukee OR cubs OR reds OR pittsburgh OR dodgers OR "san diego" OR giants OR diamondbacks OR colorado)+NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
)

const renderTableNextGames = (position, data, backgroundColor = undefined, color='#000') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerNextGames} data={data.games}/>;
};

const renderTablePlayers = (position, data, backgroundColor = undefined, color='#000') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPlayer} data={data.players}/>;
};

const renderTableRanking = (position, data, backgroundColor = undefined, color='#000') => {
  if (position=='hitters') {
    return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHittingRanking} data={data.ranking.hitter}/>;
  }
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitchingRanking} data={data.ranking.pitcher}/>;
};

const renderTableStats = (position, data, backgroundColor = undefined, color='#000') => {
  if (position=='hitters') {
    return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHittingStats} data={data.stats.hitter}/>;
  }
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitchingStats} data={data.stats.pitcher}/>;

};

const renderTableSplit = (position, data, backgroundColor=undefined, color='#000') => {
  if (position=='hitters'){
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHittingSplit} data={data.split.hitter}/>;
  } 
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitchingSplit} data={data.split.pitcher}/>;

};

const renderTable3Games = (position, data, backgroundColor=undefined, color='#000') => {
  if (position=='hitters'){
    return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHitting3Games} data={data.last3Games.hitter}/>;
  }
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitching3Games} data={data.last3Games.pitcher}/>;

};

// const renderRank = (teamDetail) => {
//   if(teamDetail && teamDetail.ranking.length > 0) {
//       if(teamDetail.position == 'P') {
//       return (
//         <div>
//           <p>
//             <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Era: </span>{teamDetail.ranking[0].runs} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>G: </span>{teamDetail.ranking[0].hits} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SV: </span>{teamDetail.ranking[0].homeruns} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>IP: </span>{teamDetail.ranking[0].runs_batted_in} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>H: </span>{teamDetail.ranking[0].batter_walks} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>ER: </span>{teamDetail.ranking[0].batter_strike_outs} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SO: </span>{teamDetail.ranking[0].batter_on_base_percentage} th<br></br>
//           <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>WHIP: </span>{teamDetail.ranking[0].batter_slugging_percentage}
//           </p>
//         </div>
//       )
//     } 
//     return (
//       <div>
//         <p><span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SLG: </span>{teamDetail.ranking[0].batter_slugging_percentage} th<br></br>
//         <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>OBP: </span>{teamDetail.ranking[0].batter_on_base_percentage} th<br></br>
//         <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>AVG: </span>{teamDetail.ranking[0].batting_average} th<br></br>
//         <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>H: </span>{teamDetail.ranking[0].hits} th<br></br>
//         <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>HR: </span>{teamDetail.ranking[0].homeruns}</p>
//       </div>
//     )
//   }
//   return <></>
//   }

function TeamDetail(route) {
    const location = useLocation();
    const { teamId } = useLoaderData();
    const [teamDetail, setteamDetail] = useState(undefined)
    const [newsData, setNewsData] = useState([])
    const [bio, setBio] = useState({})
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
            const response = await axios.get(`${getNewsSpecificPlayer(teamDetail['odds_api'])}&apikey=${constant.API}`);
            setNewsData(response.data.articles)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [teamDetail])

    const onClick = (user) => {
      navigate(`${PATH_LIST.PLAYER_DETAIL}/${user.player_id}`);
    }

    const renderTableLeaders = (position, data, backgroundColor = undefined, color='#000') => {
      if (position=='hitters') {
        return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerLeader} data={data.leaders.hitter} onClick={(user) => onClick(user)}/>;
      }
      return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerLeader} data={data.leaders.pitcher} onClick={(user) => onClick(user)}/>;
    };


    // useEffect(() => {
      
    //   const fetchData4 = async () => {
    //     try {
    //         const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/players/bio?player_name=${teamDetail.odds_api}&team=${teamDetail.mysportfeeds_abbreviation}&season=${teamDetail.summary.map(x => x.season).sort().slice(-1)}`);
    //         setBio(response.data.body)
    //     } catch (error) {
    //       console.error('Error getting data:', error);
    //     }
    //   }
    //   // fetchData4()
    // }, [teamDetail])

    const renderPage = () => {
      return (
        <div style={{}}>
          <SubMenu backgroundColor={constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img} />
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex">
                  <div style={{ border: `5px solid ${constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img src={constant.team_detail[teamDetail.mysportfeeds_abbreviation].img}/>
                  </div>
                  <div>
                      <h2>{teamDetail['odds_api']}</h2>
                      <div>
                        <div>
                          <p><span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Wins: </span>{teamDetail.wins}<br></br>
                          <span style={{fontWeight: "bold", color: constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Losses: </span>{teamDetail.losses}
                          </p>
                        </div>
                        <div>
                        {/* <h3>Rank</h3>
                        {renderRank(teamDetail)} */}
                        </div>
                      </div>
                      
                  </div>
              </div>
              <br></br>
          </div>
          <div style={{ display: "flex", justifyContent: "left", marginBottom: "1rem" }}>
            <button style={{ border: "none", background: "transparent", padding: "0", marginRight: "1rem", color: "#000" }} onClick={handleButtonHitting} >Hitting</button>
            <button style={{ border: "none", background: "transparent", padding: "0", color: "#000" }} onClick={handleButtonPitching}>Pitching</button>
          </div>
          <section>
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
          <section id="ranking">
            <h3>Ranking</h3>
            {renderTableRanking(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="games">
            <h3>Next games</h3>
            {renderTableNextGames(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="leaders">
            <h3>Leaders</h3>
            {renderTableLeaders(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="leaders">
            <h3>Players</h3>
            {renderTablePlayers(showTable, teamDetail, constant.team_detail[teamDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="news">
            <h3>News</h3>
            <Row>
              {
                newsData.map(article => (
                  <Col xs={3}>
                    <CardComponent 
                      style="card-news"
                      title={article.title}
                      imageSrc={article.urlToImage}
                      linkTitle={article.url}
                      footer={getDateString(article.publishedAt)}
                    />
                  </Col>
                ))
              }
          </Row>
          </section>
        </div>    
      );
    }

    return (
      // <div id="template" className="player_detail_container" style={{backgroundImage: `url(${teamDetail ? constant.team_detail[teamDetail.mysportfeeds_abbreviation].img: ""})`}}>
      <div id="template">
        <Menu />
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
