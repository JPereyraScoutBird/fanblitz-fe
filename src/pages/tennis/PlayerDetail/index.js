import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Col, Container, Row } from 'reactstrap';
import { getDateString } from '../../../utils';
import Menu from '../../../container/Menu3';
import Footer from '../../../container/Footer';
import './style.css'
import SubMenu from '../../../container/Menu2';

export async function loader({ params }) {
    return params;
}

const getNewsSpecificPlayer = async (player_name) => {
  const newURL = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=tennis&subject=${player_name}`);
  // const aux =  `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) (yankees OR baltimore OR boston OR cleveland OR "white sox" OR twins OR detroit OR "kansas city" OR houston OR seattle OR angels OR ranger OR oakland OR atlanta OR mets OR phildelphia OR miami OR nationals OR louis OR milwaukee OR cubs OR reds OR pittsburgh OR dodgers OR "san diego" OR giants OR diamondbacks OR colorado) +NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
  return newURL.data.URL
}

// const getNewsSpecificPlayer = (player_name) => (
//   `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) (yankees OR baltimore OR boston OR cleveland OR "white sox" OR twins OR detroit OR "kansas city" OR houston OR seattle OR angels OR ranger OR oakland OR atlanta OR mets OR phildelphia OR miami OR nationals OR louis OR milwaukee OR cubs OR reds OR pittsburgh OR dodgers OR "san diego" OR giants OR diamondbacks OR colorado)+NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
// )

const renderTable = (position, data, backgroundColor = undefined, color='#fff') => {
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
      <div>
        <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Place: </span>{playerDetail.ranking[0].place} th<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Points: </span>{playerDetail.ranking[0].points}<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>League: </span>{playerDetail.ranking[0].league}<br></br>
        <span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Movement: </span>{playerDetail.ranking[0].movement}</p>      </div>
    )
  }
  return <></>
  }

function PlayerTennis(route) {
    const location = useLocation();
    const { playerId } = useLoaderData();
    const [playerDetail, setplayerDetail] = useState(undefined)
    const [newsData, setNewsData] = useState([])
    const [bio, setBio] = useState({})
    const [imageShow, setImageShow] = useState(false)

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

            // await axios.get(`${getNewsSpecificPlayer(playerDetail['name'])}&apikey=${constant.API}`);
            setNewsData(response.data.content)
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
      return (
        <div style={{}}>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex">
                  <div style={{ border: `5px solid ${constant.team_detail['DEFAULT'].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img hidden={imageShow} src={playerDetail.logo} onError={() => setImageShow(true)}/>
                  </div>
                  <div className='d-flex'>
                      <div>
                        <h2>{playerDetail['name']}</h2>
                        <div>
                          <div>
                            <p><span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Age: </span>{playerDetail.age}<br></br>
                            <span style={{fontWeight: "bold", color: constant.team_detail['DEFAULT'].teamColoursHex[1]}}>Birth Date: </span>{getDateString(playerDetail.birth_date)}</p>
                          </div>
                          </div>
                      </div>
                      <div style={{marginLeft: '4rem'}}>
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
            newsData.length ?
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

        </div>    
    );
    }

    return (
      <div id="template" className="player_detail_container" style={{backgroundImage: `url(${playerDetail ? constant.team_detail['DEFAULT'].img: ""})`}}>
        <Menu sport_default={"tennis"}/>
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
