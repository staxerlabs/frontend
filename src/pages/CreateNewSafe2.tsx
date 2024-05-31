import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/CardText';
import '../styles/newsafe.css'
import UnderDevelopmentTooltip from '../components/UnderDevTooltip';
import CreateSafe from '../utils/createSafe';

interface CreateNewSafe2Props {}

const CreateNewSafe2: React.FC<CreateNewSafe2Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = 1; // placeholder value: Get it from the local storage or contextAPI

  const {
    safeName,
    safeType,
    withholdingAccount,
    withholdingAmount,
    spendings,
    amount,
  } = location.state || {};

  const AddNextSafeClickHandler = async () => {
    try {
      await CreateSafe({
        safeName,
        safeType,
        withholdingAccount,
        withholdingAmount,
        spendings,
        amount,
        user_id
      });
      // Navigate to the next page if CreateSafe was successful
      navigate('/newsafe');
    } catch (error) {
      console.error('Error creating safe:', error);
      // Handle error, such as displaying an error message to the user
      // For example: setError('Failed to create safe');
    }
  }

  const NewSafeDoneClickHandler = async () => {
    try {
      await CreateSafe({safeName,
        safeType,
        withholdingAccount,
        withholdingAmount,
        spendings,
        amount,
        user_id})

        const message = encodeURIComponent("Your safe has been created.");
        const buttonText = encodeURIComponent("Dashboard");
        const route = encodeURIComponent("/dashboard");
        navigate(`/success/${message}/${buttonText}/${route}`)
    }
    catch (error){
      console.error('Error creating safe:', error);
      // Handle error, such as displaying an error message to the user
      // For example: setError('Failed to create safe');
    }
  }

  const currencyProps = {
    label: 'Do Not Convert',
    values: ['Do Not Convert',
      'USDC',
      'USDT',
      'DAI',
      'Add currency'
    ],
  };

  const decisionProps = {
    values: ['Yes', 'No'],
  };

  const staxerFeeProps = {
    label: '1% fee',
    values: [
        '1% fee',
        '2% fee',
        '3% fee'
    ]
  }

  return (
      <main>
        
        <Card text="Staxer can automatically convert the tokens you want to withheld."/>
        <span className='form-text-select'>
          <label htmlFor="autoEarn">Select "Withholding" currency <UnderDevelopmentTooltip/></label>
          <select defaultValue="Do Not Convert">
            {(currencyProps.values).map((value) => (
              <option 
                value={value} 
                key={value} 
                label={value}
                disabled={value != 'Do Not Convert'}
              />
            ))}
          </select>
        </span>
        
        <span className='form-text-select'>
        <label htmlFor="autoEarn">Select "spendings" currency <UnderDevelopmentTooltip/></label>
        <select defaultValue="Do Not Convert">
          {(currencyProps.values).map((value) => (
            <option 
              value={value} 
              key={value} 
              label={value} 
              disabled={value != 'Do Not Convert'} 
            />
          ))}
        </select>
        </span>
        
        <span className='form-text-select'>
          <span>
            <label htmlFor="autoEarn" className='disabled-text'>Enable auto-earn on withheld taxes </label>
            <UnderDevelopmentTooltip />    
          </span>
         
        <select defaultValue="Your decision" disabled>
          {(decisionProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>
        </span>

        <span className='form-text-select'>
          <label htmlFor="donate">Donate</label>
          <select defaultValue="Your decision">
            {(decisionProps.values).map((value) => (
              <option value={value} key={value} label={value}/>
            ))}
          </select>
        </span>
        
        <span className='form-text-select'>
        <label htmlFor="staxerFee">Contribute to Staxer <UnderDevelopmentTooltip/> </label>
        <select defaultValue="1% fee">
          {(staxerFeeProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>
        </span>

        <button onClick={AddNextSafeClickHandler} className='button-wide'>Done and New Safe</button>
        <button onClick={NewSafeDoneClickHandler} className='button-wide'>Continue</button>

      </main>
  );
}

export default CreateNewSafe2;
