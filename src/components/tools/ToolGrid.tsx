import React from 'react';
import styled from 'styled-components';
import { Tool } from '@/utils/tools';

interface ToolGridProps {
  children: React.ReactNode;
}

const ToolGrid: React.FC<ToolGridProps> = ({ children }) => {
  return (
    <GridContainer>
      {children}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

export default ToolGrid;
