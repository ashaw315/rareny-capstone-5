import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import ArtistCard from "../components/ArtistCard";

function Artists({ artists }){

// console.log(artists)

    return (
        <div className="artists-users">
            <Link className="forum-card" to={'/artists'}>
                <h2 className="forum-header-title">Artists.</h2>
            </Link>
            <div className="display-artists">
            {artists?.map((artist) => 
            <div className="artist-card-row">
                <ArtistCard key={artist.id} artist={artist}/>
            </div>)}
            </div>
        </div>
    )
}

export default Artists;