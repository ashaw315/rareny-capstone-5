import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[6]};
  min-height: ${({ minHeight }) => minHeight || '300px'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  }
`;

const IconContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.primary.gray[400]};
  
  svg {
    width: ${({ size }) => {
      switch (size) {
        case 'sm':
          return '3rem';
        case 'lg':
          return '6rem';
        case 'xl':
          return '8rem';
        default:
          return '4rem';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'sm':
          return '3rem';
        case 'lg':
          return '6rem';
        case 'xl':
          return '8rem';
        default:
          return '4rem';
      }
    }};
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  max-width: 500px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

// Default icons for common states
const defaultIcons = {
  noData: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  ),
  noResults: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      <path d="M7 9h5v1H7z"/>
    </svg>
  ),
  noContent: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  empty: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  ),
  offline: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01L18.09 7.5l3.19 3.19 1.27-1.27-5.51-5.5z"/>
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  )
};

const EmptyState = ({
  variant = 'noData',
  icon,
  title,
  description,
  size = 'md',
  minHeight,
  primaryAction,
  secondaryAction,
  children,
  ...props
}) => {
  const displayIcon = icon || defaultIcons[variant] || defaultIcons.noData;
  
  const defaultTitles = {
    noData: 'No data available',
    noResults: 'No results found',
    noContent: 'No content yet',
    error: 'Something went wrong',
    empty: 'Get started',
    offline: 'You\'re offline',
    maintenance: 'Under maintenance'
  };

  const defaultDescriptions = {
    noData: 'There\'s no data to display at the moment.',
    noResults: 'Try adjusting your search or filter criteria.',
    noContent: 'Create your first item to get started.',
    error: 'We encountered an error. Please try again.',
    empty: 'Add your first item to begin.',
    offline: 'Check your internet connection and try again.',
    maintenance: 'We\'ll be back shortly. Thanks for your patience.'
  };

  const displayTitle = title || defaultTitles[variant] || defaultTitles.noData;
  const displayDescription = description || defaultDescriptions[variant] || defaultDescriptions.noData;

  return (
    <EmptyStateContainer minHeight={minHeight} {...props}>
      <IconContainer size={size}>
        {displayIcon}
      </IconContainer>
      
      <Title>{displayTitle}</Title>
      
      <Description>{displayDescription}</Description>
      
      {(primaryAction || secondaryAction) && (
        <ActionContainer>
          {primaryAction && (
            <Button variant="primary" {...primaryAction.props}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="secondary" {...secondaryAction.props}>
              {secondaryAction.label}
            </Button>
          )}
        </ActionContainer>
      )}
      
      {children}
    </EmptyStateContainer>
  );
};

export default EmptyState;