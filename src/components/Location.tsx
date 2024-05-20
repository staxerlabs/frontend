import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from "@phosphor-icons/react";
import CustomTooltip from "./CustomTooltip";
import apiKey from "../utils/location_api";
import '../styles/onboarding.css'
import supabase from '../utils/supabase';
import debounce from 'lodash/debounce'
import { checkCountry } from '../utils/supabaseLocation';
import CardText from './CardText';

interface LocationProps {}

const Location: React.FC<LocationProps> = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  const fetchLocationSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('countries_and_states')
          .select('description, name')
          .ilike('description', `%${query}%`);

        if (error) {
          throw new Error(`Error fetching location suggestions: ${error.message}`);
        }

        console.log('Fetched locations:', data);
        setResults(data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setResults([]);
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    fetchLocationSuggestions(location);
  }, [location, fetchLocationSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const resultClickerHandler = (location_name: string) => {
    setLocation(location_name)
    setResults([])
  }

  const LocationClickHandler = async () => {
    await console.log(location)
    // Placeholder user_id: 1
    navigate('/selectrates')
  }

  return (
      <main className="onboarding">
        <Link to='/selectrates' className="skip-link">Skip</Link>
        <span className='onboarding-title'>
          <MapPin size={24} weight='fill' /> 
          &nbsp;
          What's your main location?
          &nbsp;
          <CustomTooltip text='Please type the location of your main tax residency.'/>
        </span>

        <div className='location-search'>
        <input 
          type="text" 
          placeholder="What's your default location?"  
          value={location} 
          onChange={handleInputChange} 
          className='location-input'
        />

          {/* Autocomplete results */}
          <div className='location-autocomplete-results'>
            <ul>
              {results.map((result, index) => (
                <li key={index} onClick={() => resultClickerHandler(result.description)}>{result.description}</li>
              ))}
            </ul>
          </div>
        </div>

        <CardText text='As we are still in the early development stages, we provide support for a small number of countries, but we intend to extend that number in the future.'/>

        <button onClick={LocationClickHandler}>Confirm</button>
      </main>
  );
}

export default Location;
