import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormField from "../styles/FormField";
import Label from "../styles/Label";
import Textarea from "../styles/TextArea";
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
    // const [isToggle, setIsToggle] = useState(true)
    const [forumPost, setForumPost] = useState(null)
    const navigate = useNavigate();

    // function handleToggle() {
    //     setIsToggle((isToggle) => !isToggle)
    //   }

    useEffect(() => {
        // auto-login
        fetch(`/forums_posts/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setForumPost(data)
        })
          );
      }, [id]);

      console.log(currentSubforum)

      function handleDeleteForumPost() {
        fetch(`/forums_posts/${id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            handleDeleteForumPost(currentForumPost.id);
          }
        });
      }



    // function handleDelete(id) {
    //     const config = {
    //       method: 'DELETE',
    //     }
    //     fetch(`/forums_posts/${id}`, config)
    //     .then(() => navigate('/'));
    //   };
      
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
                    {/* <img src={post.p}/> */}
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