import React, { useState } from "react";
import { Button, Card, Modal } from './ui';
import styled from 'styled-components';
import artresource from '../assets/artresource.png'

const StyledCard = styled(Card)`
  max-width: 445px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition.base};
  
  &:hover {
    transform: translateY(-4px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const ResourceImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ModalImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ResourceName = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: center;
`;

const AddressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const AddressItem = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const PhoneNumber = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const WebsiteLink = styled.a`
  color: ${({ theme }) => theme.colors.accent.blue};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  display: block;
  
  &:hover {
    text-decoration: underline;
  }
`;

function ArtistResourceCard({ resource }){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (
        <>
            <StyledCard variant="outlined" padding="lg" interactive onClick={handleOpen}>
                <Card.Image>
                    <ResourceImage src={artresource} alt="Resource image" />
                </Card.Image>
                <Card.Content>
                    <Card.Title>{resource.name}</Card.Title>
                    <Card.Subtitle>{resource.location}</Card.Subtitle>
                </Card.Content>
            </StyledCard>
            
            <Modal
                isOpen={open}
                onClose={handleClose}
                title={resource.name}
                size="lg"
            >
                <ModalContent>
                    <ModalHeader>
                        <ModalImage src={artresource} alt="Resource image" />
                    </ModalHeader>
                    
                    <AddressSection>
                        {resource.addresses?.map((add) => (
                            <AddressItem key={add.id || add.street}>
                                <h3>{add.street}</h3>
                                <h3>{add.city}, {add.state}</h3>
                                <h3>{add.zip}</h3>
                            </AddressItem>
                        ))}
                    </AddressSection>
                    
                    <PhoneNumber>{formatPhoneNumber(resource.phone)}</PhoneNumber>
                    
                    <Description>{resource.description}</Description>
                    
                    {resource.website && (
                        <WebsiteLink 
                            href={resource.website} 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Visit Website
                        </WebsiteLink>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default ArtistResourceCard;