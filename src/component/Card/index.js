import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function CardComponent (props) {
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const {
        imageSrc,
        title,
        linkTitle,
        footer,
        style,
        className,
        body,
        classNameImg,
        imageRedirect=false
    } = props

    if (error != true && imageSrc) {
        return (
            <div className={className}>
                <Card className={`card_component ${style}`}>
                    <CardImg onClick={() => imageRedirect ? navigate(linkTitle) : null} className={error ? "error" : classNameImg} onError={() => setError(true)} src={imageSrc || false}/>
                    <CardTitle className="mt-3">
                        <Link to={linkTitle}>{title}</Link>
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