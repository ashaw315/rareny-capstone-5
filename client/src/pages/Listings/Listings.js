import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchListings, setSearch, setSortBy, setPriceValue, setSqFootValue } from '../../store/slices/listingsSlice';
import ListingsCard from "../../components/ListingsCard";
import { Button, Input } from '../../components/ui';
import './Listings.css';
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

function Listings(){
    const dispatch = useAppDispatch();
    const { 
        filteredItems: filterListings, 
        loading, 
        error, 
        search, 
        sortBy, 
        priceValue, 
        sqFootValue 
    } = useAppSelector((state) => state.listings);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    const all_listings = filterListings?.map((listing) => {
        return (
            <ListingsCard key={listing.id} listing={listing}/>
        )
    })

    function handleSortChange(event) {
        dispatch(setSortBy(event.target.value));
    }
    
    function handleListingsSearch(value) {
        dispatch(setSearch(value));
    }

    function handlePriceRangeChange(e) {
        const newMaxPrice = Number(e.target.value);
        dispatch(setPriceValue([0, newMaxPrice]));
    }

    function handleSqFootRangeChange(e) {
        const newMaxSqFt = Number(e.target.value);
        dispatch(setSqFootValue([0, newMaxSqFt]));
    }

    if (loading) {
        return (
            <div className="listings-main-page">
                <Link className="forum-card" to={'/listings'}>
                    <h2 className="forum-header-title">Listings.</h2>
                </Link>
                <div className="display-listings">
                    <p>Loading listings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="listings-main-page">
                <Link className="forum-card" to={'/listings'}>
                    <h2 className="forum-header-title">Listings.</h2>
                </Link>
                <div className="display-listings">
                    <p>Error loading listings: {error}</p>
                </div>
            </div>
        );
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
                    value={search}
                    onChange={(e) => handleListingsSearch(e.target.value)}/>
                </WrapperChild>
                <WrapperChild>
                    <select className="listings-sort" value={sortBy} onChange={handleSortChange}>
                        <option value={"Sort By"} >Sort By</option>
                        <option value={"Title"} >Title</option>
                        <option value={"Price High"} >Price High</option>
                        <option value={"Price Low"} >Price Low</option>
                        <option value={"Sq Ft High"} >Sq Ft High</option>
                        <option value={"Sq Ft Low"} >Sq Ft Low</option>
                    </select>
                </WrapperChild>
                <WrapperChild>
                    <Input
                        label="Max Price"
                        type="range"
                        min="0"
                        max="10000"
                        value={Array.isArray(priceValue) ? priceValue[1] : priceValue}
                        onChange={handlePriceRangeChange}
                    />
                    <div>Price Range: $0 - ${Array.isArray(priceValue) ? priceValue[1] : priceValue}</div>
            </WrapperChild>

            <WrapperChild>
                    <Input
                        label="Max Square Footage"
                        type="range"
                        min="0"
                        max="10000"
                        value={Array.isArray(sqFootValue) ? sqFootValue[1] : sqFootValue}
                        onChange={handleSqFootRangeChange}
                    />
                    <div>Sq Footage: 0 - {Array.isArray(sqFootValue) ? sqFootValue[1] : sqFootValue} sqft</div>
            </WrapperChild>
            <WrapperChild2>
            <Link className='listinglink' to='/listingform'>
                <Button variant="primary" size="lg">Add Listing</Button>
            </Link>
                </WrapperChild2>
            </Wrapper>
           
           <ul className="card-row">{all_listings}</ul>
        </div>
    )
}
export default Listings;