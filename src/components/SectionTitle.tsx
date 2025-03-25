import React from 'react';
import styled from 'styled-components';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <TitleContainer>
      <Title>{title}</Title>
      <Divider />
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Divider = styled.div`
  height: 4px;
  width: 60px;
  background-color: var(--primary-color);
  margin: 0 auto;
`;

export default SectionTitle;
