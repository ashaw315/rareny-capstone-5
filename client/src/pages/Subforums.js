import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import SubforumDetail from "./SubforumDetail";

function Subforums({ user, currentForum }){
    // const {id} = useParams();
    const [subforums, setSubforums] = useState([])
  

    console.log(currentForum)

    useEffect(() => {
        fetch("/subforums")
            .then((r) => r.json()
                .then((data) => setSubforums(data))
            );
    }, []);

    

    return (
        <div>
            <Link className='subforumlink' to='/new_subforum'>
                <Button className='newsubforumbutton' sx={{ color: "black", width: "50%", border: "2px black solid" }}>New Subforum</Button>
            </Link>
            {subforums?.map((subforum) => <SubforumDetail key={subforum.id} subforum={subforum} user={user}/> )}
        </div>
    )
}

export default Subforums;