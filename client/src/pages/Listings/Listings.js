import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import ListingsCard from "../../components/ListingsCard";
import { Button } from '@mui/material';
import './Listings.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



function Listings({ listings, setListings, user, handleListingsSearch, setSortBy, filterListings, sortBy }){


const [value, setValue] = useState([0, 2000])

const all_listings = filterListings.map((listing) => {
    return (
        <ListingsCard listing={listing}/>
    )
})

function handleSortChange(event) {
    setSortBy(event.target.value);
    console.log(event.target.value)
  }
  
function valuetext(value) {
    return {value};
  }

const handleRangeChange = (event, newValue) => {
    setValue(newValue);
  };
//   const rangeFilter = listings.filter((list) => { (list.price >= value[0] && list.price <= value[1])
//   || !value.length
// }) 

    return (
        <div>
           <h3>Listings.</h3>
           <input 
           className="search-term"
           type="text"
           placeholder="Search..."
           onChange={(e) => handleListingsSearch(e.target.value)}/>
           <select className="listings-sort" onChange={handleSortChange}>
                <option value={"SortBy"} >Sort By</option>
                <option value={"Title"} >Title</option>
                <option value={"Price High"} >Price High</option>
                <option value={"Price Low"} >Price Low</option>
            </select>
            {/* <Box sx={{ width: 500 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={2000}
            />
            </Box> */}
           
           <ul className="card-row">{all_listings}</ul>
            <Link className='listinglink' to='/listingform'>
                <Button className='newlistingbutton' sx={{ color: "black"}}>Add Listing</Button>
            </Link>
        </div>
    )
}
export default Listings;