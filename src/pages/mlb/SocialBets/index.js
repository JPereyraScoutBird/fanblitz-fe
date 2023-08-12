import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import constant from './constant';
import CustomTable from '../../../component/Table';
import CardComponent from '../../../component/Card';
import { Col, Container, Row } from 'reactstrap';
import { getDate2, getDateString, getTime } from '../../../utils';
import Menu from '../../../container/Menu3';
import Footer from '../../../container/Footer';
import SubMenu from '../../../container/Menu2';
import { getDate, getPaid } from "../../../utils";
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../../routes/constant";
import CardProfileComponent from '../../../component/CardProfile';
import CardTeamComponent from '../../../component/CardTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-regular-svg-icons";
import Image from '../../../img';

function SocialBets() {
  const [bets, setBets] = useState([])
  const [betsFriend, setBetsFriend] = useState([])

  useEffect(() => {
    const fetchData2 = async () => {
        try {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/users/bets?user_id=2`);
            let jsonObject = response.data.body
            let jsonObjectFriend = response.data.data_friend
            jsonObject = jsonObject.length ? jsonObject.map(x => ({...x, "created_date": getDate(x['created_date']), "updated_date": getDate(x['updated_date'])})) : []
            jsonObject = jsonObject.length ? jsonObject.map(x => ({...x, "paid": getPaid(x['paid'])})) : []

            jsonObjectFriend = jsonObjectFriend.length ? jsonObjectFriend.map(x => ({...x, "created_date": getDate(x['created_date']), "updated_date": getDate(x['updated_date'])})) : []
            jsonObjectFriend = jsonObjectFriend.length ? jsonObjectFriend.map(x => ({...x, "paid": getPaid(x['paid'])})) : []

            // console.log(jsonObject)
            setBets(jsonObject)
            setBetsFriend(jsonObjectFriend)
            
        } catch (error) {
            console.error('Error getting data:', error);
        }
    };

    fetchData2()
  }, []);

  return (
    <div id="home">
      <Container>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>My Wagers</h2>
          <CustomTable noRange={true} range={50} header={constant.headerBets} data={bets} loading={bets.length == 0}/>
        </div>
        <br></br>
        <div style={{ backgroundColor: "#fff", marginTop: "2rem" }}>
          <h2>Friend Wagers</h2>
          <CustomTable noRange={true} range={50} header={constant.headerBets} data={betsFriend} loading={betsFriend.length == 0}/>
        </div>
      </Container>    
    </div>    
  );
}

export default SocialBets;
