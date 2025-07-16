import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import AritistResourceCard from "../components/ArtistResourceCard";
import { Button } from "@mui/material";

function ResourcesDetail(){
    const {id} = useParams();
    const [borough, setBorough] = useState([])
    const [resources, setResources] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/boroughs/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setBorough(data);
            setResources(data.artist_resources);
        });
    }, [id]);


    return (
        <div className="subforums-forum-posts">
             <Link className="forum-card" to={'/resources'}>
                <h2 className="forum-header-title">Resources.</h2>
            </Link>
            <Button className="go-back-button-listing-form" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
            <h3 className="borough-name-header-detail">{borough.name}</h3>
            <div className="display-resources">
                {resources?.map((resource) => 
                <div key={resource.id}>
                    <AritistResourceCard resource={resource}/>
                </div>)}
            </div>
        </div>
    )
}

export default ResourcesDetail;