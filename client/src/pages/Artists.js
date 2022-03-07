import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import ArtistCard from "../components/ArtistCard";

function Artists({ artists }){

// console.log(artists)

    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/artists'}>
                <h2 className="forum-header-title">Artists.</h2>
            </Link>
            {artists?.map((artist) => 
            <ul className="card-row">
                <ArtistCard key={artist.id} artist={artist}/>
            </ul>)}
        </div>
    )
}

export default Artists;