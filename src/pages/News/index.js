import { Col, Row } from "reactstrap";
import Card from "../../component/Card";
import Menu from "../../container/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import CONSTANT from './constant';
import './style.css';
import { getDateString } from "../../utils";

function News() {

  const [newsData, setNewsData] = useState([])

  // Fetch Data from NewsApi (ComponentDidMount)
  useEffect(() => {
    axios.get(`${CONSTANT.URL}&apikey=${CONSTANT.API}`).then((res) => {
      console.log("ASD")
      setNewsData(res.data.articles)
    })
  }, [])

  console.log(newsData)

  return (
    <div id="news">
      <div>
        <h2>Featured News</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <section >
          <Row>
              {
                newsData.map(article => (
                  <Col xs={3}>
                    <Card 
                      style="card-news"
                      title={article.title}
                      imageSrc={article.urlToImage}
                      linkTitle={article.url}
                      footer={getDateString(article.publishedAt)}
                    />
                  </Col>
                ))
              }
              
          </Row>
            {/* Why us */}
        </section>
        <section>
            {/* Business */}
        </section>
        <section>
            {/* Market/Sports */}
        </section>
        <section>
            {/* {plans} */}
        </section>
        <section>
            {/* {contant us} */}
        </section>
      </div>
    </div>
  );
}

export default News;
