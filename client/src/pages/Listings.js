import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function Listings({ listings, setListings, user }){
    return (
        <div>
           <p>Listings</p>
            <Link className='listinglink' to='/listingform'>
                <Button className='newlistingbutton' sx={{ color: "black"}}>Add Listing</Button>
            </Link>
        </div>
    )
}
export default Listings;