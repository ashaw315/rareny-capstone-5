import React from 'react';
import styled, { css } from 'styled-components';

const AvatarContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: ${({ shape }) => shape === 'square' ? '0.375rem' : '50%'};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary.gray[200]};
  
  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return css`
          width: 1.5rem;
          height: 1.5rem;
          font-size: 0.625rem;
        `;
      case 'sm':
        return css`
          width: 2rem;
          height: 2rem;
          font-size: 0.75rem;
        `;
      case 'lg':
        return css`
          width: 4rem;
          height: 4rem;
          font-size: 1.125rem;
        `;
      case 'xl':
        return css`
          width: 5rem;
          height: 5rem;
          font-size: 1.25rem;
        `;
      case '2xl':
        return css`
          width: 6rem;
          height: 6rem;
          font-size: 1.5rem;
        `;
      default: // md
        return css`
          width: 2.5rem;
          height: 2.5rem;
          font-size: 0.875rem;
        `;
    }
  }}

  /* Border variant */
  ${({ hasBorder, theme }) =>
    hasBorder &&
    css`
      border: 2px solid ${theme.colors.primary.white};
      box-shadow: 0 0 0 1px ${theme.colors.primary.gray[200]};
    `}
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.gray[300]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  user-select: none;
`;

const StatusIndicator = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.background.card};
  
  /* Status colors */
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'online':
        return theme.colors.semantic.success;
      case 'away':
        return theme.colors.semantic.warning;
      case 'busy':
        return theme.colors.semantic.error;
      case 'offline':
        return theme.colors.primary.gray[400];
      default:
        return theme.colors.primary.gray[400];
    }
  }};

  /* Size and position based on avatar size */
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return css`
          width: 0.375rem;
          height: 0.375rem;
          bottom: 0;
          right: 0;
        `;
      case 'sm':
        return css`
          width: 0.5rem;
          height: 0.5rem;
          bottom: 0;
          right: 0;
        `;
      case 'lg':
        return css`
          width: 0.875rem;
          height: 0.875rem;
          bottom: 0.125rem;
          right: 0.125rem;
        `;
      case 'xl':
        return css`
          width: 1rem;
          height: 1rem;
          bottom: 0.25rem;
          right: 0.25rem;
        `;
      case '2xl':
        return css`
          width: 1.125rem;
          height: 1.125rem;
          bottom: 0.375rem;
          right: 0.375rem;
        `;
      default: // md
        return css`
          width: 0.625rem;
          height: 0.625rem;
          bottom: 0;
          right: 0;
        `;
    }
  }}
`;

// Group container for multiple avatars
const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  
  ${AvatarContainer}:not(:first-child) {
    margin-left: -${({ spacing, theme }) => {
      switch (spacing) {
        case 'tight':
          return theme.spacing[2];
        case 'loose':
          return theme.spacing[1];
        default:
          return theme.spacing[3];
      }
    }};
  }
`;

const generateInitials = (name) => {
  if (!name) return '';
  
  const nameParts = name.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0);
  }
  
  return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
};

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  hasBorder = false,
  fallback,
  onClick,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const displayFallback = fallback || generateInitials(name || alt || '');

  return (
    <AvatarContainer
      size={size}
      shape={shape}
      hasBorder={hasBorder}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {src && !imageError ? (
        <AvatarImage
          src={src}
          alt={alt || name || 'Avatar'}
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback>
          {displayFallback}
        </AvatarFallback>
      )}
      
      {status && (
        <StatusIndicator
          status={status}
          size={size}
          aria-label={`Status: ${status}`}
        />
      )}
    </AvatarContainer>
  );
};

// Compound component for avatar groups
Avatar.Group = ({ children, max, spacing = 'normal', ...props }) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = max ? avatars.slice(0, max) : avatars;
  const hiddenCount = max && avatars.length > max ? avatars.length - max : 0;

  return (
    <AvatarGroup spacing={spacing} {...props}>
      {visibleAvatars}
      {hiddenCount > 0 && (
        <Avatar
          fallback={`+${hiddenCount}`}
          size={visibleAvatars[0]?.props?.size || 'md'}
        />
      )}
    </AvatarGroup>
  );
};

export default Avatar;