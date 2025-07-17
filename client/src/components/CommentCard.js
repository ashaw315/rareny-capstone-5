import React, { useState } from "react";
import styled from "styled-components";
import { Button } from './ui';

const CommentsContainer = styled.div`
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const ToggleButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: #6c757d;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  &:hover {
    background: #f8f9fa;
    color: #000;
    border-color: #dee2e6;
  }
  
  &:before {
    content: ${props => props.isOpen ? "'🔽'" : "'▶️'"};
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const Comment = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #dee2e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #6c757d;
  
  &:before {
    content: '👤';
    opacity: 0.7;
  }
`;

const CommentAuthor = styled.strong`
  color: #000;
  font-weight: 600;
`;

const CommentBody = styled.div`
  color: #495057;
  line-height: 1.6;
  font-size: 0.95rem;
  
  p {
    margin: 0 0 0.5rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CommentCount = styled.span`
  color: #6c757d;
  font-size: 0.85rem;
  margin-left: 0.5rem;
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
  
  &:before {
    content: '💬';
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.5;
  }
`;

function CommentCard({ subforumData, forumPosts, post }){
    const [isToggle, setIsToggle] = useState(true)

    function handleToggle() {
        setIsToggle((isToggle) => !isToggle)
    }

    function getCommentUser(id) {
        return subforumData.comments?.find((comment) => comment.id === id)?.user || 'Unknown User'
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const commentCount = post.comments?.length || 0;

    return (
        <CommentsContainer>
            <ToggleButton isOpen={!isToggle} onClick={handleToggle}>
                {isToggle ? "Show Comments" : "Hide Comments"}
                <CommentCount>
                    ({commentCount})
                </CommentCount>
            </ToggleButton>
            
            {!isToggle && (
                <CommentsList>
                    {commentCount === 0 ? (
                        <EmptyComments>
                            No comments yet. Be the first to share your thoughts!
                        </EmptyComments>
                    ) : (
                        post.comments.map((comment) => (
                            <Comment key={comment.id}>
                                <CommentHeader>
                                    <CommentAuthor>{getCommentUser(comment.id)}</CommentAuthor>
                                    {comment.created_at && (
                                        <span>• {formatDate(comment.created_at)}</span>
                                    )}
                                </CommentHeader>
                                <CommentBody>
                                    <p>{comment.body}</p>
                                </CommentBody>
                            </Comment>
                        ))
                    )}
                </CommentsList>
            )}
        </CommentsContainer>
    )
}

export default CommentCard;