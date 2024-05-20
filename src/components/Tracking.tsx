import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.css'

interface TrackingProps {}

const Tracking: React.FC<TrackingProps> = () => {
    const navigate = useNavigate();

  const TrackingClickHandler = () => {
    navigate('/location')
  }

  return (
      <main className="onboarding">
        <h2>Location Tracking</h2>
        <p>Staxer can help keep a record of where you are in the world. The tax authorities in many countries will request your travel itinerary per day to determine your tax obligation. Do you want Staxer to help keep a record of your location?</p>
        <span className='button-row'>
            <button onClick={TrackingClickHandler} className='button-light'>No</button>
            <button onClick={TrackingClickHandler}>Yes</button>
        </span>
        
      </main>
  );
}

export default Tracking;
