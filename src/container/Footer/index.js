import React, { useState } from 'react';
import './style.css'
import { Link, NavLink } from "react-router-dom";
import { Container } from 'reactstrap';

/**
 * Custom Footer
 * @param {*} args 
 * @returns 
 */

function Footer(args) {
  return (
    <div id="footer">
      <div className="container-footer dark">
      <Container>
        <div className='d-flex justify-content-between'>
          <div>
            <div>
              <p>Smart <strong>Bets, Less</strong> Regrets.</p>
            </div>
            <div>
              <p><strong>Headquarters:</strong><br></br>NYC, NY</p>
            </div>
            <div>
              <strong>Email:</strong> info@fanblitz.com
            </div>
          </div>
          <div>
            <div>
              <p>Subscribe to Our Newsletter to get Important News, <br></br>Amazing Offers & Inside Scoops:</p>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </Container>
      </div>
      <div className='container-footer dark2'>
        <Container>
          <p>Copyrights © 2023 All Rights Reserved by FanBlitz Inc.</p>
          <Link to='/terms' className='link'>Terms of use </Link>
          /
          <Link to="/privacy" className='link'> Privacy Policy</Link>
        </Container>
      </div>
    </div>
  );
}
export default Footer