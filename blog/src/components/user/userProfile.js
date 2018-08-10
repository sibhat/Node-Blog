import React from 'react';
import './users.css';

const UserProfile = ({data}) => {
    return(
        <div className="userProfile">
            <div className="userProfile__name">
                <h3>{data}</h3>
                <div className="userProfile__name__pic">
                    <img src="../../assets/fido.jpg" alt=""/>
                </div>
            </div>
            <div className="userProfile__info">
                <p>Designer, UI</p>
                <p>London, UK</p>
                <p>April 1, 1988</p>
            </div>
        </div>
    )
}
export default UserProfile;