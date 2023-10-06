import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import constants from '../constants';
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

const renderTablePlays = (data, backgroundColor = "#000", color='#fff') => {
  return <CustomTable noRange={false} pagination={true} range={50} playeImage={false} backgroundColor={backgroundColor} color={color} loading={data.length == 0} header={constant.playByPlay} data={data}/>;
};

function GamePlays(route) {
    const { gameId } = useLoaderData();
    const [gameInfo, setGameInfo] = useState(undefined)
    const [gamePlays, setGamePlays] = useState(undefined)

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/games/playbyplay?gameid=${gameId}`);
                console.log("response", response)
                if (response.status == 200){
                  let jsonObject = JSON.parse(response.data.body)
                  console.log("jsonObject", jsonObject)
                  setGameInfo(jsonObject)
                  setGamePlays(jsonObject.data)
                }
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };

        fetchData2()
    }, []);

    const renderPage = () => {
      return (
        <div style={{}}>
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
              <div className="d-flex">
                  <div style={{ border: `5px solid ${constants.team_detail[gameInfo.home_team_abbr].teamColoursHex[0]}`, marginRight: "1rem"}}>
                    <img src={gameInfo.image}/>
                  </div>
                  <div className='w-100'>
                      <h2>{gameInfo['away_team']} vs {gameInfo['home_team']}</h2>
                  </div>
              </div>
          </div>
          <section id="players">
            <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h3>Plays</h3>
            </div>
            {renderTablePlays(gamePlays)}
          </section>
        </div>    
      );
    }

    const renderPageNoData = () => {
      <section id="players">
          <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h3>Plays</h3>
          </div>
          <h3>No play by play found :/</h3>
        </section>
    }

    return (
      // <div id="template" className="playbyplay_away" style={{backgroundImage: `url(${gamePlays ? constant.team_detail[gameInfo.away_team_abbr].img: ""})`}}>
      // <div id="template" className="playbyplay_home" style={{backgroundImage: `url(${gamePlays ? constant.team_detail[gameInfo.home_team_abbr].img: ""})`}}>
      <div id="template">
        <Menu sport_default={"mlb"}/>
        {/* { gamePlays ? <SubMenu home={`/mlb${PATH_LIST.GAME_DETAIL}/:${gamePlays.id}}`} links={constant.links} wins={gamePlays.wins} losses={gamePlays.losses} backgroundColor={"#041e42" || constant.team_detail[gamePlays.mysportfeeds_abbreviation].teamColoursHex[0]} color={constant.team_detail[gamePlays.mysportfeeds_abbreviation].teamColoursHex[1]} logo={constant.team_detail[gamePlays.mysportfeeds_abbreviation].img} /> : null} */}
        <Container className="template">
          <div id="detail">
            {gamePlays ? renderPage() : renderPageNoData() }
          </div>
        </Container>
        <Footer />
      </div>
      // </div>
    );
}

export default GamePlays;
