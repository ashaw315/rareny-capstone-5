import React from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import CommentCard from "./CommentCard";
import { Button } from "@mui/material";
import '../App.css'

function ForumPostCard({ user, subforumData, currentSubforum, setCurrentForumPost, onDeleteForumPost, forumPosts }){
    
  const {id} = useParams();
  
  const navigate = useNavigate();

    function handleDeleteForumPost(post) {
      fetch(`/forum_posts/${post.id}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          onDeleteForumPost(post);
          navigate(`/subforums/${currentSubforum.id}`)
        }
      });
    }

    return (
        <div className="forum-post-card">
             <Wrapper>
             {subforumData.forum_posts?.map((post) =>
                <Post key={post.id}>
                <Box>
                  <h2 className="forum-post-title">{post.title}</h2>
                    <p>
                      <cite>By {post.user}</cite>
                    </p>
                    <div className='forum-post-card-body'>
                      <ReactMarkdown >{post.body}</ReactMarkdown>
                    </div>
                    <div className="forum-post-link-position">
                    <Link className="forum-comment-card" to={`/new_comment`} onClick={() => setCurrentForumPost(post)}>
                        <Button className='newcommentmbutton' sx={{ color: "black", width: "30%", border: "2px black solid" }}>Add a comment</Button>
                    </Link>
                    {user ? (<div>
                      {user.id == post.userid ? <Button className="post-delete-button" sx={{ color: "red", width: "30%", border: "2px red solid" }} onClick={() => handleDeleteForumPost(post)}>Delete</Button> : null}
                    </div>) : (null) }
                    </div>
                    <CommentCard post={post} subforumData={subforumData} />
                </Box>
                </Post>
                 )}
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.section`
  max-width: 1200px;
  width: 1200px;
  /* margin: 40px */
  margin: 40px auto;
`;

const Post = styled.article`
  margin-bottom: 24px;
  border: 2px solid black;
  border-radius: 6px;
`;

export default ForumPostCard;