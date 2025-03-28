import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaExchangeAlt, FaRuler, FaWeight, FaThermometer } from 'react-icons/fa';

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('foot');
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState<string>('');

  // Unit conversion data
  const unitCategories = [
    { id: 'length', name: 'Length', icon: <FaRuler /> },
    { id: 'weight', name: 'Weight', icon: <FaWeight /> },
    { id: 'temperature', name: 'Temperature', icon: <FaThermometer /> },
    { id: 'area', name: 'Area', icon: <FaExchangeAlt /> },
    { id: 'volume', name: 'Volume', icon: <FaExchangeAlt /> },
    { id: 'speed', name: 'Speed', icon: <FaExchangeAlt /> },
    { id: 'time', name: 'Time', icon: <FaExchangeAlt /> },
    { id: 'digital', name: 'Digital Storage', icon: <FaExchangeAlt /> }
  ];

  const unitOptions: { [key: string]: { [key: string]: { name: string; factor: number } } } = {
    length: {
      meter: { name: 'Meter (m)', factor: 1 },
      kilometer: { name: 'Kilometer (km)', factor: 1000 },
      centimeter: { name: 'Centimeter (cm)', factor: 0.01 },
      millimeter: { name: 'Millimeter (mm)', factor: 0.001 },
      inch: { name: 'Inch (in)', factor: 0.0254 },
      foot: { name: 'Foot (ft)', factor: 0.3048 },
      yard: { name: 'Yard (yd)', factor: 0.9144 },
      mile: { name: 'Mile (mi)', factor: 1609.344 }
    },
    weight: {
      kilogram: { name: 'Kilogram (kg)', factor: 1 },
      gram: { name: 'Gram (g)', factor: 0.001 },
      milligram: { name: 'Milligram (mg)', factor: 0.000001 },
      pound: { name: 'Pound (lb)', factor: 0.45359237 },
      ounce: { name: 'Ounce (oz)', factor: 0.02834952 },
      ton: { name: 'Metric Ton (t)', factor: 1000 },
      stone: { name: 'Stone (st)', factor: 6.35029 }
    },
    temperature: {
      celsius: { name: 'Celsius (°C)', factor: 1 },
      fahrenheit: { name: 'Fahrenheit (°F)', factor: 1 },
      kelvin: { name: 'Kelvin (K)', factor: 1 }
    },
    area: {
      squareMeter: { name: 'Square Meter (m²)', factor: 1 },
      squareKilometer: { name: 'Square Kilometer (km²)', factor: 1000000 },
      squareCentimeter: { name: 'Square Centimeter (cm²)', factor: 0.0001 },
      squareMillimeter: { name: 'Square Millimeter (mm²)', factor: 0.000001 },
      squareInch: { name: 'Square Inch (in²)', factor: 0.00064516 },
      squareFoot: { name: 'Square Foot (ft²)', factor: 0.09290304 },
      squareYard: { name: 'Square Yard (yd²)', factor: 0.83612736 },
      acre: { name: 'Acre', factor: 4046.8564224 },
      hectare: { name: 'Hectare (ha)', factor: 10000 }
    },
    volume: {
      cubicMeter: { name: 'Cubic Meter (m³)', factor: 1 },
      liter: { name: 'Liter (L)', factor: 0.001 },
      milliliter: { name: 'Milliliter (mL)', factor: 0.000001 },
      gallon: { name: 'Gallon (gal)', factor: 0.00378541 },
      quart: { name: 'Quart (qt)', factor: 0.000946353 },
      pint: { name: 'Pint (pt)', factor: 0.000473176 },
      cup: { name: 'Cup', factor: 0.000236588 },
      fluidOunce: { name: 'Fluid Ounce (fl oz)', factor: 0.0000295735 },
      cubicInch: { name: 'Cubic Inch (in³)', factor: 0.0000163871 },
      cubicFoot: { name: 'Cubic Foot (ft³)', factor: 0.0283168 }
    },
    speed: {
      meterPerSecond: { name: 'Meter per Second (m/s)', factor: 1 },
      kilometerPerHour: { name: 'Kilometer per Hour (km/h)', factor: 0.277778 },
      milePerHour: { name: 'Mile per Hour (mph)', factor: 0.44704 },
      knot: { name: 'Knot (kn)', factor: 0.514444 },
      footPerSecond: { name: 'Foot per Second (ft/s)', factor: 0.3048 }
    },
    time: {
      second: { name: 'Second (s)', factor: 1 },
      minute: { name: 'Minute (min)', factor: 60 },
      hour: { name: 'Hour (h)', factor: 3600 },
      day: { name: 'Day (d)', factor: 86400 },
      week: { name: 'Week (wk)', factor: 604800 },
      month: { name: 'Month (mo)', factor: 2629746 },
      year: { name: 'Year (yr)', factor: 31556952 }
    },
    digital: {
      byte: { name: 'Byte (B)', factor: 1 },
      kilobyte: { name: 'Kilobyte (KB)', factor: 1024 },
      megabyte: { name: 'Megabyte (MB)', factor: 1048576 },
      gigabyte: { name: 'Gigabyte (GB)', factor: 1073741824 },
      terabyte: { name: 'Terabyte (TB)', factor: 1099511627776 },
      petabyte: { name: 'Petabyte (PB)', factor: 1125899906842624 },
      bit: { name: 'Bit (b)', factor: 0.125 },
      kibibyte: { name: 'Kibibyte (KiB)', factor: 1024 },
      mebibyte: { name: 'Mebibyte (MiB)', factor: 1048576 },
      gibibyte: { name: 'Gibibyte (GiB)', factor: 1073741824 }
    }
  };

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    
    // Set default units for the new category
    const units = Object.keys(unitOptions[newCategory]);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    
    // Reset result
    setResult(null);
    setFormula('');
  };

  // Convert units
  const convertUnits = () => {
    if (!value || isNaN(parseFloat(value))) {
      alert('Please enter a valid number');
      return;
    }
    
    const inputValue = parseFloat(value);
    
    // Special case for temperature
    if (category === 'temperature') {
      let convertedValue: number;
      let formulaText: string;
      
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedValue = (inputValue * 9/5) + 32;
        formulaText = `${inputValue}°C × (9/5) + 32 = ${convertedValue.toFixed(2)}°F`;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        convertedValue = inputValue + 273.15;
        formulaText = `${inputValue}°C + 273.15 = ${convertedValue.toFixed(2)}K`;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedValue = (inputValue - 32) * 5/9;
        formulaText = `(${inputValue}°F - 32) × (5/9) = ${convertedValue.toFixed(2)}°C`;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        convertedValue = (inputValue - 32) * 5/9 + 273.15;
        formulaText = `(${inputValue}°F - 32) × (5/9) + 273.15 = ${convertedValue.toFixed(2)}K`;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        convertedValue = inputValue - 273.15;
        formulaText = `${inputValue}K - 273.15 = ${convertedValue.toFixed(2)}°C`;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        convertedValue = (inputValue - 273.15) * 9/5 + 32;
        formulaText = `(${inputValue}K - 273.15) × (9/5) + 32 = ${convertedValue.toFixed(2)}°F`;
      } else {
        // Same unit, no conversion needed
        convertedValue = inputValue;
        formulaText = `${inputValue} = ${convertedValue}`;
      }
      
      setResult(convertedValue);
      setFormula(formulaText);
    } else {
      // For all other unit types, use the factor-based conversion
      const fromFactor = unitOptions[category][fromUnit].factor;
      const toFactor = unitOptions[category][toUnit].factor;
      
      // Convert to base unit, then to target unit
      const baseValue = inputValue * fromFactor;
      const convertedValue = baseValue / toFactor;
      
      setResult(convertedValue);
      
      // Create formula text
      if (fromUnit === toUnit) {
        setFormula(`${inputValue} = ${convertedValue}`);
      } else {
        setFormula(`${inputValue} × ${fromFactor} ÷ ${toFactor} = ${convertedValue}`);
      }
    }
  };

  // Swap units
  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // If there's a result, recalculate
    if (result !== null && value) {
      convertUnits();
    }
  };

  // Format result with appropriate precision
  const formatResult = (value: number): string => {
    if (value === 0) return '0';
    
    const absValue = Math.abs(value);
    
    if (absValue < 0.000001 || absValue > 1000000) {
      return value.toExponential(6);
    }
    
    if (absValue < 0.001) {
      return value.toFixed(6);
    }
    
    if (absValue < 1) {
      return value.toFixed(4);
    }
    
    if (absValue < 10) {
      return value.toFixed(3);
    }
    
    if (absValue < 100) {
      return value.toFixed(2);
    }
    
    return value.toFixed(1);
  };

  return (
    <Layout>
      <Head>
        <title>Unit Converter | ToolsFree Online</title>
        <meta name="description" content="Convert between different units of measurement with our free online unit converter tool." />
        <meta name="keywords" content="unit converter, measurement converter, length converter, weight converter, temperature converter" />
      </Head>

      <PageContainer>
        <PageTitle>Unit Converter</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <ConverterSection>
            <CategorySelector>
              {unitCategories.map(cat => (
                <CategoryButton 
                  key={cat.id} 
                  active={category === cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.icon}
                  <CategoryName>{cat.name}</CategoryName>
                </CategoryButton>
              ))}
            </CategorySelector>
            
            <ConverterInputs>
              <InputGroup>
                <label>Value:</label>
                <input 
                  type="number" 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
                  placeholder="Enter value"
                  step="any"
                />
              </InputGroup>
              
              <UnitSelectors>
                <UnitSelector>
                  <label>From:</label>
                  <select 
                    value={fromUnit} 
                    onChange={(e) => setFromUnit(e.target.value)}
                  >
                    {Object.entries(unitOptions[category]).map(([id, unit]) => (
                      <option key={`from-${id}`} value={id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </UnitSelector>
                
                <SwapButton onClick={swapUnits}>
                  ⇄
                </SwapButton>
                
                <UnitSelector>
                  <label>To:</label>
                  <select 
                    value={toUnit} 
                    onChange={(e) => setToUnit(e.target.value)}
                  >
                    {Object.entries(unitOptions[category]).map(([id, unit]) => (
                      <option key={`to-${id}`} value={id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </UnitSelector>
              </UnitSelectors>
              
              <ConvertButton onClick={convertUnits}>
                <FaExchangeAlt /> Convert
              </ConvertButton>
            </ConverterInputs>
            
            {result !== null && (
              <ResultContainer>
                <ResultValue>
                  {value} {unitOptions[category][fromUnit].name.split(' ')[0]} = {formatResult(result)} {unitOptions[category][toUnit].name.split(' ')[0]}
                </ResultValue>
                <FormulaText>
                  Formula: {formula}
                </FormulaText>
              </ResultContainer>
            )}
          </ConverterSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Unit Conversion</InfoTitle>
          <InfoText>
            Our unit converter tool allows you to quickly convert between different units of measurement across various categories:
            
            <InfoSubtitle>Length</InfoSubtitle>
            <InfoParagraph>
              Convert between meters, kilometers, centimeters, millimeters, inches, feet, yards, and miles.
            </InfoParagraph>
            
            <InfoSubtitle>Weight</InfoSubtitle>
            <InfoParagraph>
              Convert between kilograms, grams, milligrams, pounds, ounces, tons, and stones.
            </InfoParagraph>
            
            <InfoSubtitle>Temperature</InfoSubtitle>
            <InfoParagraph>
              Convert between Celsius, Fahrenheit, and Kelvin.
            </InfoParagraph>
            
            <InfoSubtitle>Area</InfoSubtitle>
            <InfoParagraph>
              Convert between square meters, square kilometers, square centimeters, square millimeters, square inches, square feet, square yards, acres, and hectares.
            </InfoParagraph>
            
            <InfoSubtitle>Volume</InfoSubtitle>
            <InfoParagraph>
              Convert between cubic meters, liters, milliliters, gallons, quarts, pints, cups, fluid ounces, cubic inches, and cubic feet.
            </InfoParagraph>
            
            <InfoSubtitle>Speed</InfoSubtitle>
            <InfoParagraph>
              Convert between meters per second, kilometers per hour, miles per hour, knots, and feet per second.
            </InfoParagraph>
            
            <InfoSubtitle>Time</InfoSubtitle>
            <InfoParagraph>
              Convert between seconds, minutes, hours, days, weeks, months, and years.
            </InfoParagraph>
            
            <InfoSubtitle>Digital Storage</InfoSubtitle>
            <InfoParagraph>
              Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, bits, kibibytes, mebibytes, and gibibytes.
            </InfoParagraph>
            
            <InfoNote>
              <strong>Note:</strong> This converter uses standard conversion factors and formulas. For temperature conversions, specific formulas are used rather than simple multiplication factors.
            </InfoNote>
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

const ConverterSection = styled.div`
  padding: 2rem;
`;

const CategorySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

interface CategoryButtonProps {
  active: boolean;
}

const CategoryButton = styled.button<CategoryButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.active ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s;
  
  svg {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e5e5'};
  }
`;

const CategoryName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ConverterInputs = styled.div`
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
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

const UnitSelectors = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UnitSelector = styled.div`
  flex: 1;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
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

const SwapButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s;
  align-self: center;
  margin-bottom: 0.5rem;
  
  &:hover {
    background-color: #e5e5e5;
  }
  
  @media (max-width: 768px) {
    align-self: flex-end;
    margin: -1rem 0 1rem 0;
  }
`;

const ConvertButton = styled.button`
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

const ResultContainer = styled.div`
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ResultValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
`;

const FormulaText = styled.div`
  color: #666;
  font-size: 0.9rem;
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

const InfoSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 1.5rem 0 0.5rem;
  
  &:first-of-type {
    margin-top: 1rem;
  }
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const InfoParagraph = styled.p`
  margin-bottom: 0.5rem;
`;

const InfoNote = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 0 4px 4px 0;
`;

export default UnitConverter;
