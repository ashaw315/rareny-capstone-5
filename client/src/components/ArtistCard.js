import React, { useState } from "react";
import { Button, Card, Modal } from './ui';
import MessageButton from './Messaging/MessageButton';
import OnlineStatus from './Messaging/OnlineStatus';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  min-width: 500px;
  min-height: 300px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition.base};
  
  &:hover {
    transform: translateY(-4px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 100%;
    min-height: 200px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  max-height: 80vh;
  overflow-y: auto;
`;


const ArtistDiscipline = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;
`;

const ArtistBio = styled.p`
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

function ArtistCard({ artist, currentUser }){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <StyledCard variant="outlined" padding="lg" interactive onClick={handleOpen}>
                <Card.Content>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <OnlineStatus 
                            status={artist.online_status}
                            lastSeenAt={artist.last_seen_at}
                            size="small"
                        />
                        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                            {artist.online_status === 'online' ? 'Online' : 
                             artist.online_status === 'away' ? 'Away' : 'Offline'}
                        </span>
                    </div>
                    <Card.Actions align="center">
                        <Button variant="outline" size="lg" fullWidth>
                            {artist.username}
                        </Button>
                    </Card.Actions>
                </Card.Content>
            </StyledCard>
            
            <Modal
                isOpen={open}
                onClose={handleClose}
                title={artist.username}
                size="lg"
            >
                <ModalContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <OnlineStatus 
                            status={artist.online_status}
                            lastSeenAt={artist.last_seen_at}
                            showText={true}
                            size="medium"
                        />
                    </div>
                    
                    <ArtistDiscipline>{artist.discipline}</ArtistDiscipline>
                    
                    <ArtistBio>{artist.bio}</ArtistBio>
                    
                    {artist.website && (
                        <WebsiteLink 
                            href={artist.website} 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Visit Website
                        </WebsiteLink>
                    )}
                    
                    {currentUser && currentUser.id !== artist.id && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <MessageButton
                                userId={artist.id}
                                username={artist.username}
                                variant="primary"
                                size="medium"
                            />
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ArtistCard;