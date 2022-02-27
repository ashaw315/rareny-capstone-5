import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const boroughs = ['Manhattan', 'Brooklyn', 'Bronx', 'Queens', 'Staten Island']


function ListingsForm({ listings, setListings, user }){
const [title, setTitle] = useState('')
const [neighborhood, setNeighborhood] = useState('')
const [nycBorough, setNycBorough] = useState('')
const [price, setPrice] = useState(0)
const [sqFootage, setSqFootage] = useState(0)
const [email, setEmail] = useState('')
const [description, setDescription] = useState('')
const [image1, setImage1] = useState('')
const [image2, setImage2] = useState('')
const [image3, setImage3] = useState('')
const [image4, setImage4] = useState('')
const [image5, setImage5] = useState('')
const navigate = useNavigate();

const [errors, setErrors] = useState([])

const handleImage1Change = e => {
    e.persist();
    setImage1(e.target.files[0]);
  };
  
const handleImage2Change = e => {
    e.persist();
    setImage2(e.target.files[0]);
  };

const handleImage3Change = e => {
    e.persist();
    setImage3(e.target.files[0]);
  };

const handleImage4Change = e => {
    e.persist();
    setImage4(e.target.files[0]);
  };

const handleImage5Change = e => {
    e.persist();
    setImage5(e.target.files[0]);
  };

const handleTitleChange = e => {
    setTitle(e.target.value);
  }; 

const handleNeighborhoodChange = e => {
    setNeighborhood(e.target.value);
  }; 

const handleBoroughChange = e => {
    setNycBorough(e.target.value);
  }; 

const handlePriceChange = e => {
    setPrice(e.target.value);
  };  

const handlesqFootageChange = e => {
    setSqFootage(e.target.value);
  };  

const handleEmailChange = e => {
    setEmail(e.target.value);
  };  

const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };  
  
function handleSubmit(e) {
    e.preventDefault();
    const listingData = new FormData();
    listingData.append('user_id', user.id)
    listingData.append('image1', image1)
    listingData.append('image2', image2)
    listingData.append('image3', image3)
    listingData.append('image4', image4)
    listingData.append('image5', image5)
    listingData.append('title', title)
    listingData.append('price', price)
    listingData.append('sq_footage', sqFootage)
    listingData.append('email', email)
    listingData.append('description', description)
    listingData.append('neighborhood', neighborhood)
    listingData.append('nyc_borough', nycBorough)

    fetch('/listings', {
        method: "POST",
        body: listingData,
    })
    .then ((r) => {
        if (r.ok) {
            r.json().then((data) => setListings([data,...listings]))
            .then(navigate('/listings'))
        } else {
            r.json().then((err) => setErrors(err.errors))
        }
    })
};

    return (
        <div>
        <p>This is Listings Form</p>
        <form onSubmit={handleSubmit}>

            <input 
            type="file" 
            name="image1" 
            onChange={handleImage1Change}
            required
            />

            <input 
            type="file" 
            name="image2" 
            onChange={handleImage2Change}
            required
            />

            <input 
            type="file" 
            name="image3" 
            onChange={handleImage3Change}
            required
            />

            <input 
            type="file" 
            name="image4" 
            onChange={handleImage4Change}
            required
            />

            <input 
            type="file" 
            name="image5" 
            onChange={handleImage5Change}
            required
            />
            
            <label>Title</label>
            <input
             id="title"
             name="title"
             value={title}
             autoComplete="off"
             type="text"
             onChange={handleTitleChange} 
             />

            <label>Neighborhood</label>
            <input
             id="neighborhood"
             name="neighborhood"
             value={neighborhood}
             autoComplete="off"
             type="text"
             onChange={handleNeighborhoodChange} 
             />

            <label>Borough</label>
            <select name="nyc_borough" value={nycBorough} onChange={handleBoroughChange}>
                <option>Select Listing</option>
                    {boroughs.map(b => 
                        <option value = {b}>{b}</option> )}
            </select>

            <label>Rent (by Month)</label>
            <input
            id="price"
            name="price"
            value={price}
            autoComplete="off"
            type="text"
            onChange={handlePriceChange}
            />

            <label>Sq. Footage</label>
            <input
            type="text"
            name="sq_footage"
            id="sq_footage"
            value={sqFootage}
            autoComplete="off"
            onChange={handlesqFootageChange}
            />

            <label>Email</label>
            <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="off"
            />

            <label>Description</label>
            <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            autoComplete="off"
            />

            <input type="submit"/>
            {errors.map((e)=><p key={e}>{e}</p>)}
        </form>
    </div>
    )
}
export default ListingsForm;