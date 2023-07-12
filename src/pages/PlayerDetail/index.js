import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../component/Table';
import CardComponent from '../../component/Card';
import { Col, Row } from 'reactstrap';
import { getDateString } from '../../utils';


export async function loader({ params }) {
    return params;
}

const getNewsSpecificPlayer = (player_name) => (
  `https://newsapi.org/v2/everything?q=(baseball) AND (${player_name}) (yankees OR baltimore OR boston OR cleveland OR "white sox" OR twins OR detroit OR "kansas city" OR houston OR seattle OR angels OR ranger OR oakland OR atlanta OR mets OR phildelphia OR miami OR nationals OR louis OR milwaukee OR cubs OR reds OR pittsburgh OR dodgers OR "san diego" OR giants OR diamondbacks OR colorado)+NOT+college+NOT+racial+NOT+"how to watch"+NOT+aaa+NOT+delayed+NOT+sex+NOT+shooting+NOT+dies+NOT+minors+NOT+retires+NOT+retirement&searchin=title&excludedomains=espn.com,biztoc.com,denverpost.com,brobible.com,seattlepi.com,hypebeast.com,nypost.com,thedailybeast.com,dailymail.co.uk,rivals.com,trendhunter.com&language=en&pageSize=100&sortBy=publishedAt`
)

const renderTable = (position, data) => {
  if (position !== "P") {
  return <CustomTable loading={data.length == 0} header={constant.headerHitting} data={data.summary}/>;
  } else if (position === "P") {
  return <CustomTable loading={data.length == 0} header={constant.headerPitching} data={data.summary}/>;
  }
  return null;
};

const renderTable2 = (position, data) => {
  if (position !== "P") {
  return <CustomTable loading={data.length == 0} header={constant.headerHittingSplit} data={data.split}/>;
  } else if (position === "P") {
  return <CustomTable loading={data.length == 0} header={constant.headerPitchingSplit} data={data.split}/>;
  }
  return null;
};


function Player(route) {
    const location = useLocation();
    const { playerId } = useLoaderData();
    const [playerDetail, setplayerDetail] = useState([])
    const [newsData, setNewsData] = useState([])
    console.log("User id: ", playerId)

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
      const fetchData3 = async (playerDetail) => {
        try {
            const response = await axios.get(`${getNewsSpecificPlayer('José Abreu')}&apikey=${constant.API}`);
            setNewsData(response.data.articles)
        } catch (error) {
          console.error('Error getting data:', error);
        }
      }
      fetchData3()
    }, [])
    
    return (
        <div>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <h2>Player Summary</h2>
              <div className="d-flex">
                  <div style={{ border: "1px solid white", "margin-right": "1rem"}}>
                      <img src={playerDetail.image} alt="photo" />
                  </div>
                  <div>
                      <h4>{playerDetail['full_name']}</h4>
                      <h7>Born: {playerDetail.birth_date}</h7>
                      <br></br>
                      <h7>Height: {playerDetail.height}</h7>
                      <br></br>
                      <h7>Weight: {playerDetail.weight}</h7>
                  </div>
              </div>
              <br></br>
          </div>
          <div>
            <h3>Splits</h3>
            {renderTable2(playerDetail.position, playerDetail)}
          </div>
          <div>
            <h3>Stats</h3>
            {renderTable(playerDetail.position, playerDetail)}
          </div>
          <div>
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
          </div>
        </div>    
    );

}

export default Player;
