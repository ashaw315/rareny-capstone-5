import styled, { css } from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          max-width: ${theme.breakpoints.sm};
        `;
      case 'md':
        return css`
          max-width: ${theme.breakpoints.md};
        `;
      case 'lg':
        return css`
          max-width: ${theme.breakpoints.lg};
        `;
      case 'xl':
        return css`
          max-width: ${theme.breakpoints.xl};
        `;
      case 'full':
        return css`
          max-width: 100%;
        `;
      default: // 2xl
        return css`
          max-width: ${theme.breakpoints['2xl']};
        `;
    }
  }}

  /* Responsive padding */
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }

  /* Custom padding override */
  ${({ padding, theme }) =>
    padding &&
    css`
      padding: 0 ${theme.spacing[padding]};
      
      @media (min-width: ${theme.breakpoints.sm}) {
        padding: 0 ${theme.spacing[padding]};
      }
      
      @media (min-width: ${theme.breakpoints.lg}) {
        padding: 0 ${theme.spacing[padding]};
      }
    `}

  /* Center content vertically */
  ${({ centerY }) =>
    centerY &&
    css`
      display: flex;
      align-items: center;
      min-height: 100vh;
    `}

  /* Center content horizontally */
  ${({ centerX }) =>
    centerX &&
    css`
      display: flex;
      justify-content: center;
    `}

  /* Center both */
  ${({ center }) =>
    center &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    `}
`;

const Container = ({
  size = '2xl',
  padding,
  center = false,
  centerX = false,
  centerY = false,
  children,
  ...props
}) => {
  return (
    <StyledContainer
      size={size}
      padding={padding}
      center={center}
      centerX={centerX}
      centerY={centerY}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;