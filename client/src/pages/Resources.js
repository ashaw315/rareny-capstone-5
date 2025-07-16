import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NycMap from "../components/NycMap";
import BoroughNameLinks from "../components/BoroughNameLinks"

function Resources({boroughs, setCurrentBorough}){
 
    return (
        <div className="subforums-forum-posts">
             <Link className="forum-card" to={'/resources'}>
                <h2 className="forum-header-title">Resources.</h2>
            </Link>
            <div className="background-test">
            <div className="resource-intro-box">
                <div className="resource-intro-container">
                    <p>There are tons of great artist resources throughout</p> 
                    <p>NYC you just need to know where to look.</p>
                    <p>Click on a Borough to get started.</p>
                </div>
            </div>
            {boroughs ? boroughs?.map((borough, index) => 
            <div key={borough.id} className={`boroughs-${index}`}>
                <NycMap borough={borough} setCurrentBorough={setCurrentBorough}/>
            </div>): null }
            {/* <div id="hide">SHOW</div> */}
            {/* <NycMap /> */}
            
            <div className="resource-borough-names">
                {boroughs?.map((borough) => 
                <div key={borough.id}>
                    <BoroughNameLinks borough={borough} setCurrentBorough={setCurrentBorough}/>
                    {/* <h3 className="name-button-links" key={borough.id}>{borough.name}</h3> */}
                </div>
                )}
            </div>
            <div className="art-resource-footer">
                <h1 className="art-resource-footer-header">Know a place?</h1>
                <h4>Know a supply shop, fabricator, or other resource? </h4>
                <h4>Give us a shout!We're always on the lookout for new spots doing awesome things.</h4>
                <div className="resource-email-postition">
                    <a className='art-resource-footer-email' href="mailto:info.rareny@gmail.com">Send us a resource!</a> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Resources;