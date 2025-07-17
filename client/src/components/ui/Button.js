import styled, { css } from 'styled-components';

// Button Variants
const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary.black};
    color: ${({ theme }) => theme.colors.primary.white};
    border: 2px solid ${({ theme }) => theme.colors.primary.black};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.white};
      color: ${({ theme }) => theme.colors.primary.black};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.gray[300]};
    }
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.colors.primary.white};
    color: ${({ theme }) => theme.colors.primary.black};
    border: 2px solid ${({ theme }) => theme.colors.primary.black};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.black};
      color: ${({ theme }) => theme.colors.primary.white};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.gray[300]};
    }
  `,

  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.black};
    border: 2px solid ${({ theme }) => theme.colors.primary.black};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.black};
      color: ${({ theme }) => theme.colors.primary.white};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.gray[300]};
    }
  `,

  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.black};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.gray[100]};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.gray[300]};
    }
  `,

  danger: css`
    background-color: ${({ theme }) => theme.colors.semantic.error};
    color: ${({ theme }) => theme.colors.primary.white};
    border: 2px solid ${({ theme }) => theme.colors.semantic.error};

    &:hover:not(:disabled) {
      background-color: #c92a2a;
      border-color: #c92a2a;
    }

    &:focus {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.semantic.errorBg};
    }
  `
};

// Size styles
const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    min-height: 2rem;
  `,

  md: css`
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    min-height: 2.5rem;
  `,

  lg: css`
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    min-height: 3rem;
  `,

  xl: css`
    padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[8]};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    min-height: 3.5rem;
  `
};

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth', 'loading'].includes(prop),
})`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  text-decoration: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transition.fast};
  outline: none;
  position: relative;
  white-space: nowrap;

  /* Apply variant styles */
  ${({ variant }) => variantStyles[variant]};

  /* Apply size styles */
  ${({ size }) => sizeStyles[size]};

  /* Full width */
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  /* Loading state */
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
      pointer-events: none;
    `}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  /* Focus-visible for keyboard users */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </StyledButton>
  );
};

export default Button;