import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import { Button } from '@mui/material';
import ForumPostCard from "../components/ForumPostCard";

function SubforumDetail({ user, currentSubforum }){
    const {id} = useParams();
    const [forumPosts, setForumPosts] = useState([])
    const [subforumData, setSubforumData] = useState([])
    
    // const csf = currentSubforum

    useEffect(() => {
        // auto-login
        fetch(`/subforums/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setSubforumData(data)
            setForumPosts(data.forum_posts)
        })
          );
      }, [id]);

      console.log(forumPosts.id)

    return (
        <div>
            <h3>{subforumData.forum} / {subforumData.name}</h3>
            <Link className='postforumlink' to='/new_forum_post'>
                <Button className='newforumpostbutton' sx={{ color: "black", width: "50%", border: "2px black solid" }}>Add to this discussion.</Button>
            </Link>
            <Wrapper>
            {
            forumPosts?.map((post) => (
                <ForumPostCard key={post.id} post={post}/>
            ))}
            </Wrapper>
      </div>
    );
  }

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Post = styled.article`
  margin-bottom: 24px;
`;

export default SubforumDetail;