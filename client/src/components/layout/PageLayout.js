import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const PageHeader = styled.header`
  background: linear-gradient(135deg, #000 0%, #343a40 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]} 0;
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  background: linear-gradient(135deg, #000 0%, #343a40 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(2rem, 6vw, 3rem);
  }
`;

const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin: ${({ theme }) => theme.spacing[4]} 0 0;
  opacity: 0.9;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const PageContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[3]};
  }
`;

const PageSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '300px'}, 1fr));
  gap: ${({ theme, gap }) => theme.spacing[gap || 6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'flex-start'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${({ theme, gap }) => theme.spacing[gap || 4]};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: ${({ theme }) => theme.transition.base};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  &:hover {
    background: ${({ theme }) => theme.colors.text.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
    transform: translateX(-2px);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

const GradientText = styled.span`
  background: ${props => props.gradient || 'linear-gradient(135deg, #000 0%, #343a40 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

// Main Layout Component
const PageLayout = ({ 
  title, 
  subtitle, 
  children, 
  showHeader = true,
  headerGradient,
  className 
}) => {
  return (
    <PageWrapper className={className}>
      {showHeader && (
        <PageHeader gradient={headerGradient}>
          {title && <PageTitle>{title}</PageTitle>}
          {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
        </PageHeader>
      )}
      <PageContent>
        {children}
      </PageContent>
    </PageWrapper>
  );
};

// Export compound components
PageLayout.Section = PageSection;
PageLayout.SectionTitle = SectionTitle;
PageLayout.Grid = ResponsiveGrid;
PageLayout.Flex = FlexContainer;
PageLayout.Card = Card;
PageLayout.BackButton = BackButton;
PageLayout.GradientText = GradientText;

export default PageLayout;