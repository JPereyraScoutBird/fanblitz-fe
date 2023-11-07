import { Col, Row } from "reactstrap";
import Card from "../../../component/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import { filterByDate, getDate, getDate2, getDateString, getTime } from "../../../utils";
import Image from '../../../img';
import PATH_LIST from "../../../routes/constant";
import constant from "../PlayerDetail/constant";
import constants from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import DatePagination from "../../../component/DatePagination";
import moment from 'moment'

function Forecasts() {

  const [forecastData, setForecastData] = useState([])
  const [date, setDate] = useState(moment(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})))

  // Fetch Data from NewsApi (ComponentDidMount)
  useEffect(() => {
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/devncaa/cbb/forecasts`).then((res) => {
      setForecastData((JSON.parse(res.data.body)))
      // console.log("forecasts", (JSON.parse(res.data.body)))
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
      <span><FontAwesomeIcon className="icon" icon={faComments}  color="#ccc" />Analysis</span></div>
    </div>
  )

  console.log(date.toDate(), forecastData.filter(x => filterByDate(x.date_z, date.toDate())))

  const geImage = (homeTeam, homeImage) =>{
    try{
      let aux = homeTeam.replace(/\s+/g, "_")
      aux = aux.replace(/&/g, "_")
      if (Image.CBB.hasOwnProperty(aux)){
        return Image.CBB[aux]
      }
      return homeImage
    }
    catch(e){
      return Image.CBB["Logo0"]
    }
  }

  return (
    <div id="forecast">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Forecast</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          <div className="mb-4">
            <DatePagination date={date} onClick={(date) => setDate(date)}/>
          </div>
          <Row>
              {
                forecastData.length ? forecastData.filter(x => filterByDate(getDate(x.date_z), date.toDate())).map(forecast => (
                  <Col xs={12} md={6}>
                    <Card 
                      style="card-news"
                      title={`${forecast.home_team} vs ${forecast.away_team}`}
                      body={constants.team_detail[forecast.home_team_abb].stadium}
                      // imageSrc={"https://www.jconline.com/gcdn/presto/2018/08/08/PPHX/05066907-9dfa-4cf5-aaab-fc4354e0e852-ncaabasketball.jpg"}
                      imageSrc={(geImage(forecast.home_team_abb, forecast.home_image))}
                      linkTitle={`/cbb${PATH_LIST.FORECAST_DETAIL}/${forecast.home_team_abb}-${forecast.away_team_abb}/${getDate2(forecast.date_z)}`}
                      footer={getDate2(forecast.date_z)}
                      imageRedirect={true}
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

export default Forecasts;
