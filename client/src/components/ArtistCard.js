import React, { useState } from "react";
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
    width: 900,
    height: 800,
    bgcolor: 'background.paper',
    border: '5px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:'scroll',
  };

function ArtistCard({ artist }){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

console.log(artist)

    return (
        <div className="artist-card">
        <Card className='full-card-wrap' sx={{ minWidth: 500, minHeight: 300, border: 3 }}>
        <CardContent >
        </CardContent>
        <div className="card-wrap">
        <CardActions>
            <Button className="button-wrap" sx={{ color: "black", border: 3, mx: "auto", mt: 9, fontSize: 30  }} onClick={handleOpen} >{artist.username}</Button>
        </CardActions>
        </div>
    </Card>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"            
            >
            <Box  className="artist-box" sx={style}>
                <h1 className="artist-modal-header">{artist.username}</h1>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="artist-modal" >
                        <h3 className="artist-discipline">{artist.discipline}</h3>
                                    
                        <p className="artist-bio">{artist.bio}</p>
                        <div className="artist-website">
                            <a  className="website-link" href={artist.website} target="_blank">Website</a>
                        </div>
                    </div>
                </Typography>
            </Box>
        </Modal>
        </div>
    )
}

export default ArtistCard;