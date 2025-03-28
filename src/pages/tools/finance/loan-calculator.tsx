import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCalculator, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [termUnit, setTermUnit] = useState<string>('years');
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  const [result, setResult] = useState<{
    payment: number;
    totalPayment: number;
    totalInterest: number;
    amortizationSchedule: Array<{
      period: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  } | null>(null);

  const calculateLoan = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      alert('Please fill in all fields');
      return;
    }
    
    const principal = parseFloat(loanAmount);
    let rate = parseFloat(interestRate) / 100;
    let term = parseFloat(loanTerm);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(term)) {
      alert('Please enter valid numbers');
      return;
    }
    
    // Convert term to months if in years
    if (termUnit === 'years') {
      term = term * 12;
    }
    
    // Adjust rate and term based on payment frequency
    let paymentsPerYear: number;
    switch (paymentFrequency) {
      case 'weekly':
        paymentsPerYear = 52;
        break;
      case 'biweekly':
        paymentsPerYear = 26;
        break;
      case 'monthly':
        paymentsPerYear = 12;
        break;
      case 'quarterly':
        paymentsPerYear = 4;
        break;
      default:
        paymentsPerYear = 12;
    }
    
    const periodicRate = rate / paymentsPerYear;
    const totalPayments = term * (paymentsPerYear / 12);
    
    // Calculate payment using formula: P = (PV*r*((1+r)^n))/((1+r)^n-1)
    const payment = (principal * periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
                   (Math.pow(1 + periodicRate, totalPayments) - 1);
    
    const totalPayment = payment * totalPayments;
    const totalInterest = totalPayment - principal;
    
    // Generate amortization schedule
    const schedule = [];
    let balance = principal;
    
    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balance * periodicRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      
      // Only include first 12 payments and last payment in the schedule to avoid too much data
      if (i <= 12 || i === totalPayments) {
        schedule.push({
          period: i,
          payment: payment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance) // Ensure balance doesn't go below 0 due to rounding
        });
      }
    }
    
    setResult({
      payment,
      totalPayment,
      totalInterest,
      amortizationSchedule: schedule
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Layout>
      <Head>
        <title>Loan Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate loan payments, total interest, and view amortization schedule with our free loan calculator." />
        <meta name="keywords" content="loan calculator, mortgage calculator, payment calculator, amortization schedule, interest calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Loan Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <InputsContainer>
              <InputGroup>
                <label>Loan Amount:</label>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(e.target.value)} 
                  placeholder="Enter loan amount"
                  min="0"
                  step="1000"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Interest Rate (% per year):</label>
                <input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(e.target.value)} 
                  placeholder="Enter interest rate"
                  min="0"
                  step="0.1"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Loan Term:</label>
                <TermInputContainer>
                  <input 
                    type="number" 
                    value={loanTerm} 
                    onChange={(e) => setLoanTerm(e.target.value)} 
                    placeholder="Enter loan term"
                    min="1"
                    step="1"
                  />
                  <select 
                    value={termUnit} 
                    onChange={(e) => setTermUnit(e.target.value)}
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </TermInputContainer>
              </InputGroup>
              
              <InputGroup>
                <label>Payment Frequency:</label>
                <select 
                  value={paymentFrequency} 
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </InputGroup>
            </InputsContainer>
            
            <CalculateButton onClick={calculateLoan}>
              <FaCalculator /> Calculate Loan
            </CalculateButton>
            
            {result && (
              <ResultsContainer>
                <ResultSummary>
                  <SummaryItem>
                    <SummaryLabel>Payment Amount:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.payment)}</SummaryValue>
                    <SummaryDetail>per {paymentFrequency.replace('ly', '')}</SummaryDetail>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Total of Payments:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.totalPayment)}</SummaryValue>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Total Interest:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.totalInterest)}</SummaryValue>
                  </SummaryItem>
                </ResultSummary>
                
                <AmortizationTitle>Amortization Schedule</AmortizationTitle>
                <AmortizationTable>
                  <thead>
                    <tr>
                      <th>Payment #</th>
                      <th>Payment</th>
                      <th>Principal</th>
                      <th>Interest</th>
                      <th>Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortizationSchedule.map((payment) => (
                      <tr key={payment.period}>
                        <td>{payment.period}</td>
                        <td>{formatCurrency(payment.payment)}</td>
                        <td>{formatCurrency(payment.principal)}</td>
                        <td>{formatCurrency(payment.interest)}</td>
                        <td>{formatCurrency(payment.balance)}</td>
                      </tr>
                    ))}
                    {result.amortizationSchedule.length < result.payment * parseFloat(loanTerm) && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>
                          ... (showing first 12 payments and last payment)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </AmortizationTable>
              </ResultsContainer>
            )}
          </CalculatorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Loan Calculations</InfoTitle>
          <InfoText>
            This loan calculator helps you estimate payments for various types of loans including:
            <InfoList>
              <InfoItem>Mortgages</InfoItem>
              <InfoItem>Auto loans</InfoItem>
              <InfoItem>Personal loans</InfoItem>
              <InfoItem>Student loans</InfoItem>
              <InfoItem>Business loans</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Understanding the Results:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Payment Amount:</strong> The amount you'll pay each period (weekly, bi-weekly, monthly, or quarterly)</InfoItem>
              <InfoItem><strong>Total of Payments:</strong> The total amount you'll pay over the life of the loan (principal + interest)</InfoItem>
              <InfoItem><strong>Total Interest:</strong> The total amount of interest you'll pay over the life of the loan</InfoItem>
              <InfoItem><strong>Amortization Schedule:</strong> A breakdown of each payment showing how much goes to principal and interest</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> This calculator provides estimates based on a fixed interest rate and does not account for additional fees, taxes, or insurance that may be required for certain types of loans.
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

const CalculatorSection = styled.div`
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

const TermInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  input {
    flex: 2;
  }
  
  select {
    flex: 1;
  }
`;

const CalculateButton = styled.button`
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
`;

const ResultSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryItem = styled.div`
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const SummaryLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #666;
`;

const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a90e2;
  margin-bottom: 0.25rem;
`;

const SummaryDetail = styled.div`
  font-size: 0.9rem;
  color: #999;
`;

const AmortizationTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
`;

const AmortizationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #ddd;
    
    &:first-child {
      text-align: left;
    }
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 500;
  }
  
  tr:hover {
    background-color: #f9f9f9;
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

const InfoSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 1.5rem 0 0.5rem;
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

const InfoNote = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 0 4px 4px 0;
`;

export default LoanCalculator;
