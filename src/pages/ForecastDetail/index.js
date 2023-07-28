import { Col, Row } from "reactstrap";
import {Link, useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import { getDate, getDateString } from "../../utils";
import parse from 'html-react-parser'; 
import Image from '../../img';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import constant from "../PlayerDetail/constant";
import PATH_LIST from "../../routes/constant";

export async function loader({ params }) {
  return params;
}

function ForecastDetail() {

  const [forecastData, setForecastData] = useState({})
  const {teams, date} = useLoaderData();

  useEffect(() => {
    const [home, away] = teams.split('-');
    console.log("home", home, "away", away)
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/forecasts?home=${home}&away=${away}&date=${date}`).then((res) => {
      const jsonObject = JSON.parse(res.data.body)
      if (jsonObject.hasOwnProperty('forecast')){
        setForecastData(JSON.parse(jsonObject.forecast)[0])
      }
      
    })
  }, [])


  const renderPage = () => {
    return (
      <div>      
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <div className="d-flex flex-md-row flex-column align-items-center">
            <div className="d-flex align-items-center">
              <img style={{marginRight: "0.5rem"}} src={constant.team_detail[forecastData.home_team_abb].img} height={"24px"} />
            <h2 style={{marginRight: "0.5rem"}} className="mb-0"> {forecastData.home_team} </h2>
            </div>
            <h2> vs </h2>
            <div className="d-flex align-items-center">
              <img style={{marginRight: "0.5rem"}} src={constant.team_detail[forecastData.away_team_abb].img} height={"24px"} />
              <h2 style={{marginRight: "0.5rem"}} className="ml-2 mb-0"> {forecastData.away_team}</h2>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon className="icon" icon={faCalendar} color="#ccc"/> <p className="footer-card">{getDate(forecastData.date_z)}</p>
            <div className="border-dash"></div>
            <FontAwesomeIcon className="icon" icon={faUser} color="#ccc" /><p className="footer-card">BlitzBot</p> 
          </div>
        </div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <section >
            <Row>
              <Col xs={12} md={9}>
                <img width="100%" height={"300px"} className="section-image" src={Image[forecastData.home_team_abb]}/>
                {parse(forecastData.open_ai_explanation || '')}
                <Row className="profile-container shadow-sm mt-5 p-3 mb-5 bg-body rounded d-flex flex-xs-column flex-md-row justify-content-center">
                  <Col xs={6} md={1}>
                    <img src={Image.BLITZBOT_PROFILE} className="profile-picture"/>
                  </Col>
                  <Col xs={11}>
                    <h5>Blitz Bot</h5>
                    <p><strong>AI Analyst at FanBlitz. Analyzing hundreds of thousands of stats daily.</strong></p>
                    <Link to={PATH_LIST.FORECAST}>More Posts by Blitz Bot</Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    )
  }
 
  return (
    <div id="forecast_detail">
      {forecastData != {} && forecastData.hasOwnProperty('home_team')  ? renderPage() : 'Forecast Detail'}
    </div>
  );
}

export default ForecastDetail;
