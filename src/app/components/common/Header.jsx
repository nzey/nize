import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/plan" activeStyle={{ color: '#faed97' }}>Plan</Link>
          </li>
          <li>
            <Link to="/today" activeStyle={{ color: '#faed97' }}>Today</Link>
          </li>
          <li>
            <Link to="/now" activeStyle={{ color: '#faed97' }}>Now</Link>
          </li>
          <li>
            <Link to="/review" activeStyle={{ color: '#faed97' }}>Review</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
