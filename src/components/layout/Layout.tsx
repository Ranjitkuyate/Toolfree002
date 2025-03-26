import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from './layout/Header';
import Footer from './layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'ToolsFree Online - Free Online Tools' 
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Free online tools to make your life easier" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <Main>{children}</Main>
      
      <Footer />
    </>
  );
};

const Main = styled.main`
  min-height: calc(100vh - 200px);
`;

export default Layout;
