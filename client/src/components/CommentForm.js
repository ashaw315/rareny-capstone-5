import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
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

function CommentForm({ post, user, currentSubforum, currentForumPost }){
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);
    const [comments, setComments] = useState([])

    // const [isToggle, setIsToggle] = useState(true)

    const navigate = useNavigate();

    // function handleToggle() {
    //     setIsToggle((isToggle) => !isToggle)
    //   }

    console.log(currentSubforum)

      useEffect(() => {
        fetch("/comments")
            .then((r) => r.json()
                .then((data) => setComments(data))
            );
    }, []);


      function handleSubmit(e) {
        e.preventDefault();
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    body: body,
                    forum_post_id: currentForumPost.id,
                    user_id: user.id,
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => setComments([data,...comments]))
                    .then(navigate(`/subforums/${currentSubforum.id}`))
                  } else {
                      r.json().then((err) => setErrors(err.errors));
                  }
                })
            };
      
    return (
        <div>
             <Wrapper>
                <Post key={currentForumPost.id}>
                <Box>
                    <h2>{currentForumPost.title}</h2>
                    <p>
                    <cite>By {currentForumPost.user}</cite>
                    {/* <img src={post.p}/> */}
                    </p>
                    <ReactMarkdown>{currentForumPost.body}</ReactMarkdown>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="instructions">Post Text</Label>
                            <Textarea
                            id="instructions"
                            rows="5"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Button sx={{ color: "black", border: 1 }} type="submit">
                            Submit Comment
                            </Button>
                        </FormField>
                        <FormField>
                            {errors?.map((e)=><p key={e}>{e}</p>)}
                        </FormField>
                        </form>
                </Box>
                </Post>
            </Wrapper>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>   
    )
}

export default CommentForm;