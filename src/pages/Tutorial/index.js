import { Col, Row } from "reactstrap";
import { useState } from "react";
import CONSTANT from './constant';
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser, faComments } from "@fortawesome/free-regular-svg-icons";


const renderBlog = ( blogObj = {} ) => (
  <section id={blogObj.title.replace(' ', '')}>
    <div className="blog-title">
      <h2 style={{color: `${blogObj.highlight ? "#006699" : "000000"}`}}>{blogObj.title || "Intelligent Betting: Our 8 Golden Rules"}</h2>
    </div>
    <div className="blog-info">
      <div className="d-flex justify-content-left align-items-center">
      <span><FontAwesomeIcon className="icon" icon={faCalendar}  color="#ccc" />{blogObj.date || "May 2 8:42 AM ET"}</span>
        <div className="border-dash"></div>
        <span><FontAwesomeIcon className="icon" icon={faUser}  color="#ccc" />{blogObj.author || "admin"}</span>
      </div>
    </div>
    <div className="blog-subtitle">
      <p>{blogObj.subtitle ? blogObj.subtitle.split('\n').map(text => <>{text}<br></br></>) : "Let’s explore eight essential rules of smart, responsible betting."}</p>
    </div>
    <div className="blog-body">
      {
       blogObj.body ? 
        blogObj.body.map(x => (
        <div>
          <h4>{x.title}</h4>
          <p>{x.description.split('\n').map(text => <>{text}<br></br></>)}</p>
        </div>
      )) :
      <div>
        <h4>1. Respect the Odds</h4>
        <p>We start with a reality check. Up to 95% of sports bettors lose money over the long term. Even experienced sports bettors do not deliver a per-bet accuracy rate much above 50%. Let these figures be your forever reality check.</p>
        <h4>2. Bet For the Love of the Game</h4>
        <p>Your primary motive for betting should be to heighten your enjoyment of sports, not to pad your bank account. Treat betting as an intriguing subplot, not the main narrative. If a bet matters more than the fun of rooting it on, stop!</p> 
      </div>
      }
    </div>
  </section>
)



function Blog() {
  const [activeBlog, setActiveBlog] = useState(0)

  const renderNav = (blogObj) => (
    <div>
      <h4><a style={{color: `${activeBlog == blogObj.title.replace(' ', '')  ? '#006699' : '#000000'}`}} href={`#${blogObj.title.replace(' ', '')}`} onClick={() => setActiveBlog(blogObj.title.replace(' ', ''))}>{blogObj.index}</a></h4>
      <p>            
        <span><FontAwesomeIcon className="icon" icon={faComments}  color="#ccc" />{blogObj.indexSubtitle}</span>
      </p>
    </div>
  )

  return (
    <div id="blog">
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <h2>Betting 101</h2>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
        <Row>
          <Col xs={12} md={9}>
            {CONSTANT.map(single_blog => renderBlog(single_blog))}
          </Col>
          <Col xs={3} className="nav-custom d-none d-md-block">
            {CONSTANT.map(single_blog => renderNav(single_blog))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Blog;
