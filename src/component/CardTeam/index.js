import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function CardTeamComponent (props) {
    const [error, setError] = useState(false)

    const {
        imageSrc,
        title,
        home,
        away,
        homeImg,
        awayImg,
        home_score,
        away_score,
        link,
        footer,
        style = '',
        className,
        body,
        classNameImg
    } = props

    if (error != true) {
        console.log("url: ", homeImg)
        return (
            <Link to={link} className={`${className} card-link shadow mb-5 p-2 bg-white rounded`}>
                <Card className={`card_team_component ${style}`}>
                <h5>Today's Game</h5>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="team-img d-flex flex-column justify-content-center align-items-center">
                            <CardImg className={classNameImg} onError={() => setError(true)} src={homeImg}/>
                            <p>{home} {home_score}</p>
                        </div>
                        <div className="vs d-flex flex-column justify-content-center align-items-center">
                            <h4>VS</h4>
                            <p>{footer}</p>
                        </div>
                        <div className="team-img d-flex flex-column justify-content-center align-items-center">
                            <CardImg className={classNameImg} onError={() => setError(true)} src={awayImg}/>
                            <p>{away} {away_score}</p>
                        </div>
                    </div>
                </Card>
            </Link>
        )
    } 
    return null

}

export default CardTeamComponent