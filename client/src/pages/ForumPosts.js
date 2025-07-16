import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Post = styled.article`
  margin-bottom: 24px;
`;

function ForumPosts({ post, user, currentSubforum, currentForumPost, handleDeleteForumPost }){
    const {id} = useParams();

    const [forumPost, setForumPost] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        // auto-login
        fetch(`/forums_posts/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setForumPost(data)
        })
          );
      }, [id]);


      function handleDeleteForumPost() {
        fetch(`/forums_posts/${id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            handleDeleteForumPost(currentForumPost.id);
          }
        });
      }
      
    return (
        <div>
            <p>akfjsdkjfhsjkd</p>
             <Wrapper>
                {user.id == currentForumPost.userid ? <button onClick={handleDeleteForumPost}>DELETE!</button> : null}
                <Post key={currentForumPost.id}>
                <Box>
                    <h2>{currentForumPost.title}</h2>
                    <p>
                    <cite>By {currentForumPost.user}</cite>
                    </p>
                    <ReactMarkdown>{currentForumPost.body}</ReactMarkdown>
                </Box>
                </Post>
            </Wrapper>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>   
    )
}

export default ForumPosts;