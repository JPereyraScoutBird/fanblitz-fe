import React from 'react';
import { Link } from 'react-router-dom';

const Menu2 = () => {
  return (
    <ul>
      <li>
        <Link to="/">Inicio</Link>
      </li>
      <li>
        <Link to="/News">News</Link>
      </li>
      <li>
        <Link to="/Player">Player</Link>
      </li>
      <li>
        <Link to="/Team">Team</Link>
      </li>
      <li>
        <Link to="/Forecasts">Forecasts</Link>
      </li>
      <li>
        <Link to="/SocialBets">SocialBets</Link>
      </li>
      <li>
        <Link to="/Stats">Stats</Link>
      </li>
      <li>
        <Link to="/Tutorial">Tutorial</Link>
      </li>
    </ul>
  );
};

export default Menu2;