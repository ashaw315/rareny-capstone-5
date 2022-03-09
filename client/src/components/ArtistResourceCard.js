import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import artresource from '../assets/artresource.png'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    height: 900,
    bgcolor: 'background.paper',
    border: '5px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:'scroll',
  };


function AritistResourceCard({ listing, resource }){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }

      console.log(resource)

    return (
       <div className="resource-card">
           <Card sx={{ maxWidth: 445, border: "3px black solid"}}>
            <CardActionArea onClick={handleOpen} >
                <CardMedia className="resource-card-image"
                component="img"
                height="450"
                image={artresource}
                alt="listing image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {resource.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    {resource.location}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"            
            >
            <Box  className="artist-resource-box" sx={style}>
                <div className="art-resource-modal-container">
                    <img className="art-resource-modal-image" src={artresource}/>
                    <h1 className="artist-resource-modal-header">{resource.name}</h1>
                </div>

                <div className="art-resource-modal-add-phone">
                {resource.addresses.map((add) => 
                <div className="art-resource-modal-address">
                    <h3>{add.street}</h3>
                    <h3>{add.city}, {add.state}</h3>
                    <h3>{add.zip}</h3>
                </div>)}
                <div className="art-resource-modal-phone">
                    <h3>{formatPhoneNumber(resource.phone)}</h3>
                </div>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="artist-modal" >
                        <h4 className="art-resource-description">{resource.description}</h4>
                        <div className="artist-website">
                            <a className="website-link" href={resource.website} target="_blank">Website</a>
                        </div>
                    </div>
                </Typography>
            </Box>
        </Modal>
       </div>
    )
}
export default AritistResourceCard;