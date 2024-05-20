import React from 'react';
// import { Fingerprint } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/staxer-black.png'
import worldid_white from '../assets/worldid_white.png'
import '../styles/onboarding.css'

interface WorldIdProps {}

const WorldId: React.FC<WorldIdProps> = () => {
    const navigate = useNavigate();

  const worldIdClickHandler = () => {
    navigate('/tracking')
  }

  return (
      <main className="onboarding">
        <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Automate your tax withholdings and earn interest on withheld taxes.
                </p>

        <button onClick={worldIdClickHandler} className='button-wide'> 
          <img src={worldid_white} alt="worldid" className="icon" />
          Verify with World ID
        </button>
      </main>
  );
}

export default WorldId;
