import React from 'react';
import styled, { css } from 'styled-components';

const AlertContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return css`
          background-color: ${theme.colors.semantic.successBg};
          border-color: ${theme.colors.semantic.success};
          color: ${theme.colors.text.primary};
        `;
      case 'warning':
        return css`
          background-color: ${theme.colors.semantic.warningBg};
          border-color: ${theme.colors.semantic.warning};
          color: ${theme.colors.text.primary};
        `;
      case 'error':
        return css`
          background-color: ${theme.colors.semantic.errorBg};
          border-color: ${theme.colors.semantic.error};
          color: ${theme.colors.text.primary};
        `;
      case 'info':
        return css`
          background-color: ${theme.colors.semantic.infoBg};
          border-color: ${theme.colors.semantic.info};
          color: ${theme.colors.text.primary};
        `;
      default:
        return css`
          background-color: ${theme.colors.primary.gray[100]};
          border-color: ${theme.colors.primary.gray[300]};
          color: ${theme.colors.text.primary};
        `;
    }
  }}

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.xs};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing[5]};
          font-size: ${theme.typography.fontSize.base};
        `;
      default:
        return '';
    }
  }}
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const AlertTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  color: ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return theme.colors.semantic.success;
      case 'warning':
        return '#b45309'; // Darker warning color for better contrast
      case 'error':
        return theme.colors.semantic.error;
      case 'info':
        return theme.colors.semantic.info;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

const AlertDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.muted};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all ${({ theme }) => theme.transition.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

// Default icons for each variant
const defaultIcons = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
};

const Alert = ({
  variant = 'default',
  size = 'md',
  title,
  children,
  icon,
  onClose,
  closable = false,
  ...props
}) => {
  const alertIcon = icon || defaultIcons[variant] || defaultIcons.default;

  return (
    <AlertContainer
      variant={variant}
      size={size}
      role="alert"
      {...props}
    >
      <IconContainer>
        {alertIcon}
      </IconContainer>
      
      <ContentContainer>
        {title && (
          <AlertTitle variant={variant}>
            {title}
          </AlertTitle>
        )}
        {children && (
          <AlertDescription>
            {children}
          </AlertDescription>
        )}
      </ContentContainer>
      
      {(closable || onClose) && (
        <CloseButton
          onClick={onClose}
          aria-label="Close alert"
          type="button"
        >
          ×
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert;