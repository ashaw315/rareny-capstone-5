import React from "react";
import { Link } from 'react-router-dom';
import ListingsCard from "../../components/ListingsCard";
import { Button } from '@mui/material';
import './Listings.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Input from "../../styles/Input";
import styled from "styled-components";

const Wrapper = styled.section`
  position: fixed;
  padding: 30px;
`;

const WrapperChild = styled.div`
padding-bottom: 30px;
`;

const WrapperChild2 = styled.div`
padding-top: 20px;
text-align: center;
`;

function Listings({ listings, setListings, user, handleListingsSearch, setSortBy, filterListings, sortBy, setPriceValue, priceValue, setSqFootValue, sqFootValue }){

const all_listings = filterListings?.map((listing) => {
    return (
        <ListingsCard key={listing.id} listing={listing}/>
    )
})

function handleSortChange(event) {
    setSortBy(event.target.value);
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



    return (
        <div className="listings-main-page">
           <Link className="forum-card" to={'/listings'}>
                <h2 className="forum-header-title">Listings.</h2>
            </Link>
            <Wrapper>
                <WrapperChild>
                    <h2 className="filter-title">Filters.</h2>
                    <Input 
                    className="search-term"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => handleListingsSearch(e.target.value)}/>
                </WrapperChild>
                <WrapperChild>
                    <select className="listings-sort" onChange={handleSortChange}>
                        <option value={"SortBy"} >Sort By</option>
                        <option value={"Title"} >Title</option>
                        <option value={"Price High"} >Price High</option>
                        <option value={"Price Low"} >Price Low</option>
                    </select>
                </WrapperChild>
                <WrapperChild>
                    <h4>Price</h4>
                    <Box className="listing-slider" sx={{ m: 1, width: 490 }}>
                    <Slider sx={{ color: "black"}}
                        getAriaLabel={() => 'Price Range'}
                        value={priceValue}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={0}
                        max={3000}
                    />
                    </Box>
            </WrapperChild>

            <h4>Sq Footage</h4>
            <Box sx={{ m: 1, width: 490 }}>
            <Slider sx={{ color: "black"}}
                getAriaLabel={() => 'Sq Footage Range'}
                value={sqFootValue}
                onChange={handleSqFootRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={3000}
            />
            </Box>
            <WrapperChild2>
            <Link className='listinglink' to='/listingform'>
                <Button className='newlistingbutton' sx={{ color: "black", fontSize: 25, border: "2px black solid", mx: "auto" }}>Add Listing</Button>
            </Link>
                </WrapperChild2>
            </Wrapper>
           
           <ul className="card-row">{all_listings}</ul>
        </div>
    )
}
export default Listings;