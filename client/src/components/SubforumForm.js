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

function SubforumForm(){
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get forum ID from URL state or extract from referer
    const [forumId, setForumId] = useState(null);
    const [name, setName] = useState('')
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

    
    const [subforums, setSubforums] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        // Get forum ID from location state (passed from link) or from referer URL
        if (location.state?.forumId) {
            setForumId(location.state.forumId);
        } else {
            // Try to extract from document.referrer if available
            const referer = document.referrer;
            const forumMatch = referer.match(/\/forums\/(\d+)/);
            if (forumMatch) {
                setForumId(parseInt(forumMatch[1]));
            }
        }

        fetch("/subforums")
            .then((r) => r.json())
            .then((data) => setSubforums(data))
            .catch((error) => console.error('Failed to fetch subforums:', error));
    }, [location]);


    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate required data
        if (!user?.id) {
            setErrors(['You must be logged in to create a subforum']);
            return;
        }
        
        if (!forumId) {
            setErrors(['Forum ID is missing. Please navigate back to the forum and try again.']);
            return;
        }
        
        fetch("/subforums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "subforum": {
                    name: name,
                    forum_id: forumId,
                },
                "forum_post": {
                        user_id: user.id,
                        title: title,
                        body: instructions,
                }
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setSubforums([data,...subforums]);
                        navigate(`/forums/${forumId}`);
                    });
                  } else {
                      r.json().then((err) => setErrors(err.errors));
                  }
                })
            .catch((error) => {
                console.error('Error creating subforum:', error);
                setErrors(['Failed to create subforum. Please try again.']);
            });
    };

    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(-1)}>Go Back</Button>
            <div className="subforum-form-style">
            <h2 className="subforum-title">New Subforum</h2>
            <Wrapper className="subforum-form-wrapper">
                <WrapperChild>
                    <form onSubmit={handleSubmit}>
                    <FormField>
                        <Label htmlFor="name">Subforum Name</Label>
                        <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </FormField>
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
                    <FormField className="subforum-forum-submit">
                        <Button className="subforum-forum-submit"  sx={{ color: "black", width: "50%", border: "2px black solid" }} type="submit">
                        Submit
                        </Button>
                    </FormField>
                    <FormField>
                        {errors.map((e)=><p key={e}>{e}</p>)}
                    </FormField>
                    </form>
                </WrapperChild>
                <WrapperChild>
                    <h1>{name}</h1>
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

export default SubforumForm;