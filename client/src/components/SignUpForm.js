import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

function SignUpForm({ setUser }) {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirmation, setPasswordConfirmation] = useState('')
const [website, setWebsite] = useState('')
const [discipline, setDiscipline] = useState('')
const [bio, setBio] = useState('')
const [profilePicture, setProfilePicture] = useState('')
const navigate = useNavigate();

const [errors, setErrors] = useState([])

const handleProfilePicChange = e => {
    e.persist();
    setProfilePicture(e.target.files[0]);
  };

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
    userData.append('profile_picture', profilePicture)
    
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
  };


    return(
        <div>
            <p>This is SignUp Form</p>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                 id="username"
                 name="username"
                 value={username}
                 autoComplete="off"
                 type="text"
                 onChange={handleUsernameChange} 
                 />

                <label>Password</label>
                <input
                id="password"
                name="password"
                value={password}
                autoComplete="off"
                type="password"
                onChange={handlePasswordChange}
                />

                <label>Password Confirmation</label>
                <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={handlePasswordConChange}
                autoComplete="off"
                />

                <label>Website</label>
                <input
                type="text"
                id="website"
                value={website}
                onChange={handleWesbiteChange}
                autoComplete="off"
                />

                <label>Discipline</label>
                <input
                type="text"
                id="discipline"
                value={discipline}
                onChange={handleDisciplineChange}
                autoComplete="off"
                />

                <label>Bio</label>
                <input
                type="text"
                id="bio"
                value={bio}
                onChange={handleBioChange}
                autoComplete="off"
                />

                <input 
                type="file" 
                name="image1" 
                onChange={handleProfilePicChange}
                required
                />

                <input type="submit"/>
                {errors.map((e)=><p key={e}>{e}</p>)}
            </form>
        </div>
    )
}

export default SignUpForm