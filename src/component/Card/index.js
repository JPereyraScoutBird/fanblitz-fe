import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

function CardComponent (props) {
    const [error, setError] = useState(false)

    const {
        imageSrc,
        title,
        linkTitle,
        footer,
        style,
        className,
        body,
        classNameImg
    } = props

    if (error != true && imageSrc) {
        return (
            <div className={className}>
                <Card className={`card_component ${style}`}>
                    <CardImg className={error ? "error" : classNameImg} onError={() => setError(true)} src={imageSrc || false}/>
                    <CardTitle className="mt-3">
                        <a href={linkTitle}>{title}</a>
                    </CardTitle>
                    <CardBody>
                        {body}
                    </CardBody>
                    <CardFooter>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} color="#ccc" className="icon"/> 
                            <div>{footer}</div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    } 
    return null

}

export default CardComponent