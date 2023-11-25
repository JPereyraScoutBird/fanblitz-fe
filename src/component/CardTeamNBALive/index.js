import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col, Row } from "reactstrap";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Image from '../../img';
import { getDateString } from "../../utils";

function CardTeamLiveComponent (props) {
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const {
        imageSrc,
        title,
        home,
        away,
        homeImg,
        awayImg,
        home_abbr,
        away_abbr,
        home_score,
        away_score,
        quarter_1_home,
        quarter_1_away,
        quarter_2_home,
        quarter_2_away,
        quarter_3_home,
        quarter_3_away,
        quarter_4_home,
        quarter_4_away,
        link,
        link2,
        linkBox,
        footer,
        status,
        current_quarter,
        current_quarter_seconds_remaining,
        style = '',
        className,
        body,
        classNameImg,
        // home_pitcher,
        // home_pitcher_image,
        // home_pitcher_link,
        // away_pitcher,
        // away_pitcher_image,
        // away_pitcher_link,
        // home_pitcher_era,
        // home_pitcher_wins,
        // home_pitcher_loss,
        // away_pitcher_era,
        // away_pitcher_wins,
        // away_pitcher_loss,
        date,
        // pitcher_live_name,
        // pitcher_live_id,
        // pitcher_live_image,
        // pitcher_live_link,
        // hitter_live_name,
        // hitter_live_id,
        // hitter_live_image,
        // hitter_live_link
    } = props

    // const renderPlayerStats = () =>{
    //     if (status == "LIVE" ){
    //         // console.log("adsad")
    //         return (
    //         <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-md-center align-items-start mt-2 mb-2">
    //             <div className="d-flex flex-grow-1 mb-2" style={{marginLeft: "5px"}}>
    //                 <CardImg className="player_img" onError={() => setError(true)} src={pitcher_live_image || Image.PROFILE}/>
    //                 <div style={{marginLeft: "5px"}}>
    //                     <p style={{fontWeight: "bold", marginBottom: "0px"}}>{pitcher_live_name || 'Unknown'}</p>
    //                     <p style={{color: "#a0a0a0", fontWeight: "bold"}}>Pitching</p>
    //                 </div>
    //             </div>
    //             <div className="d-flex flex-grow-1 mb-2" style={{marginLeft: "5px"}}>
    //                 <CardImg className="player_img" onError={() => setError(true)} src={hitter_live_image || Image.PROFILE}/>
    //                 <div style={{marginLeft: "5px"}}>
    //                     <p style={{fontWeight: "bold", marginBottom: "0px"}}>{hitter_live_name || 'Unknown'}</p>
    //                     <p style={{color: "#a0a0a0", fontWeight: "bold"}}>At Bat</p>
    //                 </div>
    //             </div>
    //         </div>
    //         )
    //     }
    //     return (
    //         <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-md-center align-items-start mt-2 mb-2">
    //             <div className="d-flex flex-grow-1 mb-2" style={{marginLeft: "5px"}}>
    //                 <CardImg className="player_img" onError={() => setError(true)} src={home_pitcher_image || Image.PROFILE}/>
    //                 <div style={{marginLeft: "5px"}}>
    //                     <p style={{fontWeight: "bold", marginBottom: "0px"}}>{home_pitcher || 'Unknown'}</p>
    //                     <p style={{color: "#a0a0a0", fontWeight: "bold"}}> {home_pitcher_wins || '0'}-{home_pitcher_loss || '0'} | {home_pitcher_era || 0}ERA</p>
    //                 </div>
    //             </div>
    //             <div className="d-flex flex-grow-1 mb-2" style={{marginLeft: "5px"}}>
    //                 <CardImg className="player_img" onError={() => setError(true)} src={away_pitcher_image || Image.PROFILE}/>
    //                 <div style={{marginLeft: "5px"}}>
    //                     <p style={{fontWeight: "bold", marginBottom: "0px"}}>{away_pitcher || 'Unknown'}</p>
    //                     <p style={{color: "#a0a0a0", fontWeight: "bold"}}> {away_pitcher_wins || '0'}-{away_pitcher_loss || '0'} | {away_pitcher_era || 0}ERA</p>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }


    // if (error != true) {
        // console.log("status: ", status)
        return (
            // <Link to={link} className={`${className} card-link shadow mb-5 p-2`}>
                <Card className={`card_team_component_live shadow mb-5 rounded ${style}`}>
                <div className="d-flex justify-content-between" style={{borderBottom: "1px solid #ccc", width: "100%"}}>
                    <p style={{textAlign: 'center', fontWeight: "bold", color: status == "LIVE" ? "red" : "#000"}}>{status == 'COMPLETED_PENDING_REVIEW' ? 'COMPLETED' : status != 'COMPLETED' && status != 'LIVE' ? getDateString(date) : status}</p>
                    <div className="containergame">
                        {status == "LIVE" ? <><p>{current_quarter != 0 ? (<><b>Q</b> {current_quarter}</>) : ''}</p> - <p>{current_quarter_seconds_remaining != 0 ? (<>{current_quarter_seconds_remaining}</>) : ''}</p> </>: null}
                    </div>
                </div>
                <CardTitle className="mt-2">
                    <div><p style={{fontWeight: "bold"}}>{footer}</p></div>
                </CardTitle>
                 <CardBody className="w-100">
                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="w-100 d-flex justify-content-end align-items-end">
                            <div><span className="mr-4">1</span><span className="mr-4">2</span><span className="mr-4">3</span><span className="mr-4">4</span><span className="mr-4">E</span></div>  
                        </div>
                        <div className="w-100 team-img d-flex flex-row justify-content-start align-items-center">
                            <div className="w-100 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div style={{width: "60px", display: "flex", justifyContent: "center"}}>
                                        <CardImg className={classNameImg} onError={() => setError(true)} src={awayImg}/>
                                    </div>
                                    <p className="ml-2 text-center team-name">{away}</p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div><span className="mr-4">{quarter_1_away}</span><span className="mr-4">{quarter_2_away}</span><span className="mr-4">{quarter_3_away}</span><span className="mr-4">{quarter_4_away}</span><span className="mr-4">{away_score}</span></div>  
                                </div>
                            </div>
                        </div>
                        <div className="w-100 team-img d-flex flex-row justify-content-start align-items-center">
                            <div className="w-100 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div style={{width: "60px", display: "flex", justifyContent: "center"}}>
                                        <CardImg className={classNameImg} onError={() => setError(true)} src={homeImg}/>
                                    </div>
                                    <p className="ml-2 text-center team-name">{home}</p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div><span className="mr-4">{quarter_1_home}</span><span className="mr-4">{quarter_2_home}</span><span className="mr-4">{quarter_3_home}</span><span className="mr-4">{quarter_4_home}</span><span className="mr-4">{home_score}</span></div>  
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </CardBody>
                <CardFooter className="w-100">
                    {/* {renderPlayerStats()} */}
                    </CardFooter>
                    <div style={{backgroundColor: "#000"}} className="w-100 d-flex justify-content-between">
                        <Button  onClick={() => navigate(link)} color="link" style={{textDecoration:'none', color: "#fff"}}>Forecast</Button>
                        <Button  onClick={() => navigate(linkBox)} color="link" style={{textDecoration:'none', color: "#fff"}}>Box</Button>
                        <Button  onClick={() => navigate(link2)} color="link" style={{textDecoration:'none', color: "#fff"}}>Play By Play</Button>
                        <Button  onClick={() => navigate()} color="link" style={{textDecoration:'none', color: "#fff"}}>Bets</Button>
                    </div>
                </Card>
            // </Link>
        )
}

export default CardTeamLiveComponent