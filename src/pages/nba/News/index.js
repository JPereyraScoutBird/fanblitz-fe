import { Col, Row } from "reactstrap";
import Card from "../../../component/Card";
import Menu from "../../../container/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import CONSTANT from './constant';
import './style.css';
import { getDateString, sortListArticles } from "../../../utils";
import constant from "./constant";
import IMAGE from '../../../img';

function News() {

  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data from NewsApi (ComponentDidMount)
  useEffect(() => {
    setIsLoading(false);
    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=nba`).then((resURL) => {
      if (resURL.status == 200){
        const sortedListArticles = resURL.data.content.sort(sortListArticles);
        const uniqueArticles = sortedListArticles.reduce((accumulator, current) => {
          if (!accumulator.find((item) => (item.url === current.url || item.title === current.title || item.urlToImage === current.urlToImage))) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        setNewsData(uniqueArticles)
        setIsLoading(true);
      }
    })
  }, [])

  const render = () => {
    return (
      <Row>
          {
            newsData.map(article => (
                <Card 
                  className={'col-12 col-md-3'}
                  style="card-news"
                  title={article.title}
                  imageSrc={article.urlToImage || "ttps://ichef.bbci.co.uk/images/ic/480xn/p0f3k3nz.jpg"}
                  linkTitle={article.url}
                  footer={getDateString(article.publishedAt)}
                />
            ))
          }
      </Row>
    )
  }

  const getLoading = () => {
    return  (
    <div className = "loading-container" >
      <img src = {IMAGE["loading"]} alt = "loading" className = "loading-image" />
    </div>
    )    
  }

  return (
    <div id="news">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Featured News</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          {isLoading == false ? getLoading() : render()}
        </section>
      </div>
    </div>
  );
}

export default News;
