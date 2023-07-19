import { Col, Row } from "reactstrap";
import Card from "../../component/Card";
import Menu from "../../container/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
// import CONSTANT from './constant';
import './style.css';
import { getDate2, getDateString } from "../../utils";
import Image from '../../img';
import PATH_LIST from "../../routes/constant";
function Forecasts() {

  const [forecastData, setForecastData] = useState([])

  // Fetch Data from NewsApi (ComponentDidMount)
  useEffect(() => {
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/forecasts`).then((res) => {
      // JSON.parse(res.data.body).then((resJson) => {
        setForecastData(res.data)
        // console.log(res.data.body)
        // setForecastData(JSON.parse(res.data.body))
      // })
    })
  }, [])

  // console.log(forecastData[0])

  return (
    <div id="forecast">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Forecast</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          <Row>
              {
                forecastData.map(article => (
                  <Col xs={6}>
                    <Card 
                      style="card-news"
                      title={`${article.home_team} vs ${article.away_team}`}
                      imageSrc={Image[article.home_team_abb]}
                      linkTitle={`${PATH_LIST.FORECAST_DETAIL}/${article.home_team_abb}-${article.away_team_abb}/${getDate2(article.date_et)}`}
                      footer={getDateString(article.date_et)}
                    />
                  </Col>
                ))
              }
          </Row>
        </section>
      </div>
    </div>
  );
}

export default Forecasts;
