import { Col, Row } from "reactstrap";
import {Link, useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import { getDate, getDateString } from "../../../utils";
import parse from 'html-react-parser'; 
import Image from '../../../img';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import constant from "../../mlb/PlayerDetail/constant";
import constants from "../constants";
import PATH_LIST from "../../../routes/constant";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export async function loader({ params }) {
  return params;
}

function ForecastDetail() {

  const [forecastData, setForecastData] = useState({})
  const {teams, date} = useLoaderData();
  const [stat, setStat] = useState({})

  useEffect(() => {
    const [home, away] = teams.split('-');
    // console.log("home", home, "away", away)
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/forecasts?home=${home}&away=${away}&date=${date}`).then((res) => {
      const jsonObject = JSON.parse(res.data.body)
      console.log("forecasts detail 1", jsonObject)
      if (jsonObject.hasOwnProperty('forecast')){
        setForecastData(JSON.parse(jsonObject.forecast)[0])
        // console.log("asd", jsonObject.home_team)
        setStat({"home_team": jsonObject.home_team, "away_team": jsonObject.away_team})
        console.log("forecasts detail 2", jsonObject)
      }
      
    })
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          // boxWidth: 0,
          boxHeight: 0,
        }
      },
      datalabels: {
        display: true,
        color: '#000'
     },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
      // to remove the labels
      x: {
        ticks: {
          display: false,
        },
      }
    }
  };
  

  const renderPage = () => {
    return (
      <div>      
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <div className="d-flex flex-md-row flex-column align-items-center">
            <div className="d-flex align-items-center">
              {/* <img style={{marginRight: "0.5rem"}} src={constants.team_detail[forecastData.home_team_abb].img} height={"24px"} /> */}
              <img style={{marginRight: "0.5rem"}} src={constants.team_detail[forecastData.home_team_abb].img} height={"24px"} />
            <h2 style={{marginRight: "0.5rem"}} className="mb-0"> {forecastData.home_team} </h2>
            </div>
            <h2> vs </h2>
            <div className="d-flex align-items-center">
              <img style={{marginRight: "0.5rem"}} src={constants.team_detail[forecastData.away_team_abb].img} height={"24px"} />
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
              {/* <img style={{marginRight: "0.5rem"}} src={"https://www.jconline.com/gcdn/presto/2018/08/08/PPHX/05066907-9dfa-4cf5-aaab-fc4354e0e852-ncaabasketball.jpg"} height={"24px"} /> */}

                <img width="100%" height={"300px"} className="section-image" src={'https://d3i6fh83elv35t.cloudfront.net/static/2023/03/2023-03-16T193846Z_626209374_MT1USATODAY20243404_RTRMADP_3_NCAA-BASKETBALL-NCAA-TOURNAMENT-FIRST-ROUND-GREENSBORO-PRACTICE-e1680644334647-1024x580.jpg'}/>
                {/* <img width="100%" height={"300px"} className="section-image" src={Image[forecastData.home_team_abb]}/> */}
                {parse(forecastData.open_ai_explanation || '')}
                <Row className="profile-container shadow-sm mt-5 p-3 mb-5 bg-body rounded d-flex flex-xs-column flex-md-row justify-content-center">
                  <Col xs={6} md={1}>
                    <img src={Image.BLITZBOT_PROFILE} className="profile-picture"/>
                  </Col>
                  <Col xs={11}>
                    <h5>Blitz Bot</h5>
                    <p><strong>AI Analyst at FanBlitz. Analyzing hundreds of thousands of stats daily.</strong></p>
                    <Link to={`/cbb${PATH_LIST.FORECAST}`}>More Posts by Blitz Bot</Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
                {stat ? 
                <div style={{padding: "0 2rem"}}>
                  {Object.keys(stat.home_team[0]).map(x => 
                    <Bar height="175px" options={{...options, plugins: {...options.plugins, title: {display: true, text: x.toUpperCase()}}}} data={{labels: [x], datasets: [{label: forecastData.home_team_abb, data: [stat.home_team[0][x]], backgroundColor: 'rgba(255, 99, 132, 0.5)',}, {label: forecastData.away_team_abb, data: [stat.away_team[0][x]], backgroundColor: 'rgba(53, 162, 235, 0.5)'}]}} /> 
                  )}
                {/* <Bar height="175px" options={options} data={{labels: ['test'], datasets: [{label: "1", data: [9], backgroundColor: 'rgba(255, 99, 132, 0.5)',}, {label: "2", data: [10], backgroundColor: 'rgba(53, 162, 235, 0.5)',}]}} /> : {}} */}
                </div>
                : {}}
              </Col>
            </Row>
          </section>
        </div>
      </div>
    )
  }
 
  return (
    <div id="forecast_detail">
      {forecastData != {} && forecastData != undefined && forecastData.hasOwnProperty('home_team')  ? renderPage() : 'Forecast Detail'}
    </div>
  );
}

export default ForecastDetail;
