import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthStatus } from './store/slices/authSlice';
import { fetchListings } from './store/slices/listingsSlice';
import { fetchUsers, setBoroughs } from './store/slices/userSlice';
import { fetchForums, fetchSubforums } from './store/slices/forumSlice';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeProvider from './theme/ThemeProvider';

// Components
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home'; 
import SignUp from './pages/SignUp'
import Listings from './pages/Listings/Listings';
import Profile from './pages/Profile';
import ListingsForm from './components/ListingsForm';
import ListingsDetail from './pages/Listings/ListingsDetail';
import Forum from './pages/Forum'
import Resources from './pages/Resources';
import ResourcesDetail from './pages/ResourcesDetail';
import Subforums from './pages/Subforums';
import SubforumDetail from './pages/SubforumDetail';
import SubforumForm from './components/SubforumForm';
import ForumPostForm from './components/ForumPostForm';
import UserAccount from './pages/UserAccount';
import CommentForm from './components/CommentForm';
import About from './pages/About';
import Artists from './pages/Artists';
import Contact from './pages/Contact';

function App() {
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Initialize app data on mount
  useEffect(() => {
    // Check if user is authenticated
    dispatch(checkAuthStatus());
    
    // Load initial data
    dispatch(fetchUsers());
    dispatch(fetchForums());
    dispatch(fetchSubforums());
    
    // Load boroughs
    fetch('/boroughs')
      .then((r) => r.json())
      .then((data) => dispatch(setBoroughs(data)))
      .catch((error) => console.error('Failed to fetch boroughs:', error));
      
    // Load listings only if user is authenticated (or adjust based on your API requirements)
    if (isAuthenticated) {
      dispatch(fetchListings());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ThemeProvider>
      <ErrorBoundary fallbackMessage="The application encountered an error. Please refresh the page.">
        <div className="container">
        <ErrorBoundary fallbackMessage="Navigation bar failed to load.">
          <NavBar />
        </ErrorBoundary>
        
        <Routes>
          <Route path='/' element={
            <ErrorBoundary fallbackMessage="Home page failed to load.">
              <Home />
            </ErrorBoundary>
          }/>
          
          <Route path='/signup' element={
            <ErrorBoundary fallbackMessage="Sign up page failed to load.">
              <SignUp />
            </ErrorBoundary>
          }/>
          
          <Route path='/account' element={
            <ErrorBoundary fallbackMessage="User account page failed to load.">
              <UserAccount />
            </ErrorBoundary>
          }/>
          
          <Route path='/profile' element={
            <ErrorBoundary fallbackMessage="Profile page failed to load.">
              <Profile />
            </ErrorBoundary>
          }/>
          
          <Route path='/listings' element={
            <ErrorBoundary fallbackMessage="Listings page failed to load.">
              <Listings />
            </ErrorBoundary>
          }/>
          
          <Route path='/listings/:id' element={
            <ErrorBoundary fallbackMessage="Listing details failed to load.">
              <ListingsDetail />
            </ErrorBoundary>
          }/>
          
          <Route path='/listingform' element={
            <ErrorBoundary fallbackMessage="Listing form failed to load.">
              <ListingsForm />
            </ErrorBoundary>
          }/>
          
          <Route path='/forums' element={
            <ErrorBoundary fallbackMessage="Forums page failed to load.">
              <Forum />
            </ErrorBoundary>
          }/>
          
          <Route path='/forums/:id' element={
            <ErrorBoundary fallbackMessage="Subforums page failed to load.">
              <Subforums />
            </ErrorBoundary>
          }/>
          
          <Route path='/subforums/:id' element={
            <ErrorBoundary fallbackMessage="Subforum details failed to load.">
              <SubforumDetail />
            </ErrorBoundary>
          }/>
          
          <Route path='/new_subforum' element={
            <ErrorBoundary fallbackMessage="Subforum form failed to load.">
              <SubforumForm />
            </ErrorBoundary>
          }/>
          
          <Route path='/new_forum_post' element={
            <ErrorBoundary fallbackMessage="Forum post form failed to load.">
              <ForumPostForm />
            </ErrorBoundary>
          }/>
          
          <Route path='/new_comment' element={
            <ErrorBoundary fallbackMessage="Comment form failed to load.">
              <CommentForm />
            </ErrorBoundary>
          }/>
          
          <Route path='/resources' element={
            <ErrorBoundary fallbackMessage="Resources page failed to load.">
              <Resources />
            </ErrorBoundary>
          }/>
          
          <Route path='/resources/:id' element={
            <ErrorBoundary fallbackMessage="Resource details failed to load.">
              <ResourcesDetail />
            </ErrorBoundary>
          }/>
          
          <Route path='/artists' element={
            <ErrorBoundary fallbackMessage="Artists page failed to load.">
              <Artists />
            </ErrorBoundary>
          }/>
          
          <Route path='/about' element={
            <ErrorBoundary fallbackMessage="About page failed to load.">
              <About />
            </ErrorBoundary>
          }/>
          
          <Route path='/contact' element={
            <ErrorBoundary fallbackMessage="Contact page failed to load.">
              <Contact />
            </ErrorBoundary>
          }/>
        </Routes>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;