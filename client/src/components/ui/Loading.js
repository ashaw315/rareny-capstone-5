import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${({ theme }) => theme.colors.background.overlay};
      z-index: ${({ theme }) => theme.zIndex.overlay};
    `}

  ${({ overlay }) =>
    overlay &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${({ theme }) => theme.colors.background.overlay};
      z-index: ${({ theme }) => theme.zIndex.overlay};
    `}
`;

// Spinner Loading
const Spinner = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '1rem';
      case 'lg': return '2.5rem';
      case 'xl': return '3rem';
      default: return '1.5rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '1rem';
      case 'lg': return '2.5rem';
      case 'xl': return '3rem';
      default: return '1.5rem';
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[200]};
  border-top: 2px solid ${({ theme, color }) => 
    color === 'primary' ? theme.colors.primary.black : 
    color === 'white' ? theme.colors.primary.white :
    theme.colors.accent.blue
  };
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Dots Loading
const DotsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Dot = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '0.375rem';
      case 'lg': return '0.75rem';
      case 'xl': return '1rem';
      default: return '0.5rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '0.375rem';
      case 'lg': return '0.75rem';
      case 'xl': return '1rem';
      default: return '0.5rem';
    }
  }};
  background-color: ${({ theme, color }) => 
    color === 'primary' ? theme.colors.primary.black : 
    color === 'white' ? theme.colors.primary.white :
    theme.colors.accent.blue
  };
  border-radius: 50%;
  animation: ${bounce} 1.4s ease-in-out infinite both;

  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }
  &:nth-child(3) { animation-delay: 0s; }
`;

// Pulse Loading
const PulseCircle = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '1rem';
      case 'lg': return '2.5rem';
      case 'xl': return '3rem';
      default: return '1.5rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '1rem';
      case 'lg': return '2.5rem';
      case 'xl': return '3rem';
      default: return '1.5rem';
    }
  }};
  background-color: ${({ theme, color }) => 
    color === 'primary' ? theme.colors.primary.black : 
    color === 'white' ? theme.colors.primary.white :
    theme.colors.accent.blue
  };
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

// Loading text
const LoadingText = styled.span`
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'sm': return theme.typography.fontSize.sm;
      case 'lg': return theme.typography.fontSize.lg;
      case 'xl': return theme.typography.fontSize.xl;
      default: return theme.typography.fontSize.base;
    }
  }};
  color: ${({ theme, color }) => 
    color === 'primary' ? theme.colors.text.primary : 
    color === 'white' ? theme.colors.primary.white :
    theme.colors.text.secondary
  };
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Loading = ({
  variant = 'spinner',
  size = 'md',
  color = 'default',
  text,
  fullScreen = false,
  overlay = false,
  ...props
}) => {
  const renderLoadingIcon = () => {
    switch (variant) {
      case 'dots':
        return (
          <DotsContainer>
            <Dot size={size} color={color} />
            <Dot size={size} color={color} />
            <Dot size={size} color={color} />
          </DotsContainer>
        );
      case 'pulse':
        return <PulseCircle size={size} color={color} />;
      default:
        return <Spinner size={size} color={color} />;
    }
  };

  return (
    <LoadingContainer 
      fullScreen={fullScreen} 
      overlay={overlay}
      role="status"
      aria-live="polite"
      aria-label={text || 'Loading'}
      {...props}
    >
      {renderLoadingIcon()}
      {text && (
        <LoadingText size={size} color={color}>
          {text}
        </LoadingText>
      )}
    </LoadingContainer>
  );
};

export default Loading;