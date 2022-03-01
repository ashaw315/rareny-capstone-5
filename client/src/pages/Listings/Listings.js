import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import ListingsCard from "../../components/ListingsCard";
import { Button } from '@mui/material';
import './Listings.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



function Listings({ listings, setListings, user, handleListingsSearch, setSortBy, filterListings, sortBy, setPriceValue, priceValue, setSqFootValue, sqFootValue }){


// const [value, setValue] = useState([0, 2000])

const all_listings = filterListings?.map((listing) => {
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

function handlePriceRangeChange(e) {
    setPriceValue(e.target.value)
}

function handleSqFootRangeChange(e) {
    setSqFootValue(e.target.value)
}


console.log(priceValue)

    return (
        <div>
           <h2>Listings.</h2>
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
            <h4>Price</h4>
            <Box sx={{ width: 500 }}>
            <Slider
                getAriaLabel={() => 'Price Range'}
                value={priceValue}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={3000}
            />
            </Box>

            <h4>Sq Footage</h4>
            <Box sx={{ width: 500 }}>
            <Slider
                getAriaLabel={() => 'Sq Footage Range'}
                value={sqFootValue}
                onChange={handleSqFootRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={3000}
            />
            </Box>
           
           <ul className="card-row">{all_listings}</ul>
            <Link className='listinglink' to='/listingform'>
                <Button className='newlistingbutton' sx={{ color: "black"}}>Add Listing</Button>
            </Link>
        </div>
    )
}
export default Listings;