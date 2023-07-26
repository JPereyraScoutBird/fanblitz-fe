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

export async function loader({ params }) {
    return params;
}

const getNewsSpecificPlayer = (player_name) => (
  `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) (yankees OR baltimore OR boston OR cleveland OR "white sox" OR twins OR detroit OR "kansas city" OR houston OR seattle OR angels OR ranger OR oakland OR atlanta OR mets OR phildelphia OR miami OR nationals OR louis OR milwaukee OR cubs OR reds OR pittsburgh OR dodgers OR "san diego" OR giants OR diamondbacks OR colorado)+NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
)

const renderTable = (position, data, backgroundColor = undefined, color='#fff') => {
  if (position !== "P") {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHitting} data={data.summary}/>;
  } else if (position === "P") {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitching} data={data.summary}/>;
  }
  return null;
};

const renderTable2 = (position, data, backgroundColor=undefined, color='#fff') => {
  if (position !== "P") {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHittingSplit} data={data.split}/>;
  } else if (position === "P") {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitchingSplit} data={data.split}/>;
  }
  return null;
};

const renderTable3 = (position, data, backgroundColor=undefined, color='#fff') => {
  if (position !== "P") {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerHitting3Games} data={data.last3Games}/>;
  } else if (position === "P") {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerPitching3Games} data={data.last3Games}/>;
  }
  return null;
};

const renderRank = (playerDetail) => {
  if(playerDetail && playerDetail.ranking.length > 0) {
      if(playerDetail.position == 'P') {
      return (
        <div>
          <p>
            <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Era: </span>{playerDetail.ranking[0].runs} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>G: </span>{playerDetail.ranking[0].hits} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SV: </span>{playerDetail.ranking[0].homeruns} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>IP: </span>{playerDetail.ranking[0].runs_batted_in} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>H: </span>{playerDetail.ranking[0].batter_walks} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>ER: </span>{playerDetail.ranking[0].batter_strike_outs} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SO: </span>{playerDetail.ranking[0].batter_on_base_percentage} th<br></br>
          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>WHIP: </span>{playerDetail.ranking[0].batter_slugging_percentage}
          </p>
        </div>
      )
    } 
    return (
      <div>
        <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SLG: </span>{playerDetail.ranking[0].batter_slugging_percentage} th<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>OBP: </span>{playerDetail.ranking[0].batter_on_base_percentage} th<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>AVG: </span>{playerDetail.ranking[0].batting_average} th<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>H: </span>{playerDetail.ranking[0].hits} th<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>HR: </span>{playerDetail.ranking[0].homeruns}</p>
      </div>
    )
  }
  return <></>
  }

function Player(route) {
    const location = useLocation();
    const { playerId } = useLoaderData();
    const [playerDetail, setplayerDetail] = useState(undefined)
    const [newsData, setNewsData] = useState([])
    const [bio, setBio] = useState({})
    const [imageShow, setImageShow] = useState(false)

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players?id=${playerId}`);
                const jsonObject = JSON.parse(response.data.body)
                setplayerDetail(jsonObject)
                
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2()
    }, []);

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get(`${getNewsSpecificPlayer(playerDetail['full_name'])}&apikey=${constant.API}`);
            setNewsData(response.data.articles)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [playerDetail])

    useEffect(() => {
      
      const fetchData4 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/players/bio?player_name=${playerDetail.full_name}&team=${playerDetail.mysportfeeds_abbreviation}&season=${playerDetail.summary.map(x => x.season).sort().slice(-1)}`);
            setBio(response.data.body)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      // fetchData4()
    }, [playerDetail])

    

    const renderPage = () => {
      console.log("playerDetail", playerDetail)
      // console.log(constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0],  constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex)
      return (
        <div style={{}}>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex">
                  <div style={{ border: `5px solid ${constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img hidden={imageShow} src={playerDetail.image} onError={() => setImageShow(true)}/>
                  </div>
                  <div>
                      <h2>{playerDetail['full_name']}</h2>
                      <div>
                        <div>
                          <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Age: </span>{playerDetail.age}<br></br>
                          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Birth Date: </span>{playerDetail.birth_date}<br></br>
                          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Height: </span>{playerDetail.height}<br></br>
                          <span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Weight: </span>{playerDetail.weight}</p>
                        </div>
                        <div>
                        <h3>Rank</h3>
                        {renderRank(playerDetail)}
                        </div>
                      </div>
                      
                  </div>
              </div>
              <br></br>
          </div>
          {/* <section>
            {console.log("Bio: ", bio)}
            <h3>Bio</h3>
            <p>{bio ? bio.bio : ""}</p>
            <h4>Background</h4>
            <p>{bio ? bio.background : ""}</p>
            <h4>Facts</h4>
            <p>{bio ? bio.facts : ""}</p>
          </section> */}
          <section id="lastGames">
            <h3>Last 3 Games</h3>
            {renderTable3(playerDetail.position, playerDetail, constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="splits">
            <h3>Splits</h3>
            {renderTable2(playerDetail.position, playerDetail, constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="stats">
            <h3>Stats</h3>
            {renderTable(playerDetail.position, playerDetail, constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="charts">
            <h3>Charts</h3>
            {/* {playerDetail ? <Line height="70vh" options={playerDetail.summary} data={playerDetail.summary} /> : {}}; */}
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
      <div id="template" className="player_detail_container" style={{backgroundImage: `url(${playerDetail ? constant.team_detail[playerDetail.mysportfeeds_abbreviation].img: ""})`}}>
        <Menu />
        {playerDetail ? <SubMenu links={constant.links} backgroundColor={"#041e42" || constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[playerDetail.mysportfeeds_abbreviation].img}/> : null}
        <Container className="template">
          <div id="detail">
            {playerDetail ? renderPage() : <></> }
          </div>
        </Container>
        <Footer />
      </div>
    );
}

export default Player;
