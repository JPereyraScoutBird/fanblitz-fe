import { Col, Row } from "reactstrap";
import Card from "../../../component/Card";
import Menu from "../../../container/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import CONSTANT from './constant';
import './style.css';
import { getDateString, sortListArticles } from "../../../utils";
import constant from "./constant";

function News() {

  const [newsData, setNewsData] = useState([])

  // Fetch Data from NewsApi (ComponentDidMount)
  useEffect(() => {

    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=cbb`).then((resURL) => {
      if (resURL.status == 200){
        const sortedListArticles = resURL.data.content.sort(sortListArticles);
        const uniqueArticles = sortedListArticles.reduce((accumulator, current) => {
          if (!accumulator.find((item) => (item.url === current.url || item.title === current.title || item.urlToImage === current.urlToImage))) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        setNewsData(uniqueArticles)
      }
    })
  }, [])

  return (
    <div id="news">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Featured News</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          <Row>
              {
                newsData.map(article => (
                    <Card 
                      className={'col-12 col-md-3'}
                      style="card-news"
                      title={article.title}
                      imageSrc={article.urlToImage || "https://www.jconline.com/gcdn/presto/2018/08/08/PPHX/05066907-9dfa-4cf5-aaab-fc4354e0e852-ncaabasketball.jpg"}
                      linkTitle={article.url}
                      footer={getDateString(article.publishedAt)}
                    />
                ))
              }
          </Row>
        </section>
      </div>
    </div>
  );
}

export default News;
