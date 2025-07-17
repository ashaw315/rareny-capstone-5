import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui';

function Subforums(){
    const {id} = useParams();
    const [subforums, setSubforums] = useState([])
    const [forum, setForum] = useState([])
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/forums/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setSubforums(data.subforums)
            setForum(data)
        })
        .catch((error) => {
            console.error('Failed to fetch forum:', error);
        });
      }, [id]);

      if(forum.subforums_length > 0 ){
        return (
            <div className="subforums-forum-posts">
                <Link className="forum-card" to={'/forums'}>
                    <h2 className="forum-header-title">Forum.</h2>
                </Link>
                <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate('/forums')}>Go Back</Button>
                <h3 className="subforum-title">{forum.name || 'Loading...'}</h3>
                <div className='postforumlink'>
                    <Link className='postforumlink' to='/new_subforum' state={{ forumId: id }}>
                        <Button className='newsubforumbutton' sx={{ color: "white", width: "25%", border: "2px black solid" }}>New Subforum</Button>
                    </Link>
                </div>
                {subforums?.map((subforum) => 
                <div key={subforum.id} className="forums-list">
                    <Link className="forum-card" to={`/subforums/${subforum.id}`}>
                        <h2 className="forum-title">{subforum.name}</h2>
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
            <h3 className="subforum-title">{forum.name || 'Loading...'}</h3>
            <div className='postforumlink'>
                <Link className='postforumlink' to='/new_subforum' state={{ forumId: id }}>
                    <Button className='newsubforumbutton' sx={{ color: "white", width: "25%", border: "2px black solid" }}>New Subforum</Button>
                </Link>
            </div>
            <h2 className="no-subforums">Nothing here yet.</h2>
         </div> 
          )
      }
}

export default Subforums;