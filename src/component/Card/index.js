import React, { useState } from "react";
import { Card, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function CardComponent (props) {
    const [error, setError] = useState(false)

    const {
        imageSrc,
        title,
        linkTitle,
        footer,
        style,
        className
    } = props

    if (error != true) {
        return (
            <div className={className}>
                <Card className={`card_component ${style}`}>
                    <CardImg onError={() => setError(true)} src={imageSrc}/>
                    <CardTitle className="mt-3">
                        <a href={linkTitle}>{title}</a>
                    </CardTitle>
                    <CardFooter>
                        <FontAwesomeIcon icon={faCalendarAlt} color="#ccc" /> {footer}
                    </CardFooter>
                </Card>
            </div>
        )
    } 
    return null

}

export default CardComponent