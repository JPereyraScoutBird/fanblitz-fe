import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Image from "../../img";

function CardProfileComponent (props) {
    const [error, setError] = useState(false)

    const {
        imageSrc,
        title,
        link,
        footer,
        style = '',
        className,
        body,
        classNameImg
    } = props

    if (error != true) {
        return (
            <Link to={link} className={`${className} card-link shadow mb-5 p-2 bg-white rounded`}>
                <Card className={`card_profile_component ${style}`}>
                    <div>
                        <CardImg className={classNameImg} onError={() => setError(true)} src={error ? Image.PROFILE : imageSrc}/>
                    </div>
                    <div className="w-100">
                        <CardTitle>
                            {title}
                        </CardTitle>
                        <CardBody>
                            {body}
                        </CardBody>
                    </div>
                </Card>
            </Link>
        )
    } 
    return null

}

export default CardProfileComponent