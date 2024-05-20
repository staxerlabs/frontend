import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from "@phosphor-icons/react";
import CustomTooltip from "./CustomTooltip";
import apiKey from "../utils/location_api";
import '../styles/onboarding.css'
import debounce from 'lodash/debounce'
import { checkCountry } from '../utils/supabaseLocation';

interface LocationProps {}

const Location: React.FC<LocationProps> = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [countryCode, setCountryCode] = useState<string>('');
  const [countryName, setCountryName] = useState<string>('');

  const fetchLocationSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      const api_url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${location}&types=area&lang=en&apiKey=${apiKey}`

      try {
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data.items)
        setResults(data.items);
        
      } catch (error) {
        console.error('Error fetching location:', error);
        setResults([]);
      }
    }, 300), // 300ms debounce delay
    [location]
  );

  useEffect(() => {
    fetchLocationSuggestions(location);
  }, [location, fetchLocationSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const resultClickerHandler = (location_data: object) => {
    // Adds location info at state level if user is in US or Canada
    const countryCode = location_data.address.countryCode
    const countryName = location_data.address.countryName
    
    if (countryCode === 'USA' || countryCode === 'CAN') {
      setCountryCode(location_data.address.stateCode) 
      setCountryName(location_data.address.state) 
    } else {
      setCountryCode(countryCode)
      setCountryName(countryName)
    }
    setLocation(location_data.title)
    setResults([])
  }

  const LocationClickHandler = async () => {
    await console.log(location)
    // Placeholder user_id: 1
    checkCountry(countryName, countryCode, 1)
    navigate('/selectrates')
  }

  return (
      <main className="onboarding">
        <Link to='/tracking' className="skip-link">Skip</Link>
        <span className='onboarding-title'>
          <MapPin size={24} weight='fill' /> 
          &nbsp;
          What's your main location?
          &nbsp;
          <CustomTooltip text='Please type the location of your main tax residency.'/>
        </span>

        <div>
        <input type="text" placeholder="What's your default location?"  value={location} onChange={handleInputChange} className='location-input'/>

          {/* Autocomplete results */}
          <div className='location-autocomplete-results'>
            <ul>
              {results.map((result, index) => (
                <li key={index} onClick={() => resultClickerHandler(result)}>{result.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={LocationClickHandler}>Confirm</button>
      </main>
  );
}

export default Location;
