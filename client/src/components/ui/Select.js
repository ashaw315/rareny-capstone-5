import styled, { css } from 'styled-components';

const SelectWrapper = styled.div`
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

const StyledSelect = styled.select`
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
  cursor: pointer;

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

const HelperText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing[1]};

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.colors.semantic.error};
    `}
`;

const Select = ({
  label,
  helperText,
  error,
  required,
  size = 'md',
  children,
  ...props
}) => {
  return (
    <SelectWrapper>
      {label && (
        <Label required={required} htmlFor={props.id}>
          {label}
        </Label>
      )}
      
      <StyledSelect
        error={error}
        size={size}
        required={required}
        {...props}
      >
        {children}
      </StyledSelect>
      
      {helperText && (
        <HelperText error={error}>
          {helperText}
        </HelperText>
      )}
    </SelectWrapper>
  );
};

export default Select;