import React from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import CommentForm from "./CommentForm";

function ForumPostCard({ post }){
    return (
        <div>
             <Wrapper>
                <Post key={post.id}>
                <Box>
                    <h2>{post.title}</h2>
                    <p>
                    <cite>By {post.user}</cite>
                    {/* <img src={post.p}/> */}
                    </p>
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                    <CommentForm post={post}/>
                </Box>
                </Post>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Post = styled.article`
  margin-bottom: 24px;
`;

export default ForumPostCard;