import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  
  ${({ required }) =>
    required &&
    css`
      &::after {
        content: ' *';
        color: ${({ theme }) => theme.colors.semantic.error};
      }
    `}
`;

const StyledInput = styled.input`
  /* Base styles */
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transition.fast};
  outline: none;

  /* Placeholder styles */
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  /* Focus state */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.black};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.gray[200]};
  }

  /* Hover state */
  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.primary.gray[400]};
  }

  /* Error state */
  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.colors.semantic.error};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.semantic.error};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.semantic.errorBg};
      }
    `}

  /* Success state */
  ${({ success }) =>
    success &&
    css`
      border-color: ${({ theme }) => theme.colors.semantic.success};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.semantic.success};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.semantic.successBg};
      }
    `}

  /* Disabled state */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary.gray[100]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${({ theme }) => theme.spacing[2]};
          font-size: ${({ theme }) => theme.typography.fontSize.sm};
        `;
      case 'lg':
        return css`
          padding: ${({ theme }) => theme.spacing[4]};
          font-size: ${({ theme }) => theme.typography.fontSize.lg};
        `;
      default:
        return '';
    }
  }}
`;

const StyledTextarea = styled.textarea`
  /* Base styles - same as input */
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transition.fast};
  outline: none;
  resize: vertical;
  min-height: 100px;

  /* Placeholder styles */
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  /* Focus state */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.black};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.gray[200]};
  }

  /* Hover state */
  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.primary.gray[400]};
  }

  /* Error state */
  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.colors.semantic.error};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.semantic.error};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.semantic.errorBg};
      }
    `}

  /* Success state */
  ${({ success }) =>
    success &&
    css`
      border-color: ${({ theme }) => theme.colors.semantic.success};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.semantic.success};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.semantic.successBg};
      }
    `}

  /* Disabled state */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary.gray[100]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const HelperText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing[1]};

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.colors.semantic.error};
    `}

  ${({ success }) =>
    success &&
    css`
      color: ${({ theme }) => theme.colors.semantic.success};
    `}
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.muted};
  pointer-events: none;

  ${({ position }) =>
    position === 'left'
      ? css`
          left: ${({ theme }) => theme.spacing[3]};
        `
      : css`
          right: ${({ theme }) => theme.spacing[3]};
        `}
`;

const InputWithIcon = styled(StyledInput)`
  ${({ leftIcon }) =>
    leftIcon &&
    css`
      padding-left: ${({ theme }) => theme.spacing[10]};
    `}

  ${({ rightIcon }) =>
    rightIcon &&
    css`
      padding-right: ${({ theme }) => theme.spacing[10]};
    `}
`;

const Input = ({
  label,
  helperText,
  error,
  success,
  required,
  leftIcon,
  rightIcon,
  multiline,
  size = 'md',
  ...props
}) => {
  const InputComponent = multiline ? StyledTextarea : leftIcon || rightIcon ? InputWithIcon : StyledInput;

  return (
    <InputWrapper>
      {label && (
        <Label required={required} htmlFor={props.id}>
          {label}
        </Label>
      )}
      
      <InputContainer>
        {leftIcon && (
          <IconWrapper position="left">
            {leftIcon}
          </IconWrapper>
        )}
        
        <InputComponent
          error={error}
          success={success}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          required={required}
          {...props}
        />
        
        {rightIcon && (
          <IconWrapper position="right">
            {rightIcon}
          </IconWrapper>
        )}
      </InputContainer>
      
      {helperText && (
        <HelperText error={error} success={success}>
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;