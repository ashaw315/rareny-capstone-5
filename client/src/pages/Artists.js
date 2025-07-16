import React from "react";
import { Link } from 'react-router-dom';
import ArtistCard from "../components/ArtistCard";

function Artists({ artists }){


    return (
        <div className="artists-users">
            <Link className="forum-card" to={'/artists'}>
                <h2 className="forum-header-title">Artists.</h2>
            </Link>
            <div className="display-artists">
            {artists?.map((artist) => 
            <div key={artist.id} className="artist-card-row">
                <ArtistCard artist={artist}/>
            </div>)}
            </div>
        </div>
    )
}

export default Artists;