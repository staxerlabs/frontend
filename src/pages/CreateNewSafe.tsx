import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

interface CreateNewSafeProps {}

const CreateNewSafe: React.FC<CreateNewSafeProps> = () => {
    const navigate = useNavigate();

  const CreateNewSafeClickHandler = () => {
    navigate('/newsafe/2')
  }
  const DropDownProps = {
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
        
        <Card text="A sade is a space for saving a part of your income automatically. You can create different rules for each safe."/>

        <select defaultValue="">
          <option value="" disabled hidden>Choose which safe you want to create</option>
          {(DropDownProps.values).map((value) => (
            <option value={value} key={value}>{value}</option>
          ))}
        </select>
        
        <button onClick={CreateNewSafeClickHandler}>Continue</button>
        
        <span>
          Name of safe: 
          <input type='text'>Employment income</input>
        </span>

        <Card text=""></Card>
      </main>
  );
}

export default CreateNewSafe;
