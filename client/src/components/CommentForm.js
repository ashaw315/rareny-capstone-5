import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
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

function CommentForm(){
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
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
                        <input className='logininput'
                        type='textbox'
                        autoComplete='off'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="loginbuttonmodal">
                        <Button className='loginbuttonmodal' type="submit" sx={{ color: "black", border: "2px black solid"}}>LOGIN</Button>
                    </div>
                    <div className="loginerrorsnmodal"> 
                        {errors.map((e)=><p key={e}>{e}</p>)}
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

export default CommentForm;