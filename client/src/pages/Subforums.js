import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import SubforumDetail from "./SubforumDetail";

function Subforums({ user, currentForum, setCurrentSubforum, setCurrentSubforumTitle }){
    const {id} = useParams();
    const [subforums, setSubforums] = useState([])
    const [forum, setForum] = useState([])
    
    const navigate = useNavigate();

    useEffect(() => {
        // auto-login
        fetch(`/forums/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setSubforums(data.subforums)
            setForum(data)
        })
          );
      }, [id]);

      if(forum.subforums_length > 0 ){
        return (
            <div className="subforums-forum-posts">
                <Link className="forum-card" to={'/forums'}>
                    <h2 className="forum-header-title">Forum.</h2>
                </Link>
                <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate('/forums')}>Go Back</Button>
                <h3 className="subforum-title">{currentForum.name}</h3>
                <div className='postforumlink'>
                    <Link className='postforumlink' to='/new_subforum'>
                        <Button className='newsubforumbutton' sx={{ color: "white", width: "25%", border: "2px black solid" }}>New Subforum</Button>
                    </Link>
                </div>
                {subforums?.map((subforum) => 
                <div className="forums-list">
                    <Link className="forum-card" to={`/subforums/${subforum.id}`} key={subforum.id} onClick={() => setCurrentSubforum(subforum)}>
                        <h2 className="forum-title" onClick={() => setCurrentSubforumTitle(subforum.name)}>{subforum.name}</h2>
                        <h2 className="forum-title-length">► {subforum.forum_posts_length} {subforum.forum_posts_length > 1 ? "subtopics" : "subtopic"}</h2> 
                    </Link>
                </div> )}
            </div> 
        )
      } else {
          return (
            <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate('/forums')}>Go Back</Button>
            <h3 className="subforum-title">{currentForum.name}</h3>
            <div className='postforumlink'>
                <Link className='postforumlink' to='/new_subforum'>
                    <Button className='newsubforumbutton' sx={{ color: "white", width: "25%", border: "2px black solid" }}>New Subforum</Button>
                </Link>
            </div>
            <h2 className="no-subforums">Nothing here yet.</h2>
         </div> 
          )
      }
}

export default Subforums;