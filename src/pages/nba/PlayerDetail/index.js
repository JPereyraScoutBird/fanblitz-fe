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
          <p><span style={{fontWeight: "bold"}}>PTS: </span>{playerDetail.ranking[0].pts} th </p>
          <p><span style={{fontWeight: "bold"}}>REB: </span>{playerDetail.ranking[0].reb} th </p>
          <p><span style={{fontWeight: "bold"}}>AST: </span>{playerDetail.ranking[0].ast} th </p>
          <p><span style={{fontWeight: "bold"}}>STL: </span>{playerDetail.ranking[0].stl} th </p>
          <p><span style={{fontWeight: "bold"}}>TOV: </span>{playerDetail.ranking[0].tov} th </p>
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
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/qanba/nba/stats/players?id=${playerId}`);
                const jsonObject = JSON.parse(response.data.body)
                setplayerDetail(jsonObject)
                console.log("player detail", jsonObject)
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2()
    }, [playerId, location.key]);

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=nba&subject=${playerDetail['full_name']}`);
            // const response = await axios.get(`${await getNewsSpecificPlayer(playerDetail['full_name'])}&apikey=${constant.API}`);
            setNewsData(response.data.content)
            // setModal(true)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [playerDetail] )    

    const renderPage = () => {
      return (
        <div style={{}}>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex flex-column flex-md-row justify-content-start align-items-center align-items-md-start">
                  <div style={{ border: `5px solid red`, marginRight: "1rem"}}>
                    <img hidden={imageShow} src={playerDetail.image} onError={() => setImageShow(true)}/>
                  </div>
                  <div className='player_info_container'>
                      <h2>{playerDetail['full_name']}</h2>
                      <div>
                        <div className='player_info'>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold"}}>Age: </span>{playerDetail.age}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold"}}>Birth Date: </span>{playerDetail.birth_date}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold"}}>Height: </span>{playerDetail.height}</p>
                          <p style={{marginBottom:'0px'}}><span style={{fontWeight: "bold"}}>Weight: </span>{playerDetail.weight}</p>
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
            {renderTable3(playerDetail)}
          </section>
          <section id="splits">
            <h3>Splits</h3>
            {renderTable2(playerDetail)}
          </section>
          <section id="stats">
            <h3>Stats</h3>
            {renderTable(playerDetail)}
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
                          imageSrc={article.urlToImage || "https://a.espncdn.com/photo/2023/1020/nba_season_preview_illo1_new_cr_16x9.jpg"}
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
            <Chatbot player={`${playerDetail['first_name']} ${playerDetail['last_name']}`} gptStyle={gptStyle} sportLeague={'NBA'} sportPlayer={'basketball'}/>
          </Modal>
        </div>    
    );
    }

    return (
      <div id="template" className="player_detail_container">
         <Menu sport_default={"nba"} user={user} signOut={signOut} onChange={(e) => setGptStyle(e)}/>
        {playerDetail ? <SubMenu links={constant.links} backgroundColor={"#041e42"} logo={''}/> : null}
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
