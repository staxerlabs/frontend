import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/onboarding.css'
import Card from './Card';

interface SelectRatesProps {}

const SelectRates: React.FC<SelectRatesProps> = () => {
    const navigate = useNavigate();

  const SelectRatesClickHandler = () => {
    navigate('/homepage/SelectRates')
  }

  return (
      <main className="onboarding">
        <h2>Select what applies to you</h2>
        
        <Card text="Your withholding rate defines your percentage  auto-deducting from incoming funds to your wallet for taxes or expenses."/>

        <div className="rates-grid">
            <span className='rates-headline'>tax rate</span>

            <input type="checkbox" />
            <p>I trade</p>
            <input type="text" placeholder='20%'/>

            <input type="checkbox" />
            <p>I receive income</p>
            <input type="text" placeholder='20%'/>

            <input type="checkbox" />
            <p>I donate</p>
            <input type="text" placeholder='10%'/>
        </div>
        
        <button onClick={SelectRatesClickHandler}>Continue</button>
        
        
      </main>
  );
}

export default SelectRates;
