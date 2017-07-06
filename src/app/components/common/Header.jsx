import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <header>
      <nav>
        <div id="home-button">
          <Link to="/" activeStyle={{ color: '#4183c4' }}>Home</Link>
        </div>
        <ul>
          <li>
            <Link to="/plan" activeStyle={{ color: '#4183c4' }}>Plan</Link>
          </li>
          <li>
            <Link to="/today" activeStyle={{ color: '#4183c4' }}>Today</Link>
          </li>
          <li>
            <Link to="/now" activeStyle={{ color: '#4183c4' }}>Now</Link>
          </li>
          <li>
            <Link to="/review" activeStyle={{ color: '#4183c4' }}>Review</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
