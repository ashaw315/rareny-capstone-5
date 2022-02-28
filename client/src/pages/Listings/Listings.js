import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import ListingsCard from "../../components/ListingsCard";
import { Button } from '@mui/material';
import './Listings.css';


function Listings({ listings, setListings, user }){

const all_listings = listings.map((listing) => {
    return (
        <ListingsCard listing={listing}/>
    )
})

    return (
        <div>
           <h3>Listings.</h3>
           <ul className="card-row">{all_listings}</ul>
            <Link className='listinglink' to='/listingform'>
                <Button className='newlistingbutton' sx={{ color: "black"}}>Add Listing</Button>
            </Link>
        </div>
    )
}
export default Listings;