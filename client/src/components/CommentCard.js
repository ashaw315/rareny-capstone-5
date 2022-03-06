import React, { useState } from "react";
import Box from "../styles/Box";
import styled from "styled-components";
import Button from '@mui/material/Button';

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Post = styled.article`
  margin-bottom: 24px;
`;

function CommentCard({ subforumData, forumPosts, post }){
    const [isToggle, setIsToggle] = useState(true)

    function handleToggle() {
        setIsToggle((isToggle) => !isToggle)
      }

    function getCommentUser(id) {
        return subforumData.comments.find((comment) => comment.id === id).user
    }

    return (
        <div>
            <Button className="forum-post-button" sx={{ color: "black", border: "2px black solid" }} onClick={handleToggle}>{isToggle ? "Show Comments +" : "Hide Comments -"}</Button>
            {isToggle ? 
            null : 
            <Wrapper>
                {post.comments.map((comment) => 
                <Post key={comment.id}>
                    <Box>
                        <p>By <strong>{getCommentUser(comment.id)}</strong></p>
                        <p>{comment.body}</p>
                    </Box>
                </Post>
                )}           
            </Wrapper>
            }
        </div>
    )
}

export default CommentCard;