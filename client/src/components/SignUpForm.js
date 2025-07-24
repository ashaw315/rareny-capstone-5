import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signupUser } from '../store/slices/authSlice';
import Textarea from "../styles/TextArea";
import FormField from "../styles/FormField";
import Label from "../styles/Label";
import { Button } from './ui';



function SignUpForm() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirmation, setPasswordConfirmation] = useState('')
const [website, setWebsite] = useState('')
const [discipline, setDiscipline] = useState('')
const [bio, setBio] = useState('')
// const [profilePicture, setProfilePicture] = useState('')
const navigate = useNavigate();
const dispatch = useAppDispatch();

const { loading, error } = useAppSelector((state) => state.auth);
const [localErrors, setLocalErrors] = useState([])

// const handleProfilePicChange = e => {
//     e.persist();
//     setProfilePicture(e.target.files[0]);
//   };

const handleUsernameChange = e => {
    setUsername(e.target.value);
  };  

const handlePasswordChange = e => {
    setPassword(e.target.value);
  };  

const handlePasswordConChange = e => {
    setPasswordConfirmation(e.target.value);
  };  

const handleWesbiteChange = e => {
    setWebsite(e.target.value);
  };  

const handleDisciplineChange = e => {
    setDiscipline(e.target.value);
  };  

const handleBioChange = e => {
    setBio(e.target.value);
  };  

async function handleSubmit(e) {
    e.preventDefault();
    setLocalErrors([]);
    
    const userData = new FormData();
    userData.append('username', username)
    userData.append('password', password)
    userData.append('password_confirmation', passwordConfirmation)
    userData.append('website', website)
    userData.append('discipline', discipline)
    userData.append('bio', bio)
    
    try {
      const result = await dispatch(signupUser(userData));
      
      if (signupUser.fulfilled.match(result)) {
        // Success - navigate to home
        navigate('/');
        
        // Optional: Also create chat engine user
        try {
          await fetch('https://api.chatengine.io/users/', {
            method: 'POST',
            headers: {
              'PRIVATE-KEY': '{{4fbd9907-dda4-461e-bf57-83477785aa07}}'
            },
            body: JSON.stringify({
              username: username,
              secret: password,
            }),
          });
        } catch (chatError) {
          // This is expected to fail with placeholder API key - using Rails messaging instead
        }
      } else {
        // Handle signup errors
        if (Array.isArray(result.payload)) {
          setLocalErrors(result.payload);
        } else {
          setLocalErrors([result.payload || 'Signup failed']);
        }
      }
    } catch (err) {
      setLocalErrors(['An unexpected error occurred']);
    }
  };


    return(
      <div className="subforums-forum-posts">
      <Link className="forum-card" to={'/signup'}>
          <h2 className="forum-header-title">Sign Up.</h2>
      </Link>
      <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
        <div className='signupformcontainer'>
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label>Username</Label>
                <input className="signupinput"
                 id="username"
                 name="username"
                 value={username}
                 autoComplete="off"
                 type="text"
                 onChange={handleUsernameChange} 
                 />
                 </FormField>
                 <FormField>
                <Label>Password</Label>
                <input  className="signupinput"
                id="password"
                name="password"
                value={password}
                autoComplete="off"
                type="password"
                onChange={handlePasswordChange}
                />
                </FormField>
                <FormField>
                <Label>Password Confirmation</Label>
                <input className="signupinput"
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={handlePasswordConChange}
                autoComplete="off"
                />
                </FormField>
                <FormField>
                <Label>Website</Label>
                <input className="signupinput"
                type="text"
                id="website"
                value={website}
                onChange={handleWesbiteChange}
                autoComplete="off"
                />
                </FormField>
                <FormField>
                <Label>Discipline</Label>
                <input className="signupinput"
                type="text"
                id="discipline"
                value={discipline}
                onChange={handleDisciplineChange}
                autoComplete="off"
                />
                </FormField>
                <FormField>
                <Label>Bio / Artist statment</Label>
                <Textarea className="signupinput"
                type="textarea"
                id="bio"
                rows="10"
                value={bio}
                onChange={handleBioChange}
                autoComplete="off"
                />
                </FormField>
                {/* <input 
                type="file" 
                name="image1" 
                onChange={handleProfilePicChange}
                required
                /> */}
                <div className='accountbuttoncenter'>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
                </div>
                {localErrors.map((e, index)=><p key={index} style={{color: 'red'}}>{e}</p>)}
                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
      </div>
    )
}

export default SignUpForm