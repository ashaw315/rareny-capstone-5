import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../store/slices/userSlice';
import { Modal } from '../components/ui';
import MessageButton from '../components/Messaging/MessageButton';
import OnlineStatus from '../components/Messaging/OnlineStatus';

function Artists(){
    const dispatch = useAppDispatch();
    const { items: artists, loading, error } = useAppSelector((state) => state.users);
    const { user } = useAppSelector((state) => state.auth);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedArtist(null);
    };

    if (loading) {
        return (
            <div className="artists-users">
                <Link className="forum-card" to={'/artists'}>
                    <h2 className="forum-header-title">Artists.</h2>
                </Link>
                <div className="display-artists">
                    <p>Loading artists...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="artists-users">
                <Link className="forum-card" to={'/artists'}>
                    <h2 className="forum-header-title">Artists.</h2>
                </Link>
                <div className="display-artists">
                    <p>Error loading artists: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="artists-users">
            <Link className="forum-card" to={'/artists'}>
                <h2 className="forum-header-title">Artists.</h2>
            </Link>
            <div className="artists-list">
                {artists?.length > 0 ? (
                    artists.map((artist) => (
                        <div key={artist.id} className="artist-list-item" onClick={() => handleArtistClick(artist)}>
                            <div className="artist-info">
                                <div className="artist-main">
                                    <span className="artist-username">{artist.username}</span>
                                    <span className="artist-discipline">{artist.discipline || 'Artist'}</span>
                                </div>
                                <div className="artist-status">
                                    <OnlineStatus 
                                        status={artist.online_status}
                                        lastSeenAt={artist.last_seen_at}
                                        size="small"
                                        showText={false}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No artists found.</p>
                )}
            </div>
            
            {selectedArtist && (
                <Modal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    title={selectedArtist.username}
                    size="lg"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                            <OnlineStatus 
                                status={selectedArtist.online_status}
                                lastSeenAt={selectedArtist.last_seen_at}
                                showText={true}
                                size="medium"
                            />
                        </div>
                        
                        {selectedArtist.discipline && (
                            <h3 style={{ fontSize: '1.25rem', color: '#666', margin: 0, textAlign: 'center' }}>
                                {selectedArtist.discipline}
                            </h3>
                        )}
                        
                        {selectedArtist.bio && (
                            <p style={{ fontSize: '1rem', color: '#000', lineHeight: '1.6', margin: 0 }}>
                                {selectedArtist.bio}
                            </p>
                        )}
                        
                        {selectedArtist.website && (
                            <a 
                                href={selectedArtist.website} 
                                target="_blank" 
                                rel="noreferrer"
                                style={{ color: '#004dc9', textDecoration: 'none', fontWeight: '500', textAlign: 'center', display: 'block' }}
                            >
                                Visit Website
                            </a>
                        )}
                        
                        {user && user.id !== selectedArtist.id && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <MessageButton
                                    userId={selectedArtist.id}
                                    username={selectedArtist.username}
                                    variant="primary"
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Artists;