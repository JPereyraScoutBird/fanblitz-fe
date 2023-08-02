import { Col, Row } from "reactstrap";
import Card from "../../../component/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import { getDate, getDate2, getDateString, getTime } from "../../../utils";
import Image from '../../../img';
import PATH_LIST from "../../../routes/constant";
import constant from "../PlayerDetail/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";

function ForecastsTennis() {

  const [forecastData, setForecastData] = useState([])

  // Fetch Data from NewsApi (ComponentDidMount)
  useEffect(() => {
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/tennis/forecasts`).then((res) => {
      setForecastData((JSON.parse(res.data.body)))
    })
  }, [])

  if(forecastData.length > 0) {
    console.log(forecastData[0].home_team_abb)
  }

  const renderFooter = (date_z) => (
    <div className="">
      <div className="d-flex justify-content-center align-items-center">
      <span>{getTime(date_z)}</span>
      <div className="border-dash"></div>
      <span><FontAwesomeIcon className="icon" icon={faComments}  color="#ccc" />Analisis</span></div>
    </div>
  )

  return (
    <div id="forecast">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Forecast</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          <Row>
              {
                forecastData.length ? forecastData.map(forecast => (
                  <Col xs={12} md={6}>
                    <Card 
                      style="card-news"
                      title={`${forecast.home_player} vs ${forecast.away_player}`}
                      // body={constant.team_detail[forecast.home_team_abb].stadium}
                      imageSrc={Image.TENNIS.Logo1}
                      linkTitle={`/tennis${PATH_LIST.FORECAST_DETAIL}/${forecast.home_player}-${forecast.away_player}/${getDate2(forecast.date_z)}`}
                      footer={renderFooter(forecast.date_z)}
                    />
                  </Col>
                ))
                : null
              }
          </Row>
        </section>
      </div>
    </div>
  );
}

export default ForecastsTennis;