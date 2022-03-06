import React, {useState, useEffect} from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import CommentCard from "./CommentCard";
import { Button } from "@mui/material";
import '../App.css'

function ForumPostCard({ post, user, subforumData, currentSubforum, setCurrentForumPost, onDeleteForumPost, forumPosts }){
    
  const {id} = useParams();
  // const [forumPosts, setForumPosts] = useState([])
  const navigate = useNavigate();

console.log(forumPosts)
console.log(subforumData)

    // function handleDelete(id) {
    //   const config = {
    //     method: 'DELETE',
    //   }
    //   fetch(`/forum_posts/${id}`, config)
    //   .then(() => navigate('/'));
    // };


    function handleDeleteForumPost() {
      fetch(`/subforums/${id}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          onDeleteForumPost(forumPosts);
        }
      });
    }

    return (
        <div className="forum-post-card">
             <Wrapper>
             {subforumData.forum_posts?.map((post) =>
                <Post key={post.id}>
                <Box>
                  {/* <Link className="forum-comment-card" to={`/forum_posts/${post.id}`} onClick={() => setCurrentForumPost(post)}>
                    <h2 className="forum-post-title">{post.title}</h2>
                  </Link> */}
                  <h2 className="forum-post-title">{post.title}</h2>
                    <p>
                      <cite>By {post.user}</cite>
                    </p>
                    <div className='forum-post-card-body'>
                      <ReactMarkdown >{post.body}</ReactMarkdown>
                    </div>
                    <div className="forum-post-link-position">
                    <Link className="forum-comment-card" to={`/new_comment`} onClick={() => setCurrentForumPost(post)}>
                        <Button className='newcommentmbutton' sx={{ color: "black", width: "30%", border: "2px black solid" }}>Add a comment</Button>
                    </Link>
                    {/* {user.id == post.userid ? <button onClick={handleDeleteForumPost}>DELETE!</button> : null} */}
                    </div>
                    <CommentCard post={post} subforumData={subforumData} />
                </Box>
                </Post>
                 )}
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.section`
  max-width: 1200px;
  width: 1200px;
  /* margin: 40px */
  margin: 40px auto;
`;

const Post = styled.article`
  margin-bottom: 24px;
  border: 2px solid black;
  border-radius: 6px;
`;

export default ForumPostCard;