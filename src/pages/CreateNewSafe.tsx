import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/CardText';
import supabase from '../utils/supabase';
import CustomTooltip from '../components/CustomTooltip';
import suggestRates from '../utils/suggestRates';
import '../styles/newsafe.css'

interface CreateNewSafeProps {}

const CreateNewSafe: React.FC<CreateNewSafeProps> = () => {
    // get user_id
    const user_id = 1;
    const user_location = 6;

    const navigate = useNavigate();
    const [safeName, setSafeName] = useState('');
    const [safeTypes, setSafeTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [safeType, setSafeType] = useState<string>('');
    const [withholdingAccount, setWithholdingAccount] = useState<string>(''); // [public key / nickname
    const [withholdingAmount, setWithholdingAmount] = useState<number>(0);
    const [spendings, setSpendings] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
      const fetchSafeTypes = async () => {
      try {
        let { data: safe_types, error } = await supabase
        .from('safe_types')
        .select('description')

        if (error) {
          console.error('Error fetching safe types:', error);
        } else {
            // Extract descriptions from the fetched data
            // Array.isArray is used to check if safe_types isn't null
            if (Array.isArray(safe_types)) {
              const descriptions = safe_types.map(type => type.description);
              setSafeTypes(descriptions);
            }
        }
      }
      catch (error) {
        console.error('Error fetching safe types:', error);
      }
      finally {
        setLoading(false);
      }
      };
  
      fetchSafeTypes();
    }, []);

    const calculateSpendings = (1 - (withholdingAmount / 100))*100;

    const handleSafeTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedSafeType = e.target.value;
      setSafeType(selectedSafeType);
      if (selectedSafeType !== 'Employment income') {
        try {
          const suggestedRate = await suggestRates(selectedSafeType, user_location);
          setWithholdingAmount(suggestedRate);
        } catch (error) {
          console.error('Error suggesting rates:', error);
        }
      }
    };
  
    const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAmount = parseFloat(e.target.value);
      setAmount(newAmount);
      if (safeType) {
        try {
          const suggestedRate = await suggestRates(safeType, user_location, newAmount);
          setWithholdingAmount(suggestedRate);
        } catch (error) {
          console.error('Error suggesting rates:', error);
        }
      }
    };
  
    const CreateNewSafeClickHandler = () => {
      if (!safeType) {
          alert('Please select a safe type.');
        return;} else if (!withholdingAmount) {
          alert('Please enter a withholding amount.');
        return;}
      
      // Send new safe info to the backend
      

      navigate('/newsafe/2');
    };

  return (
      <main className="createsafe">
        <h2>Select what applies to you</h2>
        
        <Card text="A safe is a space for saving a part of your income automatically. You can create different rules for each safe."/>

        {loading ? (
        <p>Loading...</p>
      ) : (
        <select defaultValue="" value={safeType} onChange={handleSafeTypeChange} className='form-select-wide'>
          <option value="" disabled hidden>Choose which safe you want to create</option>
          {safeTypes.map((description, index) => (
            <option value={description} key={index} label={description}>{description}</option>
          ))}
        </select>
      )}
        
        <span className='form-name'>
          <label htmlFor="safeName">Name of safe: </label>
          
          <input type='text' id='safeName' value={safeName} onChange={(e) => 
              {
                setSafeName(e.target.value)
                
              }
              }/>
        </span>

        <span className='form-name' style={{ display: safeType === 'Employment income' ? 'block' : 'none' }}>
          <label htmlFor="safeName">Income amount: <CustomTooltip text='Insert your crypto income as a result of employment.' /></label>
          <input type='text' id='amount' value={amount} onChange={handleAmountChange} />
        </span>

        <Card text="Based on your previous answers, we recomment the following settings."/>

        <p>Withholding amount <CustomTooltip text='Income Tax'/> </p>
        <span className='form-text-button'>
          <input type='text' placeholder='20%' onChange={(e) => setWithholdingAmount(parseFloat(e.target.value))}/>
        </span>

        <p>Withholding account <CustomTooltip text='Plase add a name to your withholding account.'/></p>
        <span className='form-text-button'>
          <input type='text' placeholder='Public key / nickname' onChange={(e) => setWithholdingAccount(e.target.value)}/>
        </span>

        <p>Spendings amount</p>
        <span className='form-text-button'>
        <input type='text' value={calculateSpendings} readOnly onChange={(e) => setSpendings(parseFloat(e.target.value))}/>
        </span>

        <button onClick={CreateNewSafeClickHandler} className='button-wide'>Continue</button>

      </main>
  );
}


export default CreateNewSafe;
