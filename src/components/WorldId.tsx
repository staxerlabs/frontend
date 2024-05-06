import React from 'react';
import { TfiWorld } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.css'

interface WorldIdProps {}

const WorldId: React.FC<WorldIdProps> = () => {
    const navigate = useNavigate();

  const worldIdClickHandler = () => {
    navigate('/location')
  }

  return (
      <main className="onboarding">
        <span className='onboarding-title'>
          <TfiWorld /> World ID
        </span>
        <button onClick={worldIdClickHandler}>Verify with World ID</button>
      </main>
  );
}

export default WorldId;
