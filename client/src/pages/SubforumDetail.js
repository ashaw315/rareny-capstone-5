import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import styled from 'styled-components';
import { Button } from "../components/ui";
import ForumPostCard from "../components/ForumPostCard";
import '../App.css'

const SubforumContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 0;
`;

const SubforumHeader = styled.div`
  background: linear-gradient(135deg, #000 0%, #343a40 100%);
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0;
    margin-bottom: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ForumBreadcrumb = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
  
  span {
    margin: 0 0.5rem;
    opacity: 0.6;
  }
`;

const SubforumTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;


const ActionBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const BackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #000;
  border: 2px solid #000;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #000;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:before {
    content: '←';
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const NewPostButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #000 0%, #343a40 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:before {
    content: '+';
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ContentArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.5rem;
    color: #6c757d;
    margin-bottom: 1rem;
  }
  
  p {
    color: #6c757d;
    margin-bottom: 2rem;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

function SubforumDetail(){
    const { user } = useAppSelector((state) => state.auth);
    const {id} = useParams();
    const [forumPosts, setForumPosts] = useState([])
    const [subforumData, setSubforumData] = useState([])
    // const [postComments, setPostComments] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/subforums/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setSubforumData(data)
            setForumPosts(data.forum_posts)
            // setPostComments(data.comments)
        })
        .catch((error) => {
            console.error('Error fetching subforum data:', error);
        });
    }, [id]);

    function handleDeleteForumPost(deletedForumPost) {
        setSubforumData((subforumData) => {
            return {...subforumData, forum_posts: subforumData.forum_posts.filter((post) => {
                return post.id !== deletedForumPost.id 
            })}
        })
    }

    const postCount = subforumData.forum_posts?.length || 0;
    const commentCount = subforumData.forum_posts?.reduce((total, post) => total + (post.comments?.length || 0), 0) || 0;

    return (
        <SubforumContainer>
            <SubforumHeader>
                <HeaderContent>
                    <ForumBreadcrumb>
                        <Link to='/forums'>Forums</Link>
                        <span>/</span>
                        <Link to={`/forums/${subforumData.forum_id || ''}`}>{subforumData.forum}</Link>
                        <span>/</span>
                        <span>{subforumData.name}</span>
                    </ForumBreadcrumb>
                    
                    <SubforumTitle>{subforumData.name}</SubforumTitle>
                    
                    <PostStats>
                        <span>{postCount} {postCount === 1 ? 'Post' : 'Posts'}</span>
                        <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
                    </PostStats>
                </HeaderContent>
            </SubforumHeader>

            <ActionBar>
                <BackButton onClick={() => navigate(`/forums/${subforumData.forum_id || ''}`)}>
                    Back to {subforumData.forum}
                </BackButton>
                
                <Link to='/new_forum_post' state={{ subforumId: id, subforumName: subforumData.name }}>
                    <NewPostButton>
                        Start New Discussion
                    </NewPostButton>
                </Link>
            </ActionBar>

            <ContentArea>
                {postCount === 0 ? (
                    <EmptyState>
                        <h3>No discussions yet</h3>
                        <p>Be the first to start a conversation in this subforum!</p>
                        <Link to='/new_forum_post' state={{ subforumId: id, subforumName: subforumData.name }}>
                            <NewPostButton>
                                Create First Post
                            </NewPostButton>
                        </Link>
                    </EmptyState>
                ) : (
                    <ForumPostCard 
                        subforumData={subforumData} 
                        user={user} 
                        onDeleteForumPost={handleDeleteForumPost} 
                    />
                )}
            </ContentArea>
        </SubforumContainer>
    );
}



export default SubforumDetail;