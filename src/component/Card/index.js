import React from "react";
import { Card, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function CardComponent (props) {
    const {
        imageSrc,
        title,
        linkTitle,
        footer,
        style 
    } = props
    return (
        <Card className={`card_component ${style}`}>
            <CardImg src={imageSrc}/>
            <CardTitle className="mt-3">
                <a href={linkTitle}>{title}</a>
            </CardTitle>
            <CardFooter>
                <FontAwesomeIcon icon={faCalendarAlt} color="#ccc" /> {footer}
            </CardFooter>
        </Card>
    )
}

export default CardComponent