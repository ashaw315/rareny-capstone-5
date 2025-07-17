import React from "react";
import { Link } from 'react-router-dom'
import { Card } from './ui';
import styled from 'styled-components';

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ListingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent.blue};
`;

function ListingsCard({ listing }){
    return (
        <StyledLink to={`/listings/${listing.id}`}>
            <StyledCard variant="outlined" padding="md" interactive>
                <Card.Image>
                    <ListingImage 
                        src={listing.image1} 
                        alt={listing.title || "Listing image"} 
                    />
                </Card.Image>
                <Card.Content>
                    <Card.Title>{listing.title}</Card.Title>
                    <Card.Subtitle>{listing.neighborhood}, {listing.nyc_borough}</Card.Subtitle>
                    <Price>${listing.price}</Price>
                </Card.Content>
            </StyledCard>
        </StyledLink>
    );
}

export default ListingsCard;