import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Label from "../styles/Label";
import Input from "../styles/Input";
import { Button } from '@mui/material';
import styled from "styled-components";
import Textarea from "../styles/TextArea";
import FormField from "../styles/FormField";

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
  justify-content: center;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

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

const [preview, setPreview] = useState(null)
const [preview2, setPreview2] = useState(null)
const [preview3, setPreview3] = useState(null)
const [preview4, setPreview4] = useState(null)
const [preview5, setPreview5] = useState(null)

//Preview for 1st Listing Image
useEffect(() => {
  if (!image1) {
      setPreview(undefined)
      return
  }
  const objectUrl = URL.createObjectURL(image1)
  setPreview(objectUrl)
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [image1])

//Preview for 2nd Listing Image
useEffect(() => {
  if (!image2) {
      setPreview2(undefined)
      return
  }
  const objectUrl = URL.createObjectURL(image2)
  setPreview2(objectUrl)
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [image2])

//Preview for 3rd Listing Image
useEffect(() => {
  if (!image3) {
      setPreview3(undefined)
      return
  }
  const objectUrl = URL.createObjectURL(image3)
  setPreview3(objectUrl)
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [image3])

//Preview for 4th Listing Image
useEffect(() => {
  if (!image4) {
      setPreview4(undefined)
      return
  }
  const objectUrl = URL.createObjectURL(image4)
  setPreview4(objectUrl)
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [image4])

//Preview for 5th Listing Image
useEffect(() => {
  if (!image5) {
      setPreview5(undefined)
      return
  }
  const objectUrl = URL.createObjectURL(image5)
  setPreview5(objectUrl)
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [image5])

const removeSelectedImage1 = () => {
  setImage1();
};
const removeSelectedImage2 = () => {
  setImage2();
};
const removeSelectedImage3 = () => {
  setImage3();
};
const removeSelectedImage4 = () => {
  setImage4();
};
const removeSelectedImage5 = () => {
  setImage5();
};

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
        <div className="listings-form">
            <Link className="forum-card" to={'/listings'}>
                <h2 className="forum-header-title">Listings.</h2>
            </Link>
            <div className="page-style">
            <Button className="go-back-button-listing-form" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          <Wrapper className="wrapper-extra-css">
          <form onSubmit={handleSubmit}>
            <WrapperChild>
          <div className="image-input">
            <input 
            type="file" 
            name="image1" 
            onChange={handleImage1Change}
            required
            />
            {image1 &&  <img className="image-preview-size" src={preview} /> }
            {image1 ? <Button sx={{ color: "black" }} onClick={removeSelectedImage1} >
              Remove This Image
            </Button> : null}
          </div>
          <div className="image-input">
            <input 
            type="file" 
            name="image2" 
            onChange={handleImage2Change}
            required
            />
            {image2 &&  <img className="image-preview-size" src={preview2} /> }
            {image2 ? <Button sx={{ color: "black" }} onClick={removeSelectedImage2} >
              Remove This Image
            </Button> : null}
          </div>
          <div className="image-input">
            <input 
            type="file" 
            name="image3" 
            onChange={handleImage3Change}
            required
            />
            {image3 &&  <img className="image-preview-size" src={preview3} /> }
            {image3 ? <Button sx={{ color: "black" }} onClick={removeSelectedImage3} >
              Remove This Image
            </Button> : null}
          </div>
          <div className="image-input">
            <input 
            type="file" 
            name="image4" 
            onChange={handleImage4Change}
            required
            />
            {image4 &&  <img className="image-preview-size" src={preview4} /> }
            {image4 ? <Button sx={{ color: "black" }} onClick={removeSelectedImage4} >
              Remove This Image
            </Button> : null}
          </div>
          <div className="image-input">
            <input 
            type="file" 
            name="image5" 
            onChange={handleImage5Change}
            required
            />
            {image5 &&  <img className="image-preview-size" src={preview5} /> }
            {image5 ? <Button sx={{ color: "black" }} onClick={removeSelectedImage5} >
              Remove This Image
            </Button> : null}
          </div>
          </WrapperChild>
          <WrapperChild>
              <Label className="listing-input">Title</Label>
              <Input 
              id="title"
              name="title"
              value={title}
              autoComplete="off"
              type="text"
              onChange={handleTitleChange} 
              />
             
            <Label className="listing-input">Neighborhood</Label>
            <Input className="image-input"
             id="neighborhood"
             name="neighborhood"
             value={neighborhood}
             autoComplete="off"
             type="text"
             onChange={handleNeighborhoodChange} 
             />
            
            <Label className="listing-input">Borough</Label>
            <select name="nyc_borough" value={nycBorough} onChange={handleBoroughChange}>
                <option>Select Borough</option>
                    {boroughs.map(b => 
                        <option value = {b}>{b}</option> )}
            </select>

            <Label className="listing-input">Rent (by Month)</Label>
            <Input
            id="price"
            name="price"
            value={price}
            autoComplete="off"
            type="text"
            onChange={handlePriceChange}
            />

            <Label className="listing-input">Sq. Footage</Label>
            <Input
            type="text"
            name="sq_footage"
            id="sq_footage"
            value={sqFootage}
            autoComplete="off"
            onChange={handlesqFootageChange}
            />

            <label className="listing-label">Email</label>
            <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="off"
            />

            <label className="listing-input-last">Description</label>
            <Textarea 
            type="textarea"
            id="description"
            rows="10"
            value={description}
            onChange={handleDescriptionChange}
            autoComplete="off"
            />

            <input className="listing-submit-button" type="submit"/>
            {errors.map((e)=><p key={e}>{e}</p>)}
            </WrapperChild>
        </form>
        </Wrapper>
    </div>
    )
}
export default ListingsForm;