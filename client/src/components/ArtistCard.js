import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 700,
    bgcolor: 'background.paper',
    border: '5px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ArtistCard({ artist }){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

console.log(artist)

    return (
        <div className="card-column">
        <Card sx={{ maxWidth: 445, border: 2 }}>
        <CardContent>
            <Typography sx={{ fontSize: 30, color: 'black' }} gutterBottom>
            {artist.username}
            </Typography>
            <a href={artist.website} target="_blank">Website: {artist.website}</a>
            <p>Discipline: {artist.discipline}</p>
            <p>Member since: {artist.member_since}</p>
        </CardContent>
        <CardActions>
            <Button sx={{ color: "black", border: 2 }} size="small" onClick={handleOpen} >Learn More</Button>
        </CardActions>
    </Card>
    <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                        
                            >
                                <Box  className="box" sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                Welcome back
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <form className="form" >
                                    <span>
                                        <p className='loginp'>Please log in.</p>
                                     </span>
                                    <p className='logintitle'>Username</p>
                                    <div className='logininputdiv'>
                                        {/* <input className='logininput'
                                        type='text'
                                        autoComplete='off'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        /> */}
                                    </div>
                                    <p className='logintitle'>Password</p>
                                    <div className='logininputdiv1'>
                                        {/* <input className='logininput'
                                            type='password'
                                            autoComplete='off'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        /> */}
                                    </div>
                                    <div className="loginbuttonmodal">
                                        <Button className='loginbuttonmodal' type="submit" sx={{ color: "black", border: "2px black solid"}}>LOGIN</Button>
                                    </div>
                                    <div className="loginbuttonmodal">
                                    </div>
                                <p className="signuplink">Don't have an account?</p>
                            <Link className='loginlink' to='/signup'>
                                <Button className='signupbutton' sx={{ color: "black", width: "50%", border: "2px black solid" }}>SIGN UP</Button>
                            </Link>
                        </form>
                                </Typography>
                                </Box>
                            </Modal>
        </div>
    )
}

export default ArtistCard;