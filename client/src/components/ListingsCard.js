import React from "react";
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function ListingsCard({ listing }){
    return (
       <div className="card-column">
           <Card sx={{ maxWidth: 445, border: "3px black solid"}}>
            <Link className='listinglink' to={`/listings/${listing.id}`}>
            <CardActionArea>
                
                <CardMedia
                component="img"
                height="400"
                image={listing.image1}
                alt="listing image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {listing.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Added on {listing.created_at}
                    </Typography>
                </CardContent>
            </CardActionArea>
            </Link>
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        <strong>Sq. Footage</strong> {listing.sq_footage} sq ft<sup>2</sup>
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        <strong>Location</strong> {listing.neighborhood}, {listing.nyc_borough}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        $ {listing.price} / Month
                    </Typography>
                </CardContent>
            <CardActions>
            {/* <Link className='listinglink' to={`/listings/${listing.id}`}>
                <Button size="small" sx={{ color: "black", border: "2px black solid"}}>See Details</Button>
            </Link> */}
            </CardActions>
        </Card>
       </div>
    )
}
export default ListingsCard;