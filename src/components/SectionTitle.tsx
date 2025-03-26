import React from 'react';
import styled from 'styled-components';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centered = false,
  className = '' 
}) => {
  return (
    <TitleContainer className={`${centered ? 'centered' : ''} ${className}`}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  margin-bottom: 2rem;
  
  &.centered {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
`;

export default SectionTitle;
