import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaBaby, FaRandom } from 'react-icons/fa';

const BabyNameGenerator: React.FC = () => {
  const [motherName, setMotherName] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [gender, setGender] = useState<string>('both');
  const [nameCount, setNameCount] = useState<number>(5);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);

  // Sample name parts for demonstration
  const boyNameParts = [
    'Al', 'An', 'Ar', 'Ben', 'Bran', 'Cal', 'Car', 'Chris', 'Dan', 'Dav', 
    'El', 'Eth', 'Ev', 'Gab', 'Gar', 'Har', 'Hen', 'Is', 'Jack', 'Jam', 
    'Jo', 'Josh', 'Ju', 'Ke', 'Ky', 'Le', 'Li', 'Lu', 'Ma', 'Mi', 
    'Na', 'Ni', 'No', 'Ol', 'Os', 'Pa', 'Pe', 'Qu', 'Ra', 'Ri', 
    'Ro', 'Ry', 'Sa', 'Se', 'Ste', 'Th', 'Ti', 'Ty', 'Vi', 'Wi', 'Za'
  ];
  
  const girlNameParts = [
    'Ab', 'Ad', 'Al', 'Am', 'An', 'Ar', 'Au', 'Av', 'Be', 'Br', 
    'Ca', 'Ch', 'Cl', 'Da', 'De', 'El', 'Em', 'Er', 'Ev', 'Fa', 
    'Fe', 'Ga', 'Gr', 'Ha', 'Is', 'Ja', 'Jo', 'Ju', 'Ka', 'Ke', 
    'Ki', 'La', 'Le', 'Li', 'Lo', 'Lu', 'Ma', 'Me', 'Mi', 'Na', 
    'Ni', 'No', 'Ol', 'Pa', 'Pe', 'Ra', 'Re', 'Ro', 'Sa', 'So', 
    'St', 'Ta', 'Ti', 'Va', 'Vi', 'Zo'
  ];
  
  const boySuffixes = [
    'an', 'en', 'in', 'on', 'iel', 'iah', 'ias', 'ius', 'iam', 'iel',
    'er', 'ar', 'or', 'son', 'ton', 'den', 'vin', 'lan', 'dan', 'ron',
    'ley', 'ry', 'ey', 'ie', 'in', 'ert', 'ard', 'ick', 'ick', 'ell'
  ];
  
  const girlSuffixes = [
    'a', 'ah', 'ia', 'ina', 'ita', 'ella', 'etta', 'lyn', 'lynn', 'anne',
    'ie', 'y', 'ey', 'ley', 'lee', 'ise', 'ise', 'ine', 'ene', 'een',
    'ice', 'ica', 'ina', 'ora', 'ola', 'ila', 'ila', 'ella', 'etta', 'etta'
  ];

  const generateNames = () => {
    if (!motherName && !fatherName) {
      alert('Please enter at least one parent name');
      return;
    }
    
    const names: string[] = [];
    const momParts = motherName.toLowerCase().replace(/[^a-z]/g, '');
    const dadParts = fatherName.toLowerCase().replace(/[^a-z]/g, '');
    
    // Generate names based on parent names
    for (let i = 0; i < nameCount; i++) {
      let name = '';
      
      if (gender === 'boy' || (gender === 'both' && i % 2 === 0)) {
        // Generate boy name
        const useMotherPart = Math.random() > 0.5 && momParts.length > 0;
        const useFatherPart = Math.random() > 0.5 && dadParts.length > 0;
        
        if (useMotherPart && momParts.length >= 2) {
          const startIdx = Math.floor(Math.random() * (momParts.length - 2));
          name += momParts.substring(startIdx, startIdx + 2);
          name = name.charAt(0).toUpperCase() + name.slice(1);
        } else if (useFatherPart && dadParts.length >= 2) {
          const startIdx = Math.floor(Math.random() * (dadParts.length - 2));
          name += dadParts.substring(startIdx, startIdx + 2);
          name = name.charAt(0).toUpperCase() + name.slice(1);
        } else {
          name = boyNameParts[Math.floor(Math.random() * boyNameParts.length)];
        }
        
        name += boySuffixes[Math.floor(Math.random() * boySuffixes.length)];
      } else {
        // Generate girl name
        const useMotherPart = Math.random() > 0.5 && momParts.length > 0;
        const useFatherPart = Math.random() > 0.5 && dadParts.length > 0;
        
        if (useMotherPart && momParts.length >= 2) {
          const startIdx = Math.floor(Math.random() * (momParts.length - 2));
          name += momParts.substring(startIdx, startIdx + 2);
          name = name.charAt(0).toUpperCase() + name.slice(1);
        } else if (useFatherPart && dadParts.length >= 2) {
          const startIdx = Math.floor(Math.random() * (dadParts.length - 2));
          name += dadParts.substring(startIdx, startIdx + 2);
          name = name.charAt(0).toUpperCase() + name.slice(1);
        } else {
          name = girlNameParts[Math.floor(Math.random() * girlNameParts.length)];
        }
        
        name += girlSuffixes[Math.floor(Math.random() * girlSuffixes.length)];
      }
      
      // Ensure name is properly capitalized
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      
      // Add name if it's not already in the list
      if (!names.includes(name)) {
        names.push(name);
      } else {
        // Try again if we got a duplicate
        i--;
      }
    }
    
    setGeneratedNames(names);
  };

  const toggleFavorite = (name: string) => {
    if (favoriteNames.includes(name)) {
      setFavoriteNames(favoriteNames.filter(n => n !== name));
    } else {
      setFavoriteNames([...favoriteNames, name]);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Baby Name Generator | ToolsFree Online</title>
        <meta name="description" content="Generate unique baby names based on parent names. Find the perfect name for your baby." />
        <meta name="keywords" content="baby name generator, name ideas, baby names, parent name combination" />
      </Head>

      <PageContainer>
        <PageTitle>Baby Name Generator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <GeneratorSection>
            <InputsContainer>
              <InputGroup>
                <label>Mother's Name:</label>
                <input 
                  type="text" 
                  value={motherName} 
                  onChange={(e) => setMotherName(e.target.value)} 
                  placeholder="Enter mother's name"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Father's Name:</label>
                <input 
                  type="text" 
                  value={fatherName} 
                  onChange={(e) => setFatherName(e.target.value)} 
                  placeholder="Enter father's name"
                />
              </InputGroup>
            </InputsContainer>
            
            <OptionsContainer>
              <InputGroup>
                <label>Gender:</label>
                <select 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="both">Both</option>
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                </select>
              </InputGroup>
              
              <InputGroup>
                <label>Number of Names:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={nameCount} 
                  onChange={(e) => setNameCount(parseInt(e.target.value))} 
                />
              </InputGroup>
            </OptionsContainer>
            
            <GenerateButton onClick={generateNames}>
              <FaRandom /> Generate Names
            </GenerateButton>
            
            {generatedNames.length > 0 && (
              <ResultsContainer>
                <ResultsTitle>
                  <BabyIcon><FaBaby /></BabyIcon>
                  Generated Names
                </ResultsTitle>
                <NamesList>
                  {generatedNames.map((name, index) => (
                    <NameItem key={index}>
                      <NameText>{name}</NameText>
                      <FavoriteButton 
                        isFavorite={favoriteNames.includes(name)}
                        onClick={() => toggleFavorite(name)}
                      >
                        {favoriteNames.includes(name) ? '★' : '☆'}
                      </FavoriteButton>
                    </NameItem>
                  ))}
                </NamesList>
              </ResultsContainer>
            )}
            
            {favoriteNames.length > 0 && (
              <FavoritesContainer>
                <FavoritesTitle>Your Favorites</FavoritesTitle>
                <FavoritesList>
                  {favoriteNames.map((name, index) => (
                    <FavoriteItem key={index}>
                      <FavoriteText>{name}</FavoriteText>
                      <RemoveButton onClick={() => toggleFavorite(name)}>
                        ✕
                      </RemoveButton>
                    </FavoriteItem>
                  ))}
                </FavoritesList>
              </FavoritesContainer>
            )}
          </GeneratorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>How It Works</InfoTitle>
          <InfoText>
            Our Baby Name Generator creates unique name suggestions by combining elements from both parents' names and adding popular prefixes and suffixes. This creates names that have a personal connection to your family while still being unique.
            
            <InfoList>
              <InfoItem>Enter both parents' names for the best results</InfoItem>
              <InfoItem>Choose gender preference to narrow down suggestions</InfoItem>
              <InfoItem>Generate as many names as you like</InfoItem>
              <InfoItem>Save your favorites for later reference</InfoItem>
            </InfoList>
            
            The generator uses a combination of syllables from parent names along with popular name patterns to create names that sound natural while maintaining a connection to your family.
          </InfoText>
        </InfoContainer>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>
      </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AdContainer = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  text-align: center;
`;

const AdText = styled.p`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdContent = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border: 1px dashed #ddd;
`;

const ToolContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const GeneratorSection = styled.div`
  padding: 2rem;
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const GenerateButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ResultsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const BabyIcon = styled.span`
  color: #ff6b6b;
`;

const NamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const NameItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NameText = styled.div`
  font-size: 1.1rem;
`;

interface FavoriteButtonProps {
  isFavorite: boolean;
}

const FavoriteButton = styled.button<FavoriteButtonProps>`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.isFavorite ? '#ffc107' : '#ccc'};
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.isFavorite ? '#ffb300' : '#ffc107'};
  }
`;

const FavoritesContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fff8e1;
  border-radius: 4px;
`;

const FavoritesTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #f57c00;
`;

const FavoritesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FavoriteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FavoriteText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #f57c00;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;
  
  &:hover {
    color: #f44336;
  }
`;

const InfoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const InfoList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
`;

export default BabyNameGenerator;
