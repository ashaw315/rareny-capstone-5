import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 1200px;
  /* margin: 40px */
  margin-left: 50px;
`;

const Post = styled.article`
  margin-bottom: 24px;
  border: 2px solid black;
  border-radius: 6px;
`;

function ListingsDetail({ user, listings, setListings, onDeleteListing }){
    const {id} = useParams();
    const [listing, setListing] = useState([])
    const [userData, setUserData] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/listings/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setListing(data);
            setUserData(data.user);
        });
    }, [id]);

    console.log(userData)

    function handleDelete() {
        fetch(`/listings/${id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            onDeleteListing(listing)
            // .then(() => navigate('/listings'));
          }
        });
      }

    return (
       <div className="subforums-forum-posts">
           <Link className="forum-card" to={'/listings'}>
                <h2 className="forum-header-title">Listings.</h2>
            </Link>
            <div className="page-style">
            <Button className="go-back-button-listing-form" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
            </div>
            {user ? <div>
                {user.id == userData.id ? <Button className="listing-delete-button" sx={{ color: "red", fontSize: 25, border: "2px red solid", mt: 2 }} onClick={handleDelete}>Delete Listing</Button> : null}
                </div> : null }
            {/* <div>
                 {user.id == userData.id ? <Button className="listing-delete-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={handleDelete}>Delete Listing</Button> : null}
            </div> */}
           <h2 className="listing-title-detail">{listing.title}</h2>
           <cite className="listing-detail-top-posted-by"> Posted by {userData.username}</cite>
           <div className="listing-detail-top-info">
                <h2 className="listing-detail-top-info-left">$ {listing.price} / Month</h2>
           </div>
           <div className="carousel-container">
            <Carousel className="main-slide">
                <div>
                    <img src={listing.image1}  />
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
            </div>
            <Wrapper>
            <ul>
                <p><strong>Added on</strong> {listing.created_at}</p>
                <p><strong>Sq. Footage</strong> {listing.sq_footage} sq ft<sup>2</sup></p>
                <p><strong>Location</strong> {listing.neighborhood}, {listing.nyc_borough}</p>
                <p className="description-listing-detail">{listing.description}</p>
                <Button sx={{ color: "black", fontSize: 25, border: "2px black solid", fontWeight: 550 }} onClick={() => window.location = `mailto:${listing.email}`}>Email</Button>
            </ul>
            </Wrapper>
       </div>
    )
}
export default ListingsDetail;