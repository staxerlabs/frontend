import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/newsafe.css'

interface CreateNewSafeProps {}

const CreateNewSafe: React.FC<CreateNewSafeProps> = () => {
    const navigate = useNavigate();
    const [safeName, setSafeName] = useState('');

  const CreateNewSafeClickHandler = () => {
    navigate('/newsafe/2')
  }
  const ChooseSafeProps = {
    label: 'Choose which safe you want to create',
    values: [
      'Employment icome',
      'Business revenue',
      'Trading',
      'Donations',
    ],
  };

  return (
      <main className="createsafe">
        <h2>Select what applies to you</h2>
        
        <Card text="A safe is a space for saving a part of your income automatically. You can create different rules for each safe."/>

        <select defaultValue="">
          <option value="" disabled hidden>Choose which safe you want to create</option>
          {(ChooseSafeProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>
        
        <span className='form-name'>
          <label htmlFor="safeName">Name of safe: </label>
          
          <input type='text' id='safeName' value={safeName} onChange={(e) => setSafeName(e.target.value)}/>
        </span>

        <Card text="Based on your previous answers, we recomment the following settings."/>

        <p>Withholding amount</p>
        <span className='form-text-button'>
          <input type='text' value='20% Income tax' readOnly/>
          <button>Change</button>
        </span>

        <p>Withholding account (20%)</p>
        <span className='form-text-button'>
          <input type='text' value='Public key / nickname' readOnly/>
          <button>Change</button>
        </span>

        <p>Spendings amount</p>
        <span className='form-text-button'>
        <input type='text' value='Public key / nickname' readOnly/>
          <button>Change</button>
        </span>

        <button onClick={CreateNewSafeClickHandler} className='button-wide'>Continue</button>

      </main>
  );
}

export default CreateNewSafe;
