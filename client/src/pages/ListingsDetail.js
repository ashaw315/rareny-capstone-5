import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'

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
           <p>{listing.description}</p>
           <p>This is the ListingsDetail</p>
           <p>This is the ListingsDetail</p>
           <p>This is the ListingsDetail</p>
       </div>
    )
}
export default ListingsDetail;