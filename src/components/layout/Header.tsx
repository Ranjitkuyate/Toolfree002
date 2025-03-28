import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaTools, FaSearch, FaInfoCircle, FaBook } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Link href="/" legacyBehavior>
            <Logo>
              <FaTools />
              <LogoText>ToolsFree</LogoText>
            </Logo>
          </Link>
        </LogoContainer>
        
        <Navigation>
          <NavItem>
            <Link href="/" legacyBehavior>
              <NavLink>Home</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/tools" legacyBehavior>
              <NavLink>Tools</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/about" legacyBehavior>
              <NavLink>About</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/documentation" legacyBehavior>
              <NavLink>Docs</NavLink>
            </Link>
          </NavItem>
        </Navigation>
        
        <SearchContainer>
          <SearchInput placeholder="Search tools..." />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
`;

const LogoText = styled.span`
  color: #333;
`;

const Navigation = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  cursor: pointer;
  
  &:hover {
    color: #4a90e2;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4a90e2;
    transition: width 0.3s;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
  
  &:focus {
    border-color: #4a90e2;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

export default Header;
