import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

function CardForecastComponent (props) {
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

    if (error != true) {
        return (
            <div className={error ? 'error' : className} style={{backgroundImage: `url(${imageSrc})`, position: "relative", backgroundPosition: "top center", backgroundSize: "cover"}}>
                <div className="bg-overlay" style={{}}></div>
                <Card className={`card_component_forecast ${style}`}>
                    <CardImg className={classNameImg} onError={() => setError(true)}/>
                    <CardTitle className="mt-3 text-bold">
                        <a href={linkTitle}><strong>{title}</strong></a>
                    </CardTitle>
                    <CardBody>
                        {body}
                    </CardBody>
                    <CardFooter>
                        <div className="d-flex align-items-center">
                            <div>{footer}</div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    } 
    return null

}

export default CardForecastComponent