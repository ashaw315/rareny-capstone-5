import React, {useState, useEffect} from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import CommentCard from "./CommentCard";
import { Button } from "@mui/material";

function ForumPostCard({ post, user, subforumData, currentSubforum, setCurrentForumPost }){
    // const {id} = useParams();
    const [forumPosts, setForumPosts] = useState([])

    // useEffect(() => {
    //     // auto-login
    //     fetch(`/forum_posts/${id}`)
    //     .then((r) => r.json()
    //     .then((data) => {
    //         setForumPosts(data)
    //     })
    //       );
    //   }, [id]);

      // console.log(subforumData.forum_posts)

    return (
        <div>
             <Wrapper>
             {subforumData.forum_posts?.map((post) =>
                <Post key={post.id}>
                <Box>
                    <h2>{post.title}</h2>
                    <p>
                    <cite>By {post.user}</cite>
                    {/* <img src={post.p}/> */}
                    </p>
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                    <Link className="forum-card" to={`/new_comment`} onClick={() => setCurrentForumPost(post)}>
                    <Button className='newcommentmbutton' sx={{ color: "black", width: "50%", border: "2px black solid" }}>Add a comment</Button>
                    </Link>
                    <CommentCard post={post} subforumData={subforumData} forumPosts={forumPosts}/>
                    <p>this is tezt</p>
                </Box>
                </Post>
                 )}
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