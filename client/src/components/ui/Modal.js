import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { createPortal } from 'react-dom';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing[4]};
  animation: fadeIn ${({ theme }) => theme.transition.base};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn ${({ theme }) => theme.transition.base};
  position: relative;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          width: 100%;
          max-width: 400px;
        `;
      case 'lg':
        return css`
          width: 100%;
          max-width: 800px;
        `;
      case 'xl':
        return css`
          width: 100%;
          max-width: 1200px;
        `;
      default:
        return css`
          width: 100%;
          max-width: 600px;
        `;
    }
  }}

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 95vw;
    max-height: 95vh;
    margin: ${({ theme }) => theme.spacing[2]};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.muted};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all ${({ theme }) => theme.transition.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.gray[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ModalFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  hideCloseButton = false,
  closeOnOverlayClick = true,
  showFooter = false,
  footerActions,
  ...props
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer size={size} role="dialog" aria-modal="true" {...props}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {!hideCloseButton && (
              <CloseButton
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                ×
              </CloseButton>
            )}
          </ModalHeader>
        )}
        
        <ModalContent>{children}</ModalContent>
        
        {showFooter && footerActions && (
          <ModalFooter>{footerActions}</ModalFooter>
        )}
      </ModalContainer>
    </Overlay>
  );

  return createPortal(modalContent, document.body);
};

// Compound components
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;