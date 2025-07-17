import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from './Container';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #212529 0%, #343a40 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing[8]};
  margin-top: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[8]} 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: #fff;
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: translateY(-2px);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const NewsletterButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: #fff;
  color: #212529;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: rgba(255, 255, 255, 0.6);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubscribing(true);
    
    // Simulate newsletter subscription
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterSection>
            <FooterTitle>RARE NY</FooterTitle>
            <FooterText>
              Resources for Artists Everywhere in New York. Connecting the creative community 
              with opportunities, spaces, and resources throughout the five boroughs.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <span>f</span>
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <span>t</span>
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <span>i</span>
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <span>in</span>
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink to="/listings">Studio Listings</FooterLink>
            <FooterLink to="/resources">Art Resources</FooterLink>
            <FooterLink to="/forums">Community Forums</FooterLink>
            <FooterLink to="/profile">Your Profile</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Resources</FooterTitle>
            <ExternalLink href="#" rel="noreferrer">NYC Arts Guide</ExternalLink>
            <ExternalLink href="#" rel="noreferrer">Grant Opportunities</ExternalLink>
            <ExternalLink href="#" rel="noreferrer">Artist Residencies</ExternalLink>
            <ExternalLink href="#" rel="noreferrer">Exhibition Spaces</ExternalLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Stay Updated</FooterTitle>
            <FooterText>
              Get the latest updates on new listings, resources, and community events.
            </FooterText>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing || subscribed}
                required
              />
              <NewsletterButton 
                type="submit" 
                disabled={isSubscribing || subscribed}
              >
                {isSubscribing ? 'Subscribing...' : subscribed ? 'Subscribed!' : 'Subscribe'}
              </NewsletterButton>
            </NewsletterForm>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <div>
            © {new Date().getFullYear()} RARE NY. All rights reserved.
          </div>
          <LegalLinks>
            <ExternalLink href="#" rel="noreferrer">Privacy Policy</ExternalLink>
            <ExternalLink href="#" rel="noreferrer">Terms of Service</ExternalLink>
            <ExternalLink href="#" rel="noreferrer">Contact Us</ExternalLink>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;