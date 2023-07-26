import { Col, Row } from "reactstrap";
import Card from "../../component/Card";
import Menu from "../../container/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import CONSTANT from './constant';
import './style.css';
import { getDateString } from "../../utils";

function Blog() {

  const [newsData, setNewsData] = useState([])


  return (
    <div id="news">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Betting 101</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <Row>
          <Col xs={12} md={9}>
            <section >
              <div className="blog-title">
                <h2>Intelligent Betting: Our 8 Golden Rules</h2>
              </div>
              <div className="blog-info">
                <div>
                  <p>May 2 8:42 AM ET</p>
                  <p></p>
                  <p>admin</p>
                </div>
              </div>
              <div className="blog-subtitle">
                <p>Let’s explore eight essential rules of smart, responsible betting.</p>
              </div>
              <div className="blog-body">
                <h4>1. Respect the Odds</h4>
                <p>We start with a reality check. Up to 95% of sports bettors lose money over the long term. Even experienced sports bettors do not deliver a per-bet accuracy rate much above 50%. Let these figures be your forever reality check.</p>
                <h4>2. Bet For the Love of the Game</h4>
                <p>Your primary motive for betting should be to heighten your enjoyment of sports, not to pad your bank account. Treat betting as an intriguing subplot, not the main narrative. If a bet matters more than the fun of rooting it on, stop!</p>
              </div>
            </section>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Blog;
