import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/CardText';
import '../styles/newsafe.css'

interface CreateNewSafe2Props {}

const CreateNewSafe2: React.FC<CreateNewSafe2Props> = () => {
    const navigate = useNavigate();

  const AddNextSafeClickHandler = () => {
    navigate('/newsafe')
  }

  const NewSafeDoneClickHandler = () => {
    const message = encodeURIComponent("Your safe has been created.");
    const buttonText = encodeURIComponent("Dashboard");
    const route = encodeURIComponent("/dashboard");
    navigate(`/success/${message}/${buttonText}/${route}`)
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

        <label htmlFor="autoEarn">Select "Withholding" currency</label>
        <select defaultValue="Do Not Convert">
          {(currencyProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>
        
        <label htmlFor="autoEarn">Select "spendings" currency</label>
        <select defaultValue="Do Not Convert">
          {(currencyProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>

        <label htmlFor="autoEarn">Enable auto-earn on withheld taxes</label>
        <select defaultValue="Your decision">
          {(decisionProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>

        <label htmlFor="donate">Donate</label>
        <select defaultValue="Your decision">
          {(decisionProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>
        
        <label htmlFor="staxerFee">Contribute to Staxer</label>
        <select defaultValue="1% fee">
          {(staxerFeeProps.values).map((value) => (
            <option value={value} key={value} label={value}/>
          ))}
        </select>

        <button onClick={AddNextSafeClickHandler} className='button-wide'>Done and New Safe</button>
        <button onClick={NewSafeDoneClickHandler} className='button-wide'>Continue</button>

      </main>
  );
}

export default CreateNewSafe2;
