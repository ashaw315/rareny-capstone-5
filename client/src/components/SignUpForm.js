import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import Textarea from "../styles/TextArea";
import FormField from "../styles/FormField";
import Label from "../styles/Label";
import { Button } from "@mui/material";



function SignUpForm({ setUser }) {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirmation, setPasswordConfirmation] = useState('')
const [website, setWebsite] = useState('')
const [discipline, setDiscipline] = useState('')
const [bio, setBio] = useState('')
// const [profilePicture, setProfilePicture] = useState('')
const navigate = useNavigate();

const [errors, setErrors] = useState([])

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

function handleSubmit(e) {
    e.preventDefault();
    const userData = new FormData();
    userData.append('username', username)
    userData.append('password', password)
    userData.append('passwordConfirmation', passwordConfirmation)
    userData.append('website', website)
    userData.append('discipline', discipline)
    userData.append('bio', bio)
    // userData.append('profile_picture', profilePicture)
    
    fetch('/signup', {
        method: "POST",
        body: userData,
    })
    .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
          .then(navigate('/'))
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
      })
      fetch('https://api.chatengine.io/users/', {
        method: 'POST',
        headers: {
          'PRIVATE-KEY': '{{4fbd9907-dda4-461e-bf57-83477785aa07}}'
        },
        body: JSON.stringify({
          username: username,
          secret: password,
        }),
      })
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
                <input className='accountbutton' type="submit"/>
                </div>
                {errors.map((e)=><p key={e}>{e}</p>)}
            </form>
        </div>
      </div>
    )
}

export default SignUpForm