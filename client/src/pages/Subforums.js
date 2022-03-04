import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import SubforumDetail from "./SubforumDetail";

function Subforums({ user, currentForum, setCurrentSubforum, setCurrentSubforumTitle }){
    const {id} = useParams();
    const [subforums, setSubforums] = useState([])
    
    const navigate = useNavigate();

    useEffect(() => {
        // auto-login
        fetch(`/forums/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setSubforums(data.subforums)
        })
          );
      }, [id]);

      function handleDelete(id) {
        fetch(`/subforums/${id}`,
            {
                method: "DELETE",
            })
            .then((r) => {
                if (r.ok) {
                    setSubforums((subforums) =>
                    subforums.filter((s) =>
                            s.id !== id)
                    );
                }
            });
    }

    return (
        <div>
            <h3>{currentForum.name}</h3>
            <Button onClick={() => navigate('/forums')}>Go Back</Button>
            <Link className='subforumlink' to='/new_subforum'>
                <Button className='newsubforumbutton' sx={{ color: "black", width: "50%", border: "2px black solid" }}>New Subforum</Button>
            </Link>
            {subforums?.map((subforum) => 
            <div>
                <Link className="forum-card" to={`/subforums/${subforum.id}`} key={subforum.id} onClick={() => setCurrentSubforum(subforum)}>
                    <h2 className="forum-title" onClick={() => setCurrentSubforumTitle(subforum.name)}>{subforum.name}</h2>
                </Link>
                {/* {user.id== subforum.users.id ? <button onClick={() => handleDelete(subforum.id)}>DELETE!</button> : null} */}
            </div> )}
            {/* <SubforumDetail key={subforum.id} subforum={subforum} user={user}/> )} */}
        </div>
    )
}

export default Subforums;