import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NycMap from "../components/NycMap";

function Resources({boroughs}){
 
    return (
        <div className="subforums-forum-posts">
             <Link className="forum-card" to={'/resources'}>
                <h2 className="forum-header-title">Resources.</h2>
            </Link>
            <div className="resource-intro-box">
                <div className="resource-intro-container">
                    <p>There are tons of great artist resources throughout</p> 
                    <p>NYC you just need to know where to look.</p>
                    <p>Click on a Borough to get started.</p>
                </div>
            </div>
            <NycMap />
            <div>
                
            </div>
        </div>
    )
}

export default Resources;