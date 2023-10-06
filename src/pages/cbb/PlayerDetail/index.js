import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import constants from '../constants';
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

const renderTable = (data, backgroundColor = undefined, color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.header} data={data.summary}/>;

};

const renderTable2 = (data, backgroundColor=undefined, color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerSplit} data={data.split}/>;
};

const renderTable3 = (data, backgroundColor=undefined, color='#fff') => {
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.header3Games} data={data.last3Games}/>;
};

const renderRank = (playerDetail) => {
  if(playerDetail && playerDetail.ranking.length > 0) {
    return (
      <div>
        <h3 className='mt-4' style={{marginLeft: '0px'}}>Rank</h3>
        <div className='player_rank'>
          <p><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>PTS: </span>{playerDetail.ranking[0].pts} th </p>
          <p><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>REB: </span>{playerDetail.ranking[0].reb} th </p>
          <p><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>AST: </span>{playerDetail.ranking[0].ast} th </p>
          <p><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>STL: </span>{playerDetail.ranking[0].stl} th </p>
          <p><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>TOV: </span>{playerDetail.ranking[0].tov} th </p>
        </div>
      </div>
    )
  }
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
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/stats/players?id=${playerId}`);
                const jsonObject = JSON.parse(response.data.body)
                setplayerDetail(jsonObject)
                console.log("dime a ve", jsonObject)
                console.log("dime a ve player", playerId)
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2()
    }, [playerId, location.key]);

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=basketball&subject=${playerDetail['full_name']}`);
            // const response = await axios.get(`${await getNewsSpecificPlayer(playerDetail['full_name'])}&apikey=${constant.API}`);
            console.log("dime a ve new", response)
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
                  <div style={{ border: `5px solid ${constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img hidden={imageShow} src={playerDetail.image} onError={() => setImageShow(true)}/>
                  </div>
                  <div className='player_info_container'>
                      <h2>{playerDetail['full_name']}</h2>
                      <div>
                        <div className='player_info'>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Age: </span>{playerDetail.age}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Birth Date: </span>{playerDetail.birth_date}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Height: </span>{playerDetail.height}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold", color: constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]}}>Weight: </span>{playerDetail.weight}</p>
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
            {renderTable3(playerDetail, constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="splits">
            <h3>Splits</h3>
            {renderTable2(playerDetail, constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
          </section>
          <section id="stats">
            <h3>Stats</h3>
            {renderTable(playerDetail, constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0])}
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
         <Menu sport_default={"cbb"} user={user} signOut={signOut} onChange={(e) => setGptStyle(e)}/>
        {playerDetail ? <SubMenu links={constant.links} backgroundColor={"#041e42" || constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[0]} color={constants.team_detail[playerDetail.mysportfeeds_abbreviation].teamColoursHex[1]} logo={playerDetail.team_image}/> : null}
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
