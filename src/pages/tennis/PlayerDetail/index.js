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
  return <CustomTable backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.headerStats} data={data.summary}/>;
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
      <div className='player_rank'>
        <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Place: </span>{playerDetail.ranking[0].place} th</p>
        <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Points: </span>{playerDetail.ranking[0].points}</p>
        <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>League: </span>{playerDetail.ranking[0].league}</p>
        <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Movement: </span>{playerDetail.ranking[0].movement}</p>
      </div>
    )
  }
  return <></>
  }

function PlayerTennis(props) {
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
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/tennis/stats/players?id=${playerId}`);
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
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=tennis&subject=${playerDetail['name']}`);
            setNewsData(response.data.content)
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
              <div className="d-flex flex-column flex-md-row justify-content-start align-items-center">
                  <div style={{ border: `5px solid ${constant.team_detail['DEFAULT'].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img hidden={imageShow} src={playerDetail.logo} onError={() => setImageShow(true)}/>
                  </div>
                  <div className='d-flex flex-column flex-md-row'>
                      <div className='player_info_container'>
                        <h2>{playerDetail['name']}</h2>
                        <div>
                          <div className='player_info'>
                            <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Age: </span>{playerDetail.age}</p>
                            <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Birth Date: </span>{getDateString(playerDetail.birth_date)}</p>
                          </div>
                          </div>
                      </div>
                      <div className='rank_container'>
                        <h3>Rank</h3>
                        {renderRank(playerDetail)}
                        </div>
                      </div>
              </div>
              <br></br>
          </div>
          <section id="lastGames">
            <h3>Last 3 Games</h3>
            {renderTable3(playerDetail, constant.team_detail['DEFAULT'].teamColoursHex[0])}
          </section>
          <section id="splits">
            <h3>Splits</h3>
            {renderTable2(playerDetail, constant.team_detail['DEFAULT'].teamColoursHex[0])}
          </section>
          <section id="stats">
            <h3>Stats</h3>
            {renderTable(playerDetail, constant.team_detail['DEFAULT'].teamColoursHex[0])}
          </section>
          {
            newsData & newsData.length ?
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
            : null
          }
          <Modal isOpen={modal} toggle={toggle2}>
            <Chatbot player={playerDetail['name']} pre_prompt={`${playerDetail['name']} tennis player extremely succinct background and obscure/interesting facts output as [background][obscure/interesting facts]`} gptStyle={gptStyle}/>
          </Modal>
        </div>    
    );
    }

    return (
      <div id="template" className="player_detail_container">
        <Menu sport_default={"tennis"} user={user} signOut={signOut} onChange={(e) => setGptStyle(e)}/>
        {playerDetail ? <SubMenu links={constant.links} backgroundColor={"#041e42" || constant.team_detail['DEFAULT'].teamColoursHex[0]} color={constant.team_detail['DEFAULT'].teamColoursHex[1]} logo={constant.team_detail['DEFAULT'].img}/> : null}
        <Container className="template">
          <div id="detail">
            {playerDetail ? renderPage() : <></> }
          </div>
        </Container>
        <Footer />
      </div>
    );
}

export default PlayerTennis;
