import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Col, Container, Modal, Row } from 'reactstrap';
import { getDateString } from '../../../utils';
import Menu from '../../../container/Menu3';
import Footer from '../../../container/Footer';
import './style.css'
import SubMenu from '../../../container/Menu2';
import Chatbot from '../../../container/ChatBot';

export async function loader({ params }) {
    return params;
}

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
        <>
          <h3 className='mt-4' style={{marginLeft: '0px'}}>Rank</h3>
          <div className='player_rank'>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Era: </span>{playerDetail.ranking[0].earned_run_agerage} th</p>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>G: </span>{playerDetail.ranking[0].wins} th</p>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SV: </span>{playerDetail.ranking[0].saves} th</p>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>AVG: </span>{playerDetail.ranking[0].pitching_average} th</p>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>ER: </span>{playerDetail.ranking[0].earned_runs_allowed} th</p>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SO: </span>{playerDetail.ranking[0].pitcher_strikeouts} th</p>
            <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>WHIP: </span>{playerDetail.ranking[0].walks_and_hits_per_inning_pitched}</p>
          </div>
        </>
      )
    } 
    return (
      <div>
        <h3 className='mt-4' style={{marginLeft: '0px'}}>Rank</h3>
        <div className='player_rank'>
          <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>SLG: </span>{playerDetail.ranking[0].batter_slugging_percentage} th </p>
          <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>OBP: </span>{playerDetail.ranking[0].batter_on_base_percentage} th </p>
          <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>AVG: </span>{playerDetail.ranking[0].batting_average} th </p>
          <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>H: </span>{playerDetail.ranking[0].hits} th </p>
          <p><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>HR: </span>{playerDetail.ranking[0].homeruns}</p>
        </div>
      </div>
    )
  }
  return <></>
  }

function Player(props) {
    const {user, signOut} = props
    const location = useLocation();
    const { playerId } = useLoaderData();
    const [playerDetail, setplayerDetail] = useState(undefined)
    const [newsData, setNewsData] = useState([])
    const [imageShow, setImageShow] = useState(false)
    const [gptStyle, setGptStyle] = useState('')
    const [modal, setModal] = useState(true);
    const toggle2 = () => setModal(!modal);

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
    }, [playerId, location.key]);

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=baseball&subject=${playerDetail['full_name']}`);
            // const response = await axios.get(`${await getNewsSpecificPlayer(playerDetail['full_name'])}&apikey=${constant.API}`);
            setNewsData(response.data.content)
            // setModal(true)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [playerDetail])    

    const renderPage = () => {
      return (
        <div style={{}}>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex flex-column flex-md-row justify-content-start align-items-center align-items-md-start">
                  <div style={{ border: `5px solid ${constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img hidden={imageShow} src={playerDetail.image} onError={() => setImageShow(true)}/>
                  </div>
                  <div className='player_info_container'>
                      <h2>{playerDetail['full_name']}</h2>
                      <div>
                        <div className='player_info'>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Age: </span>{playerDetail.age}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Birth Date: </span>{playerDetail.birth_date}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Height: </span>{playerDetail.height}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Weight: </span>{playerDetail.weight}</p>
                        </div>
                        <div>
                          {renderRank(playerDetail)}
                        </div>
                      </div>
                      
                  </div>
              </div>
              <br></br>
          </div>    
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
          {
            newsData && newsData.length ? 
            <section id="news">
                <h3>News</h3>
                <Row>
                  {
                    newsData.map(article => (
                      // <Col xs={3}>
                        <CardComponent 
                          className={'col-12 col-md-3'}
                          style="card-news"
                          title={article.title}
                          imageSrc={article.urlToImage || "https://media.istockphoto.com/id/482805043/photo/baseball-in-the-infield.jpg?s=612x612&w=0&k=20&c=I9ubYdLnf7heRWh7V8I0Zxo5s1OEBGMBgsj6Sg4b9"}
                          linkTitle={article.url}
                          footer={getDateString(article.publishedAt)}
                        />
                      // </Col>
                    ))
                  }
              </Row>
            </section>
          : null
          }
          <Modal isOpen={modal} toggle={toggle2}>
            <Chatbot player={`${playerDetail['first_name']} ${playerDetail['last_name']}`} gptStyle={gptStyle}/>
          </Modal>
        </div>    
    );
    }

    return (
      <div id="template" className="player_detail_container">
         <Menu sport_default={"mlb"} user={user} signOut={signOut} onChange={(e) => setGptStyle(e)}/>
        {playerDetail ? <SubMenu links={constant.links} backgroundColor={"#041e42" || constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[playerDetail.mysportfeeds_abbreviation].img}/> : null}
        <Container className="template">
          <div id="detail">
            {playerDetail && playerDetail.hasOwnProperty('full_name') ? renderPage() : <></> }
          </div>
        </Container>
        <Footer />
      </div>
    );
}

export default Player;
