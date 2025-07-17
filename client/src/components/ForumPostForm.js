import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import FormField from "../styles/FormField";
import Label from "../styles/Label";
import Textarea from "../styles/TextArea";
import Input from "../styles/Input";
import { Button } from './ui';

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

function ForumPostForm(){
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get subforum data from location state
    const [subforumId, setSubforumId] = useState(null);
    const [subforumName, setSubforumName] = useState('');
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState(`Here's how you make a post.
  
#### Oil Paints

- Old Holland
- Holbein
- Gamblin

#### Acrylic Paints

- Golen
- Liqutex
- Guerra

These are **just a few** of my _favorite_ paints.
Tell me what you think in the **comments** or share your own! 
  `);

    const [forumPosts, setForumPosts] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        // Get subforum data from location state
        if (location.state?.subforumId) {
            setSubforumId(location.state.subforumId);
            setSubforumName(location.state.subforumName || '');
        }

        fetch("/forum_posts")
            .then((r) => r.json())
            .then((data) => setForumPosts(data))
            .catch((error) => console.error('Failed to fetch forum posts:', error));
    }, [location]);

    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate required data
        if (!user?.id) {
            setErrors(['You must be logged in to create a forum post']);
            return;
        }
        
        if (!subforumId) {
            setErrors(['Subforum ID is missing. Please navigate back to the subforum and try again.']);
            return;
        }
        
        fetch("/forum_posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    user_id: user.id,
                    title: title,
                    body: instructions,
                    subforum_id: subforumId,
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setForumPosts([data,...forumPosts]);
                        navigate(`/subforums/${subforumId}`);
                    });
                  } else {
                      r.json().then((err) => setErrors(err.errors));
                  }
                })
            .catch((error) => {
                console.error('Error creating forum post:', error);
                setErrors(['Failed to create forum post. Please try again.']);
            });
    };

    return (
        <div className="subforums-forum-posts">
             <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
            <div className="subforum-form-style">
            <h2 className="subforum-title">{subforumName || 'Loading...'} / (New Post)</h2>
            <Wrapper className="subforum-form-wrapper">
                <WrapperChild>
                    <form onSubmit={handleSubmit}>
                    <FormField>
                        <Label htmlFor="Title">Post Title</Label>
                        <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="instructions">Post Text</Label>
                        <Textarea
                        id="instructions"
                        rows="10"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Button color="primary" type="submit">
                        Submit
                        </Button>
                    </FormField>
                    <FormField>
                        {errors?.map((e)=><p key={e}>{e}</p>)}
                    </FormField>
                    </form>
                </WrapperChild>
                <WrapperChild>
                    <p>
                    <h3>{title}</h3>
                    &nbsp;·&nbsp;
                    {user ? <cite>Posted by {user.username}</cite> : <p>" Posted by Username_Here!"</p>}
                    </p>
                    <ReactMarkdown>{instructions}</ReactMarkdown>
                </WrapperChild>
            </Wrapper>
            </div>
        </div>
    )
}

export default ForumPostForm;