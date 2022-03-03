import React, {useState, useEffect} from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Box from "../styles/Box";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

function ForumPostCard({ post, user, subforumData }){
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
                    <CommentForm post={post} user={user}/>
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