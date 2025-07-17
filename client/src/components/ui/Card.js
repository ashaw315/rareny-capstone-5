import styled, { css } from 'styled-components';

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transition.base};
  
  /* Shadow variants */
  ${({ variant }) => {
    switch (variant) {
      case 'elevated':
        return css`
          box-shadow: ${({ theme }) => theme.shadow.lg};
          
          &:hover {
            box-shadow: ${({ theme }) => theme.shadow.xl};
          }
        `;
      case 'bordered':
        return css`
          border: 2px solid ${({ theme }) => theme.colors.primary.gray[200]};
          
          &:hover {
            border-color: ${({ theme }) => theme.colors.primary.gray[300]};
          }
        `;
      case 'outlined':
        return css`
          border: 2px solid ${({ theme }) => theme.colors.primary.black};
        `;
      default:
        return css`
          box-shadow: ${({ theme }) => theme.shadow.base};
          
          &:hover {
            box-shadow: ${({ theme }) => theme.shadow.md};
          }
        `;
    }
  }}

  /* Padding variants */
  ${({ padding }) => {
    switch (padding) {
      case 'none':
        return css`
          padding: 0;
        `;
      case 'sm':
        return css`
          padding: ${({ theme }) => theme.spacing[4]};
        `;
      case 'lg':
        return css`
          padding: ${({ theme }) => theme.spacing[8]};
        `;
      default:
        return css`
          padding: ${({ theme }) => theme.spacing[6]};
        `;
    }
  }}

  /* Interactive state */
  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;
      transform: translateY(0);
      
      &:hover {
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
    `}

  /* Full height */
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  ${({ align }) =>
    align === 'center' &&
    css`
      text-align: center;
      align-items: center;
    `}
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  
  ${({ align }) => {
    switch (align) {
      case 'center':
        return css`
          justify-content: center;
        `;
      case 'end':
        return css`
          justify-content: flex-end;
        `;
      case 'between':
        return css`
          justify-content: space-between;
        `;
      default:
        return css`
          justify-content: flex-start;
        `;
    }
  }}

  ${({ vertical }) =>
    vertical &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
`;

const CardImage = styled.div`
  width: 100%;
  margin: -${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  
  ${({ height }) =>
    height &&
    css`
      img {
        height: ${height};
      }
    `}
`;

const Card = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  fullHeight = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      interactive={interactive}
      fullHeight={fullHeight}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

// Compound components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Actions = CardActions;
Card.Image = CardImage;

export default Card;