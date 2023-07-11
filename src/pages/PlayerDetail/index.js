import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";


export async function loader({ params }) {
    return params;
}


function Player(route) {
    const location = useLocation();
    const { playerId } = useLoaderData();
    const [playerDetail, setplayerDetail] = useState([])
    console.log("User id: ", playerId)

    useEffect(() => {
        const fetchData2 = async () => {
            console.log("User id: ", playerId)
            try {
                const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/mlb/dev/stats/players?id=${playerId}`);
                const jsonObject = JSON.parse(response.data.body)
                setplayerDetail(jsonObject[0])
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData2();
    }, []);
    
    
    return (
        <div>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <h2>Player Summary</h2>
            <div className="d-flex">
                <div style={{ border: "1px solid white", "margin-right": "1rem"}}>
                    <img src={playerDetail.image} alt="photo" />
                </div>
                <div>
                    <h4>{playerDetail['full_name']}</h4>
                    <h7>Born: {playerDetail.birth_date}</h7>
                    <br></br>
                    <h7>Height: {playerDetail.height}</h7>
                    <br></br>
                    <h7>Weight: {playerDetail.weight}</h7>
                </div>
            </div>
            <br></br>
        </div>
        </div>    
    );

}

export default Player;
