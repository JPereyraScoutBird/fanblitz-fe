import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Image from "../../img";

function CardProfileComponent (props) {
    const [error, setError] = useState(false)
    const [finalImageURL, setFinalImageURL] = useState(null);

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

    // useEffect(() => {
    //     // const img = new Image();
        
    //     // img.onload = () => {
    //     //     const finalURL = img.src;
    //     //     setFinalImageURL(finalURL);
    //     // };
        
    //     // img.src = imageSrc;
    //     fetch(imageSrc, { method: 'GET' })
    //     .then(response => {
    //         console.log("img", response)
    //         const finalURL = response.url;
            
    //         setFinalImageURL(finalURL)
    //         // fetch(finalURL, { method: 'GET' })
    //         // .then(response2 => {
    //         //     console.log("response2:", response2)
    //         //     setFinalImageURL(response2);
    //         // }).catch(error => {
    //         //     console.error('Error:', error);
    //         // });
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }, [imageSrc]);

    // if (error != true) {
        return (
            <Link to={link} className={`${className} card-link shadow mb-5 p-2 bg-white rounded`}>
                <Card className={`card_profile_component ${style}`}>
                    <div>
                        <CardImg className={classNameImg} onError={() => setError(true)} src="https://img.mlbstatic.com/mlb-photos/image/upload/w_213,d_people:generic:headshot:silo:current.png,q_auto:best,f_auto/v1/people/665489/headshot/67/current"/>
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
    // } 
    // return null

}

export default CardProfileComponent