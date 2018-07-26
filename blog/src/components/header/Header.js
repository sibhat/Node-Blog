import React from 'react';
import './header.css';

const Header = e => {
    return(
        <div className="header">
            <span className="date">March 12, 2018</span>
            <h1>Lambda Blog</h1>
            <span className="temp">98°</span>
        </div>
    )
}
export default Header;