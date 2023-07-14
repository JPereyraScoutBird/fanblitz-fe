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

export async function loader({ params }) {
  return params;
}

function ForecastDetail() {

  const [forecastData, setForecastData] = useState({})
  const {teams, date} = useLoaderData();

  useEffect(() => {
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/forecasts`).then((res) => {
      // JSON.parse(res.data.body).then((resJson) => {
        setForecastData(JSON.parse(res.data.body)[0])
      // })
    })
  }, [])

  console.log("params: ", forecastData.open_ai_explanation)

 
  return (
    <div id="forecast">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Forecast Detail</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          {forecastData != {} ? parse(forecastData.open_ai_explanation) : <></>}
        </section>
      </div>
    </div>
  );
}

export default ForecastDetail;
