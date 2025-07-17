import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/slices/authSlice';
import { Button, Input, Modal, Alert, Card } from '../../components/ui';
import { Container } from '../../components/layout';
import styled from 'styled-components';

// Styled Components
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.background.primary} 0%,
    ${({ theme }) => theme.colors.background.accent} 100%
  );
  position: relative;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[16]};
  }
`;

const TextContent = styled.div`
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: left;
  }
`;

const Greeting = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['8xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 600px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    margin-right: auto;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary.black};
  color: ${({ theme }) => theme.colors.primary.white};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-top: ${({ theme }) => theme.spacing[16]};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.primary.white};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.primary.gray[300]};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
  
  a {
    color: ${({ theme }) => theme.colors.accent.blue};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  
  // Local state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      setModalOpen(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      setLoginError(err || 'Login failed. Please try again.');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setLoginError('');
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <HeroSection>
        <Container size="xl">
          <HeroContent>
            <TextContent>
              <Greeting>
                {isAuthenticated ? `Hello, ${user?.username}!` : 'Hello.'}
              </Greeting>
              
              <Title>RARE NY</Title>
              
              <Subtitle>Resources for Artists Everywhere</Subtitle>
              
              <Description>
                Connect with fellow artists in your community. Share your latest work, 
                find housing, and discover resources and opportunities.
              </Description>
              
              {!isAuthenticated && (
                <ActionButtons>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setModalOpen(true)}
                  >
                    Log In
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </ActionButtons>
              )}
            </TextContent>
            
            {isAuthenticated && (
              <Card variant="elevated" padding="lg">
                <Card.Header align="center">
                  <Card.Title>Welcome back, {user?.username}!</Card.Title>
                  <Card.Subtitle>Not sure where to begin?</Card.Subtitle>
                </Card.Header>
                
                <Card.Content>
                  <ActionButtons>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => navigate('/forums')}
                    >
                      Check out the forums
                    </Button>
                    
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => navigate('/listings')}
                    >
                      Browse Listings
                    </Button>
                    
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate('/resources')}
                    >
                      Find Resources
                    </Button>
                    
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={() => navigate('/account')}
                    >
                      Update your account
                    </Button>
                  </ActionButtons>
                </Card.Content>
              </Card>
            )}
          </HeroContent>
        </Container>
      </HeroSection>

      <Footer>
        <Container>
          <FooterContent>
            <FooterSection>
              <h3>About</h3>
              <p>
                RARE NY is a conceptual project by adamshaw. Resources for Artists 
                Everywhere looks to offer artists a space to communicate and share resources.
              </p>
            </FooterSection>
            
            <FooterSection>
              <h3>Contact</h3>
              <p>
                <a href="mailto:info.rareny@gmail.com">
                  Email Us
                </a>
              </p>
            </FooterSection>
          </FooterContent>
        </Container>
      </Footer>

      {/* Login Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="Welcome back"
        size="sm"
      >
        <ModalContent>
          {loginError && (
            <Alert variant="error" closable onClose={() => setLoginError('')}>
              {loginError}
            </Alert>
          )}
          
          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="Enter your username"
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Log In
            </Button>
          </Form>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6c757d' }}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                onClick={handleModalClose}
                style={{ color: '#000', fontWeight: '500' }}
              >
                Sign up here
              </Link>
            </span>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;