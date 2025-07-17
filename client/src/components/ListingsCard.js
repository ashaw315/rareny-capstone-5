import React from "react";
import { Link } from 'react-router-dom'
import { Card } from './ui';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  max-width: 445px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.base};
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.xl};
    border-color: ${({ theme }) => theme.colors.accent.blue};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 240px;
  background: ${({ theme }) => theme.colors.primary.gray[100]};
`;

const ListingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transition.slow};
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transition.base};
  
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const ListingTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  /* Truncate long titles */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const LocationIcon = styled.span`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.accent.blue};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent.blue};
`;

const PriceLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const ViewButton = styled.div`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.accent.blue};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transition.fast};
  opacity: 0;
  transform: translateY(10px);
  
  ${StyledCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

function ListingsCard({ listing }){
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <StyledLink to={`/listings/${listing.id}`}>
            <StyledCard>
                <ImageContainer>
                    <ListingImage 
                        src={listing.image1} 
                        alt={listing.title || "Studio listing"} 
                        onError={(e) => {
                            e.target.src = '/api/placeholder/445/240';
                        }}
                    />
                    <ImageOverlay />
                    {listing.featured && <Badge>Featured</Badge>}
                </ImageContainer>
                
                <ContentWrapper>
                    <ListingTitle>{listing.title}</ListingTitle>
                    
                    <LocationInfo>
                        <LocationIcon />
                        <span>{listing.neighborhood}, {listing.nyc_borough}</span>
                    </LocationInfo>
                    
                    {listing.sq_footage && (
                        <div style={{ 
                            fontSize: '14px', 
                            color: '#6c757d', 
                            marginBottom: '16px' 
                        }}>
                            {listing.sq_footage} sq ft
                        </div>
                    )}
                    
                    <PriceContainer>
                        <div>
                            <Price>{formatPrice(listing.price)}</Price>
                            <PriceLabel>/ month</PriceLabel>
                        </div>
                        <ViewButton>View Details</ViewButton>
                    </PriceContainer>
                </ContentWrapper>
            </StyledCard>
        </StyledLink>
    );
}

export default ListingsCard;