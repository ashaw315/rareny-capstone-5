import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import { Button } from '@mui/material';
import ForumPostCard from "../components/ForumPostCard";
import '../App.css'



function SubforumDetail({ user, currentSubforum, setCurrentForumPost, currentForum }){
    const {id} = useParams();
    const [forumPosts, setForumPosts] = useState([])
    const [subforumData, setSubforumData] = useState([])
    const [postComments, setPostComments] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        // auto-login
        fetch(`/subforums/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setSubforumData(data)
            setForumPosts(data.forum_posts)
            setPostComments(data.comments)
        })
          );
      }, [id]);

      function handleDeleteForumPost(deletedForumPost) {
        setSubforumData((subforumData) => {
          return {...subforumData, forum_posts: subforumData.forum_posts.filter((post) => {
            return post.id !== deletedForumPost.id 
          })}
        })
      }

    return (
        <div className="subforums-forum-posts">
           <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(`/forums/${currentForum.id}`)}>Go Back</Button>
            <h3 className="subforum-title">{subforumData.forum} / {subforumData.name}</h3>
            <div className='postforumlink'>
              <Link className='postforumlink' to='/new_forum_post'>
                  <Button className='newforumpostbutton' sx={{ color: "white", width: "25%", border: "2px black solid" }}>Add to this discussion.</Button>
              </Link>
            </div>
              <ForumPostCard subforumData={subforumData} user={user} currentSubforum={currentSubforum} setCurrentForumPost={setCurrentForumPost} forumPosts={forumPosts} onDeleteForumPost={handleDeleteForumPost} />
      </div>
    );
  }



export default SubforumDetail;