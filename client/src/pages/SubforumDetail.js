import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import { Button } from '@mui/material';
import ForumPostCard from "../components/ForumPostCard";
import '../App.css'



function SubforumDetail({ user, currentSubforum, setCurrentForumPost, currentForum }){
    const {id} = useParams();
    const [forumPosts, setForumPosts] = useState([])
    const [subforumData, setSubforumData] = useState([])
    const [postComments, setPostComments] = useState([])

    const navigate = useNavigate();
    
    // const csf = currentSubforum

    useEffect(() => {
        // auto-login
        fetch(`/subforums/${id}`)
        .then((r) => r.json()
        .then((data) => {
            setSubforumData(data)
            setForumPosts(data.forum_posts)
            setPostComments(data.comments)
        })
          );
      }, [id]);


      console.log(currentSubforum)

    return (
        <div className="subforums-forum-posts">
            <Button className="go-back-button" sx={{ color: "black", fontSize: 25, border: "2px black solid" }} onClick={() => navigate(`/forums/${currentForum.id}`)}>Go Back</Button>
            <h3 className="subforum-title">{subforumData.forum} / {subforumData.name}</h3>
            <div className='postforumlink'>
              <Link className='postforumlink' to='/new_forum_post'>
                  <Button className='newforumpostbutton' sx={{ color: "white", width: "25%", border: "2px black solid" }}>Add to this discussion.</Button>
              </Link>
            </div>
            {/* <Wrapper> */}
              <ForumPostCard subforumData={subforumData} user={user} currentSubforum={currentSubforum} setCurrentForumPost={setCurrentForumPost}/>
            {/* </Wrapper> */}
            <div className='homepagefooter'>
                            <h3 className='footerheader'>About</h3>
                            <h3  className='footerheader1'>Contact</h3>
                        </div>
                            <ul className='footerul'>
                                <div className='footerp'>Rare NY is a conceptual project by adamshaw.</div>
                                <div className='footerp1'>Resources for Artists Everywhere looks to offer artists a space to communicate and share resources.</div>
                                <div className='footerp2'>Email us.</div>
                            </ul>
                        
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