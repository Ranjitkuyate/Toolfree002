import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BabyName {
  name: string;
  gender: 'male' | 'female' | 'neutral';
  origin?: string;
}

const BabyNameGenerator: React.FC = () => {
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('both');
  const [nameLength, setNameLength] = useState<'any' | 'short' | 'medium' | 'long'>('any');
  const [generatedNames, setGeneratedNames] = useState<BabyName[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favorites, setFavorites] = useState<BabyName[]>([]);

  // Generate baby names based on parent names
  const generateNames = () => {
    if (!fatherName.trim() || !motherName.trim()) {
      alert('Please enter both mother and father names');
      return;
    }

    setIsGenerating(true);
    
    // Combine letters from both parent names
    const fatherLetters = fatherName.toLowerCase().replace(/[^a-z]/g, '').split('');
    const motherLetters = motherName.toLowerCase().replace(/[^a-z]/g, '').split('');
    
    // Get unique letters from both names
    const allLetters = [...new Set([...fatherLetters, ...motherLetters])];
    
    // Generate names using the combined letters
    const names: BabyName[] = [];
    
    // Helper function to check if a name can be formed using available letters
    const canFormName = (name: string, letters: string[]) => {
      const letterCounts: {[key: string]: number} = {};
      
      // Count available letters
      letters.forEach(letter => {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
      });
      
      // Check if name can be formed
      const nameLowercase = name.toLowerCase();
      for (let i = 0; i < nameLowercase.length; i++) {
        const letter = nameLowercase[i];
        if (letter === ' ') continue;
        
        if (!letterCounts[letter] || letterCounts[letter] <= 0) {
          return false;
        }
        letterCounts[letter]--;
      }
      
      return true;
    };
    
    // Generate male names
    if (gender === 'male' || gender === 'both') {
      const maleNames = [
        'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander',
        'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo',
        'Jack', 'Owen', 'Theodore', 'Aiden', 'Samuel', 'Joseph', 'John', 'David', 'Wyatt', 'Matthew'
      ];
      
      maleNames.forEach(name => {
        if (canFormName(name, allLetters)) {
          // Filter by name length if specified
          if (nameLength === 'any' || 
             (nameLength === 'short' && name.length <= 4) ||
             (nameLength === 'medium' && name.length > 4 && name.length <= 6) ||
             (nameLength === 'long' && name.length > 6)) {
            names.push({
              name,
              gender: 'male',
              origin: getRandomOrigin()
            });
          }
        }
      });
    }
    
    // Generate female names
    if (gender === 'female' || gender === 'both') {
      const femaleNames = [
        'Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper',
        'Luna', 'Camila', 'Gianna', 'Elizabeth', 'Eleanor', 'Ella', 'Abigail', 'Sofia', 'Avery', 'Scarlett',
        'Emily', 'Aria', 'Penelope', 'Chloe', 'Layla', 'Mila', 'Nora', 'Hazel', 'Madison', 'Ellie'
      ];
      
      femaleNames.forEach(name => {
        if (canFormName(name, allLetters)) {
          // Filter by name length if specified
          if (nameLength === 'any' || 
             (nameLength === 'short' && name.length <= 4) ||
             (nameLength === 'medium' && name.length > 4 && name.length <= 6) ||
             (nameLength === 'long' && name.length > 6)) {
            names.push({
              name,
              gender: 'female',
              origin: getRandomOrigin()
            });
          }
        }
      });
    }
    
    // Generate gender-neutral names
    const neutralNames = [
      'Riley', 'Jordan', 'Avery', 'Parker', 'Quinn', 'Blake', 'River', 'Dakota', 'Skyler', 'Reese',
      'Morgan', 'Taylor', 'Casey', 'Jamie', 'Peyton', 'Rowan', 'Charlie', 'Emerson', 'Finley', 'Sage',
      'Hayden', 'Alexis', 'Kai', 'Elliot', 'Phoenix', 'Remy', 'Harley', 'Emery', 'Sawyer', 'Kendall'
    ];
    
    neutralNames.forEach(name => {
      if (canFormName(name, allLetters)) {
        // Filter by name length if specified
        if (nameLength === 'any' || 
           (nameLength === 'short' && name.length <= 4) ||
           (nameLength === 'medium' && name.length > 4 && name.length <= 6) ||
           (nameLength === 'long' && name.length > 6)) {
          names.push({
            name,
            gender: 'neutral',
            origin: getRandomOrigin()
          });
        }
      }
    });
    
    // Create custom names by combining parts of parent names
    const customNames = generateCustomNames(fatherName, motherName);
    names.push(...customNames);
    
    // Shuffle and limit to 20 names
    const shuffledNames = names.sort(() => 0.5 - Math.random()).slice(0, 20);
    
    setTimeout(() => {
      setGeneratedNames(shuffledNames);
      setIsGenerating(false);
    }, 1500);
  };
  
  // Generate custom names by combining parts of parent names
  const generateCustomNames = (father: string, mother: string): BabyName[] => {
    const customNames: BabyName[] = [];
    
    // Get first half of father's name and second half of mother's name
    const fatherFirstHalf = father.substring(0, Math.ceil(father.length / 2));
    const motherSecondHalf = mother.substring(Math.floor(mother.length / 2));
    
    // Get first half of mother's name and second half of father's name
    const motherFirstHalf = mother.substring(0, Math.ceil(mother.length / 2));
    const fatherSecondHalf = father.substring(Math.floor(father.length / 2));
    
    // Create combined names
    const combinedName1 = fatherFirstHalf + motherSecondHalf;
    const combinedName2 = motherFirstHalf + fatherSecondHalf;
    
    // Capitalize first letter
    const formattedName1 = combinedName1.charAt(0).toUpperCase() + combinedName1.slice(1).toLowerCase();
    const formattedName2 = combinedName2.charAt(0).toUpperCase() + combinedName2.slice(1).toLowerCase();
    
    // Add to custom names
    customNames.push({
      name: formattedName1,
      gender: gender === 'male' ? 'male' : gender === 'female' ? 'female' : Math.random() > 0.5 ? 'male' : 'female',
      origin: 'Custom Blend'
    });
    
    customNames.push({
      name: formattedName2,
      gender: gender === 'male' ? 'male' : gender === 'female' ? 'female' : Math.random() > 0.5 ? 'male' : 'female',
      origin: 'Custom Blend'
    });
    
    return customNames;
  };
  
  // Get random origin for names
  const getRandomOrigin = (): string => {
    const origins = [
      'English', 'French', 'Spanish', 'Italian', 'German', 'Greek', 'Hebrew', 'Irish', 'Scottish', 'Welsh',
      'Nordic', 'Russian', 'Arabic', 'Indian', 'Japanese', 'Chinese', 'Korean', 'African', 'Latin', 'Persian'
    ];
    
    return origins[Math.floor(Math.random() * origins.length)];
  };
  
  // Add name to favorites
  const addToFavorites = (name: BabyName) => {
    if (!favorites.some(fav => fav.name === name.name)) {
      setFavorites([...favorites, name]);
    }
  };
  
  // Remove name from favorites
  const removeFromFavorites = (name: BabyName) => {
    setFavorites(favorites.filter(fav => fav.name !== name.name));
  };
  
  // Clear all generated names
  const clearNames = () => {
    setGeneratedNames([]);
  };
  
  // Reset all inputs
  const resetInputs = () => {
    setFatherName('');
    setMotherName('');
    setGender('both');
    setNameLength('any');
    setGeneratedNames([]);
  };

  return (
    <Container>
      <ToolHeader>
        <h1>Baby Name Generator</h1>
        <p>Generate unique baby names by combining letters from parents' names</p>
      </ToolHeader>
      
      <ToolSection>
        <InputGrid>
          <InputGroup>
            <label htmlFor="father-name">Father's Name</label>
            <input
              id="father-name"
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="Enter father's name"
            />
          </InputGroup>
          
          <InputGroup>
            <label htmlFor="mother-name">Mother's Name</label>
            <input
              id="mother-name"
              type="text"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="Enter mother's name"
            />
          </InputGroup>
        </InputGrid>
        
        <OptionsGrid>
          <OptionGroup>
            <label htmlFor="gender-select">Baby's Gender</label>
            <select
              id="gender-select"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'both')}
            >
              <option value="both">Both / Either</option>
              <option value="male">Boy</option>
              <option value="female">Girl</option>
            </select>
          </OptionGroup>
          
          <OptionGroup>
            <label htmlFor="length-select">Name Length</label>
            <select
              id="length-select"
              value={nameLength}
              onChange={(e) => setNameLength(e.target.value as 'any' | 'short' | 'medium' | 'long')}
            >
              <option value="any">Any Length</option>
              <option value="short">Short (4 letters or less)</option>
              <option value="medium">Medium (5-6 letters)</option>
              <option value="long">Long (7+ letters)</option>
            </select>
          </OptionGroup>
        </OptionsGrid>
        
        <ButtonGroup>
          <ActionButton primary onClick={generateNames} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Names'}
          </ActionButton>
          
          <ActionButton onClick={resetInputs}>
            Reset
          </ActionButton>
        </ButtonGroup>
        
        {generatedNames.length > 0 && (
          <ResultsContainer>
            <ResultsHeader>
              <h2>Generated Names</h2>
              <ClearButton onClick={clearNames}>Clear All</ClearButton>
            </ResultsHeader>
            
            <NameGrid>
              {generatedNames.map((nameObj, index) => (
                <NameCard key={index}>
                  <NameInfo>
                    <NameText>{nameObj.name}</NameText>
                    <NameDetails>
                      <GenderBadge gender={nameObj.gender}>
                        {nameObj.gender === 'male' ? 'Boy' : nameObj.gender === 'female' ? 'Girl' : 'Neutral'}
                      </GenderBadge>
                      {nameObj.origin && <OriginBadge>{nameObj.origin}</OriginBadge>}
                    </NameDetails>
                  </NameInfo>
                  <FavoriteButton
                    onClick={() => favorites.some(fav => fav.name === nameObj.name) 
                      ? removeFromFavorites(nameObj) 
                      : addToFavorites(nameObj)}
                    isFavorite={favorites.some(fav => fav.name === nameObj.name)}
                  >
                    {favorites.some(fav => fav.name === nameObj.name) 
                      ? <i className="fas fa-heart"></i> 
                      : <i className="far fa-heart"></i>}
                  </FavoriteButton>
                </NameCard>
              ))}
            </NameGrid>
          </ResultsContainer>
        )}
        
        {favorites.length > 0 && (
          <FavoritesContainer>
            <h2>Your Favorites</h2>
            <FavoritesList>
              {favorites.map((nameObj, index) => (
                <FavoriteItem key={index}>
                  <FavoriteName>{nameObj.name}</FavoriteName>
                  <GenderBadge gender={nameObj.gender} small>
                    {nameObj.gender === 'male' ? 'Boy' : nameObj.gender === 'female' ? 'Girl' : 'Neutral'}
                  </GenderBadge>
                  <RemoveButton onClick={() => removeFromFavorites(nameObj)}>
                    <i className="fas fa-times"></i>
                  </RemoveButton>
                </FavoriteItem>
              ))}
            </FavoritesList>
          </FavoritesContainer>
        )}
      </ToolSection>
      
      <ToolSection>
        <h2>How It Works</h2>
        <p>
          Our Baby Name Generator creates unique name suggestions by analyzing and combining letters from both parents' names.
          This creates a special connection between the baby's name and the parents' names.
        </p>
        
        <h3>Features:</h3>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon className="fas fa-magic" />
            <FeatureText>
              <strong>Letter Combination</strong>
              <span>Creates names using letters from both parents' names</span>
            </FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon className="fas fa-venus-mars" />
            <FeatureText>
              <strong>Gender Selection</strong>
              <span>Filter names by gender preference</span>
            </FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon className="fas fa-text-height" />
            <FeatureText>
              <strong>Length Options</strong>
              <span>Choose short, medium, or long names</span>
            </FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon className="fas fa-heart" />
            <FeatureText>
              <strong>Favorites List</strong>
              <span>Save your favorite name options</span>
            </FeatureText>
          </FeatureItem>
        </FeatureList>
        
        <h3>Tips for Choosing a Baby Name:</h3>
        <TipsList>
          <li>Say the name out loud to see how it sounds</li>
          <li>Consider the meaning and origin of the name</li>
          <li>Think about potential nicknames</li>
          <li>Check the initials to avoid unfortunate combinations</li>
          <li>Consider how the name will grow with your child</li>
        </TipsList>
      </ToolSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ToolHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
  }
`;

const ToolSection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  h3 {
    font-size: 1.2rem;
    margin: 1.5rem 0 1rem;
    color: var(--text-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OptionGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : 'var(--text-color)'};
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h2 {
    margin: 0;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const NameCard = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NameInfo = styled.div`
  flex: 1;
`;

const NameText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NameDetails = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const GenderBadge = styled.span<{ gender: string; small?: boolean }>`
  background-color: ${props => 
    props.gender === 'male' ? '#4a90e2' : 
    props.gender === 'female' ? '#e24a8d' : 
    '#8e44ad'};
  color: white;
  border-radius: 20px;
  padding: ${props => props.small ? '0.1rem 0.5rem' : '0.2rem 0.6rem'};
  font-size: ${props => props.small ? '0.7rem' : '0.8rem'};
  font-weight: 500;
`;

const OriginBadge = styled.span`
  background-color: #f0f0f0;
  color: #666;
  border-radius: 20px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isFavorite ? '#e74c3c' : '#ccc'};
  cursor: pointer;
  font-size: 1.2rem;
  transition: var(--transition);
  
  &:hover {
    color: #e74c3c;
  }
`;

const FavoritesContainer = styled.div`
  margin-top: 2rem;
  
  h2 {
    margin-bottom: 1rem;
  }
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FavoriteItem = styled.div`
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FavoriteName = styled.span`
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    color: #e74c3c;
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const FeatureIcon = styled.i`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-top: 0.2rem;
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    margin-bottom: 0.3rem;
  }
  
  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

const TipsList = styled.ul`
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

export default BabyNameGenerator;
