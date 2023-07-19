import { Col, Row } from "reactstrap";
import Card from "../../component/Card";
import Menu from "../../container/Menu";
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import CONSTANT from './constant';
import './style.css';
import { getDateString } from "../../utils";
import parse from 'html-react-parser'; 
import Image from '../../img';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import constant from "../PlayerDetail/constant";

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
      // JSON.parse(res.data.body).then((resJson) => {
        console.log(res.data)
        setForecastData(res.data[0])
      // })
    })
  }, [])

  // console.log("params: ", forecastData.open_ai_explanation)

  const renderPage = () => {
    console.log("asd", constant.team_detail[forecastData.home_team_abb])
    return (
      <div>      
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <div className="d-flex align-items-center">
            <img style={{marginRight: "0.5rem"}} src={constant.team_detail[forecastData.home_team_abb].img} height={"24px"} />
            <h2 style={{marginRight: "0.5rem"}} className="mb-0"> {forecastData.home_team} vs </h2>
            <img style={{marginRight: "0.5rem"}} src={constant.team_detail[forecastData.away_team_abb].img} height={"24px"} />
            <h2 style={{marginRight: "0.5rem"}} className="ml-2 mb-0"> {forecastData.away_team}</h2>
          </div>
          <FontAwesomeIcon icon={faCalendarAlt} color="#ccc" /> {getDateString(forecastData.date_et)}
        </div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <section >
            <Row>
              <Col xs={9}>
                <img width="100%" height={"300px"} src={Image[forecastData.home_team_abb]}/>
                {parse(forecastData.open_ai_explanation || '')}
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
    <div id="forecast">
      {forecastData != {} && forecastData.hasOwnProperty('home_team')  ? renderPage() : 'Forecast Detail'}
    </div>
  );
}

export default ForecastDetail;
