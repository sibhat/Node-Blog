import React from 'react';
import './topBar.css';

const TopBar = e => {
    return(
        <div className="top-bar">
            <div className="container">
                <div className="container-left">
                    <span>TOPICS</span><span>SEARCH</span>
                </div>
                <div className="container-center">
                    <span>General</span><span>BrownBag</span><span>Random</span><span>Music</span><span>announcment</span>
                </div>
                <div className="container-right">
                    <span>Log in</span>
                </div>
            </div>
        </div>
    )
}
export default TopBar;