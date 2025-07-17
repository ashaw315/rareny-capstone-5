import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: ${props => props.maxWidth || '600px'};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]};
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.gray[200]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  
  ${props => props.required && `
    &::after {
      content: '*';
      color: ${props.theme.colors.semantic.error};
      margin-left: ${props.theme.spacing[1]};
    }
  `}
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: ${({ theme }) => theme.transition.fast};
  background: ${({ theme }) => theme.colors.background.primary};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.blue};
    box-shadow: 0 0 0 3px rgba(0, 77, 201, 0.1);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.primary.gray[100]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.semantic.error};
    background: ${props.theme.colors.semantic.errorBg};
  `}
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: inherit;
  transition: ${({ theme }) => theme.transition.fast};
  background: ${({ theme }) => theme.colors.background.primary};
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.blue};
    box-shadow: 0 0 0 3px rgba(0, 77, 201, 0.1);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.primary.gray[100]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.semantic.error};
    background: ${props.theme.colors.semantic.errorBg};
  `}
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: ${({ theme }) => theme.colors.background.primary};
  transition: ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.blue};
    box-shadow: 0 0 0 3px rgba(0, 77, 201, 0.1);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.primary.gray[100]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.semantic.error};
    background: ${props.theme.colors.semantic.errorBg};
  `}
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.semantic.error};
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: block;
`;

const HelpText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: block;
`;

const FileUploadWrapper = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  transition: ${({ theme }) => theme.transition.fast};
  background: ${({ theme }) => theme.colors.background.primary};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.blue};
    background: ${({ theme }) => theme.colors.primary.gray[50]};
  }
  
  ${props => props.dragOver && `
    border-color: ${props.theme.colors.accent.blue};
    background: ${props.theme.colors.primary.gray[50]};
  `}
  
  ${props => props.error && `
    border-color: ${props.theme.colors.semantic.error};
    background: ${props.theme.colors.semantic.errorBg};
  `}
`;

const FileUploadText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const FileUploadSubtext = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: ${props => props.align || 'flex-end'};
  margin-top: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: ${props => props.stack ? 'column' : 'row'};
    align-items: stretch;
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  background: linear-gradient(135deg, #000 0%, #343a40 100%);
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.base};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

const SecondaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.primary.gray[50]};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

// File Upload Component
const FileUpload = ({ 
  onChange, 
  accept, 
  multiple = false, 
  error,
  children,
  ...props 
}) => {
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (onChange) {
      onChange(multiple ? files : files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (onChange) {
      onChange(multiple ? files : files[0]);
    }
  };

  return (
    <FileUploadWrapper
      dragOver={dragOver}
      error={error}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      {...props}
    >
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      {children || (
        <>
          <FileUploadText>
            Click to upload or drag and drop
          </FileUploadText>
          <FileUploadSubtext>
            {accept ? `Accepted formats: ${accept}` : 'Any file type accepted'}
          </FileUploadSubtext>
        </>
      )}
    </FileUploadWrapper>
  );
};

// Main Form Component
const Form = ({ 
  children, 
  onSubmit, 
  maxWidth,
  className,
  ...props 
}) => {
  return (
    <FormWrapper 
      onSubmit={onSubmit} 
      maxWidth={maxWidth}
      className={className}
      {...props}
    >
      {children}
    </FormWrapper>
  );
};

// Export compound components
Form.Section = FormSection;
Form.SectionTitle = FormSectionTitle;
Form.Group = FormGroup;
Form.Row = FormRow;
Form.Label = Label;
Form.Input = Input;
Form.TextArea = TextArea;
Form.Select = Select;
Form.FileUpload = FileUpload;
Form.ErrorMessage = ErrorMessage;
Form.HelpText = HelpText;
Form.ButtonGroup = ButtonGroup;
Form.SubmitButton = SubmitButton;
Form.SecondaryButton = SecondaryButton;

export default Form;