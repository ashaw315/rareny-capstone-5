import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import { Button, Avatar } from '../ui';
import { Container } from '../layout';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => theme.spacing[4]} 0;
  }
`;

const Brand = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  color: ${({ theme }) => theme.colors.primary.white};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.gray[300]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.white};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transition.fast};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.gray[800]};
    color: ${({ theme }) => theme.colors.primary.white};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary.gray[700]};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -${({ theme }) => theme.spacing[3]};
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.accent.blue};
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.white};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.gray[800]};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 2px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  min-width: 200px;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all ${({ theme }) => theme.transition.fast};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.gray[100]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.gray[100]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.gray[200]};
  }
`;

const MobileMenu = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const DesktopMenu = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user from Redux
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleRevertHome = () => {
    navigate('/', { replace: true });
  };

  const navigationItems = [
    { label: 'Resources', path: '/resources' },
    { label: 'Listings', path: '/listings' },
    { label: 'Forum', path: '/forums' },
    { label: 'Artists', path: '/artists' },
  ];

  const guestItems = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <NavContainer>
      <Container>
        <NavContent>
          <Brand to="/">RARE NY</Brand>

          {isAuthenticated ? (
            <>
              <DesktopMenu>
                <NavLinks>
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </NavLinks>
              </DesktopMenu>

              <UserSection>
                <UserButton 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                >
                  <Avatar 
                    name={user?.username} 
                    size="sm" 
                    src={user?.profilePicture} 
                  />
                  <span>Hello, {user?.username}</span>
                </UserButton>

                <DropdownMenu isOpen={dropdownOpen}>
                  <DropdownItem to="/account" onClick={() => setDropdownOpen(false)}>
                    Account
                  </DropdownItem>
                  <DropdownItem to="/profile" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </DropdownItem>
                  <DropdownButton onClick={handleLogout}>
                    Log Out
                  </DropdownButton>
                </DropdownMenu>
              </UserSection>

              <MobileMenu>
                <NavLinks>
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </NavLinks>
              </MobileMenu>
            </>
          ) : (
            <NavLinks>
              <Button variant="ghost" onClick={handleRevertHome}>
                Home
              </Button>
              {guestItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </NavLink>
              ))}
            </NavLinks>
          )}
        </NavContent>
      </Container>
    </NavContainer>
  );
}

export default NavBar;