import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { Button } from './ui';
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

function CommentForm(){
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    
    // State for forum post data and form
    const [forumPost, setForumPost] = useState(null);
    const [subforumId, setSubforumId] = useState(null);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);
    const [comments, setComments] = useState([]);

      useEffect(() => {
        // Get forum post data from location state
        if (location.state?.forumPostId) {
            setSubforumId(location.state.subforumId);
            
            // Fetch the specific forum post
            fetch(`/forum_posts/${location.state.forumPostId}`)
                .then((r) => r.json())
                .then((data) => setForumPost(data))
                .catch((error) => {
                    console.error('Failed to fetch forum post:', error);
                    setErrors(['Failed to load forum post']);
                });
        } else {
            setErrors(['Forum post information is missing. Please navigate back and try again.']);
        }

        // Fetch all comments
        fetch("/comments")
            .then((r) => r.json())
            .then((data) => setComments(data))
            .catch((error) => console.error('Failed to fetch comments:', error));
    }, [location]);


      function handleSubmit(e) {
        e.preventDefault();
        
        // Validate required data
        if (!user?.id) {
            setErrors(['You must be logged in to create a comment']);
            return;
        }
        
        if (!forumPost?.id) {
            setErrors(['Forum post information is missing']);
            return;
        }
        
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    body: body,
                    forum_post_id: forumPost.id,
                    user_id: user.id,
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setComments([data,...comments]);
                        navigate(`/subforums/${subforumId}`);
                    });
                  } else {
                      r.json().then((err) => setErrors(err.errors));
                  }
                })
            .catch((error) => {
                console.error('Error creating comment:', error);
                setErrors(['Failed to create comment. Please try again.']);
            });
        };
      
    return (
        <div className="subforums-forum-posts">
             <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
            <h2 className="subforum-title">New Comment</h2>
            <div className="subforum-form-style">
             <Wrapper className="subforum-form-wrapper">
                {forumPost ? (
                <Post key={forumPost.id}>
                <Box>
                    <h2>{forumPost.title}</h2>
                    <p>
                    <cite>By {forumPost.user}</cite>
                    </p>
                    <ReactMarkdown>{forumPost.body}</ReactMarkdown>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="instructions">Comment Text</Label>
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
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <p>Loading forum post...</p>
                        {errors.length > 0 && errors.map((e, index) => <p key={index} style={{color: 'red'}}>{e}</p>)}
                    </div>
                )}
            </Wrapper>
            </div>
        </div>   
    )
}

export default CommentForm;