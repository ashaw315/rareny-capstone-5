import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button } from "@mui/material";

function ListingsDetail(){
    const {id} = useParams();
    const [listing, setListing] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`/listings/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setListing(data);
            setUserData(data.user);
        });
    }, [id]);

    return (
       <div>
           <h2>{listing.title}</h2>
            <Carousel className="main-slide">
                <div>
                    <img src={listing.image1} />
                </div>
                <div>
                    <img src={listing.image2} />
                </div>
                <div>
                    <img src={listing.image3} />
                </div>
                <div>
                    <img src={listing.image4} />
                </div>
                <div>
                    <img src={listing.image5} />
                </div>
            </Carousel>
            <ul>
                <p>Added on {listing.created_at}</p>
                <p><strong>Sq. Footage</strong> {listing.sq_footage} sq ft<sup>2</sup></p>
                <p><strong>Location</strong> {listing.neighborhood}, {listing.nyc_borough}</p>
            </ul>
           <p>{listing.description}</p>
           {/* <a href= >{listing.email}</a>
            */}
            <Button onClick={() => window.location = `mailto:${listing.email}`}>Email</Button>
            <p>Posted by {userData.username}</p>
       </div>
    )
}
export default ListingsDetail;