import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Home({ user, setUser, logInForm, setLogInForm }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, password
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) =>{ 
                        setUser(user);
                    });
                } else {
                    r.json().then((err) => {
                        setErrors(err.errors);
                    })
                }
            });
    }

    if (user) {
        return (
            <div className='homepagedivloggedin'>
                <div className='homepagecontainerloggedin'>
                    <div className='homepageloggedinleft'>
                        <h2 className='homepageh2loggedin'>Welcome back, {user.username}.</h2>
                        <p className='homepageploggedin'>Publish daily journal entries and add dots to your calendar.</p>
                        <h3 className='homepageh3loggedin'>Ready to start a new entry?</h3>
                        <div className='homepageoptionsdivloggedin'>
                            <Link className='homepagelinkloggedin' to='/newentry'>Write down your thoughts {'>'}</Link>
                        </div>
                        <div className='homepageoptionsdivloggedin'>
                            <Link className='homepagelinkloggedin' to='/account'>Update your account details {'>'}</Link>
                        </div>
                        <div className='homepageoptionsdivloggedin'>
                            <Link className='homepagelinkloggedin' to='/profile'>View your profile {'>'}</Link>
                        </div>
                    </div>
                </div>
                <div className='homepagefooter'>
                    <h3 className='footerheader'>About .DAY</h3>
                    <ul className='footerul'>
                        <div className='footerp'>.DAY is a project concept created by @madisonsorah, who recently kicked off her career as a front-end developer.</div>
                        <div className='footerp'>Created with a clean interface and minimalist design, .DAY is your digital solution to journaling on a daily basis.</div>
                        <div className='footerp2'>Feature updates will continuously be made to .DAY to improve your journaling experience.</div>
                    </ul>
                </div>
            </div>
        )
    } 
        else {
            return (
                <div className='homepagediv'>
                    <div className='homepagecontainersignedout'>
                        <div className='homepagesignedoutleft'>
                            <h2 className='homepageh2signedout'>RARE NY</h2>
                            <p className='homepagepsignedout'>Resources for Artist Everywhere.</p>
                            {/* <button onClick={handleLogInForm} className='homepagebuttonsignedout'>Log In</button><p className='homepagedividersignedout'>|</p><Link className='homepagelinksignedout' to='/signup'>Sign Up</Link> */}
                            <div>
                            <Button sx={{ color: "black" }} onClick={handleOpen}>Login</Button>
                            <Link className='loginlink' to='/signup'>
                                <Button className='loginbutton' sx={{ color: "black"}}>SIGN UP</Button>
                            </Link>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                Welcome back
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <form onSubmit={handleSubmit}>
                                    <span>
                                        <p className='loginp'>Please log in.</p>
                                     </span>
                                    <p className='logintitle'>USERNAME</p>
                                    <div className='logininputdiv'>
                                        <input className='logininput'
                                        type='text'
                                        placeholder='Enter Pen Name_'
                                        autoComplete='off'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <p className='logintitle'>PASSWORD</p>
                                    <div className='logininputdiv'>
                                        <input className='logininput'
                                            type='password'
                                            placeholder='Enter Password_'
                                            autoComplete='off'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                            <Button className='loginbutton' sx={{ color: "black" }}>LOGIN</Button>
                            <Link className='loginlink' to='/signup'>
                                <Button className='loginbutton' sx={{ color: "black" }}>SIGN UP</Button>
                            </Link>
                            {errors.map((e)=><p key={e}>{e}</p>)}
                        </form>
                                </Typography>
                                </Box>
                            </Modal>
                            </div>                       
                        </div>
                    </div>
                        <div className='homepagefooter'>
                            <h3 className='footerheader'>About</h3>
                            <h3  className='footerheader1'>Contact</h3>
                        </div>
                        {/* <div className='homepagefooter'> */}
                            <ul className='footerul'>
                                <div className='footerp'>Rare NY is a conceptual project by adamshaw.</div>
                                <div className='footerp1'>Resources for Artists everywhere looks to offer artists a space to communicate and share resources.</div>
                                <div className='footerp2'>Email us.</div>
                            </ul>
                        {/* </div> */}
                </div>
            )
        }
    }

export default Home;