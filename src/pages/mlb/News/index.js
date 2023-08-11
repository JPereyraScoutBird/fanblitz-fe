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

    axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/news?sport=baseball`).then((resURL) => {
      // console.log("resURL", resURL)
      // console.log("resURL.data.URL", resURL.data.URL)
      // console.log("CONSTANT.URL", CONSTANT.URL)
      if (resURL.status == 200){
        const sortedListArticles = resURL.data.content.sort(sortListArticles);
        setNewsData(sortedListArticles)
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
                      imageSrc={article.urlToImage || "https://media.istockphoto.com/id/482805043/photo/baseball-in-the-infield.jpg?s=612x612&w=0&k=20&c=I9ubYdLnf7heRWh7V8I0Zxo5s1OEBGMBgsj6Sg4b9"}
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
