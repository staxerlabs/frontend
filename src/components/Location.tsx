import { MdPlace } from "react-icons/md";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/onboarding.css'

interface LocationProps {}

const Location: React.FC<LocationProps> = () => {
    const navigate = useNavigate();

  const LocationClickHandler = () => {
    navigate('/tracking')
  }

  return (
      <main className="onboarding">
        <Link to='/tracking' className="skip-link">Skip</Link>
        <span className='onboarding-title'>
          <MdPlace /> What's your location?
          {/* Insert question mark */}
        </span>

        <input type="text" placeholder="What's your default text location?" />

        <button onClick={LocationClickHandler}>Confirm</button>
      </main>
  );
}

export default Location;
