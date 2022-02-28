import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploadForm from './ImageUploadForm';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home'; 
import SignUp from './pages/SignUp'
import Listings from './pages/Listings/Listings';
import Profile from './pages/Profile';
import ListingsForm from './components/ListingsForm';
import ListingsDetail from './pages/Listings/ListingsDetail';

function App() {
  const [user, setUser] = useState(null);
  const [logInForm, setLogInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState("Sort By");
  const [priceValue, setPriceValue] = useState([0, 3000])
  const [sqFootValue, setSqFootValue] = useState([0, 3000])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch('/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  useEffect(() => {
    fetch('/listings')
    .then((r) => {
      if (r.ok) {
        r.json().then((listings) => setListings(listings))
      }
    })
  }, []);

const filterListings = listings
    .filter((list) => {
      if(search === "") {
        return true;
      } return list.title.toLowerCase().includes(search.toLowerCase()) 
    })
    .sort((list1, list2) => {
      if (sortBy === "Sort By") {
        return null;
      } else if (sortBy === "Price High") {
        return list2.price.localeCompare(list1.price);
      } else if (sortBy === "Price Low") {
        return list1.price - list2.price
      } else if (sortBy === "Title") {
        return list1.title.localeCompare(list2.title);
      }
    })
    .filter((list) => { 
      return (list.price >= priceValue[0] && list.price <= priceValue[1])
    })
    .filter((list) => { 
      return (list.sq_footage >= sqFootValue[0] && list.sq_footage <= sqFootValue[1])
    })  

    console.log(filterListings)

  function handleListingsSearch (searchListings) {
      setSearch(searchListings);
  }

  console.log(user)

  return (
    <div>
      <NavBar user={user} setUser={setUser} logInForm={logInForm} setLogInForm={setLogInForm} errorMessage={errorMessage} setErrorMessage={setErrorMessage} handleOpen={handleOpen} handleClose={handleClose}/>
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser} logInForm={logInForm} setLogInForm={setLogInForm}/>}/>
          <Route path='/signup' element={ <SignUp setUser={setUser} /> }/>
          <Route path='/listings' element={<Listings listings={listings} setListings={setListings} user={user} handleListingsSearch={handleListingsSearch} setSortBy={setSortBy} sortBy={sortBy} filterListings={filterListings} setPriceValue={setPriceValue} priceValue={priceValue} sqFootValue={sqFootValue} setSqFootValue={setSqFootValue} />}/>
          <Route path='/listings/:id' element={<ListingsDetail listings={listings} setListings={setListings} user={user}/>}/>
          <Route path='/listingform' element={<ListingsForm listings={listings} setListings={setListings} user={user}/>}/>
        </Routes>
        <ImageUploadForm />
    </div>
  )
}

export default App;
