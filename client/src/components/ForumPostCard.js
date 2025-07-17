import React from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import CommentCard from "./CommentCard";
import { Button } from './ui';
import '../App.css'

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Post = styled.article`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
`;

const PostHeader = styled.div`
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem 1rem;
  }
`;

const PostTitle = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: #000;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #6c757d;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:before {
    content: '👤';
    opacity: 0.7;
  }
`;

const PostDate = styled.span`
  &:before {
    content: '📅';
    margin-right: 0.25rem;
    opacity: 0.7;
  }
`;

const PostContent = styled.div`
  padding: 1.5rem 2rem;
  
  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
  }
  
  /* Markdown content styling */
  p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #495057;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 1.5rem 0 1rem;
    color: #000;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
  
  blockquote {
    border-left: 4px solid #e9ecef;
    padding: 1rem 1.5rem;
    margin: 1rem 0;
    background: #f8f9fa;
    border-radius: 0 8px 8px 0;
    
    p {
      margin-bottom: 0;
      font-style: italic;
    }
  }
  
  code {
    background: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
    
    code {
      background: none;
      padding: 0;
    }
  }
`;

const PostActions = styled.div`
  padding: 1rem 2rem 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem 1.25rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ActionButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    justify-content: center;
    width: 100%;
  }
`;

const CommentButton = styled(ActionButton)`
  background: transparent;
  color: #000;
  border: 2px solid #000;
  
  &:hover {
    background: #000;
    color: #fff;
    transform: translateY(-1px);
  }
  
  &:before {
    content: '💬';
  }
`;

const DeleteButton = styled(ActionButton)`
  background: transparent;
  color: #dc3545;
  border: 2px solid #dc3545;
  
  &:hover {
    background: #dc3545;
    color: #fff;
    transform: translateY(-1px);
  }
  
  &:before {
    content: '🗑️';
  }
`;

const CommentsSection = styled.div`
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
`;

function ForumPostCard({ user, subforumData, onDeleteForumPost }){
    const {id} = useParams();
    const navigate = useNavigate();

    function handleDeleteForumPost(post) {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            fetch(`/forum_posts/${post.id}`, {
                method: "DELETE",
            }).then((r) => {
                if (r.ok) {
                    onDeleteForumPost(post);
                    navigate(`/subforums/${id}`);
                }
            }).catch((error) => {
                console.error('Error deleting post:', error);
            });
        }
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <PostsContainer>
            {subforumData.forum_posts?.map((post) => (
                <Post key={post.id}>
                    <PostHeader>
                        <PostTitle>{post.title}</PostTitle>
                        <PostMeta>
                            <AuthorInfo>
                                <span>By {post.user}</span>
                            </AuthorInfo>
                            {post.created_at && (
                                <PostDate>{formatDate(post.created_at)}</PostDate>
                            )}
                        </PostMeta>
                    </PostHeader>
                    
                    <PostContent>
                        <ReactMarkdown>{post.body}</ReactMarkdown>
                    </PostContent>
                    
                    <PostActions>
                        <Link to={`/new_comment`} state={{ forumPostId: post.id, subforumId: id }}>
                            <CommentButton>
                                Add Comment
                            </CommentButton>
                        </Link>
                        
                        {user && user.id === post.userid && (
                            <DeleteButton onClick={() => handleDeleteForumPost(post)}>
                                Delete Post
                            </DeleteButton>
                        )}
                    </PostActions>
                    
                    <CommentsSection>
                        <CommentCard post={post} subforumData={subforumData} />
                    </CommentsSection>
                </Post>
            ))}
        </PostsContainer>
    );
}

export default ForumPostCard;