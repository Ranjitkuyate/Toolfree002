import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BabyNameGenerator from '@/components/tools/BabyNameGenerator';

const BabyNameGeneratorPage = () => {
  return (
    <Layout>
      <SEO 
        title="Baby Name Generator - ToolsFree Online"
        description="Generate unique baby names by combining letters from parents' names. Find the perfect name for your baby with our free online tool."
        keywords="baby name generator, name combiner, parent name combination, unique baby names, free baby name tool"
        canonical="/tools/baby-name-generator"
      />
      <BabyNameGenerator />
    </Layout>
  );
};

export default BabyNameGeneratorPage;
