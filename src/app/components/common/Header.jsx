import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <header>
      <nav>
        <div id="home-button">
          <Link to="/">Home</Link>
        </div>
        <ul>
          <li>
            <Link to="/plan">Plan</Link>
          </li>
          <li>
            <Link to="/today">Today</Link>
          </li>
          <li>
            <Link to="/now">Now</Link>
          </li>
          <li>
            <Link to="/review">Review</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
