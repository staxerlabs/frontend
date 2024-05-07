import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import ButtonNewAccount from '../components/ButtonNewAccount';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('overview');
    const [walletShow, setWalletShow] = useState(false);

    const SplitClaimClickHandler = () => {
        const message = encodeURIComponent("Your safes have been split and claimed.");
        const buttonText = encodeURIComponent("Dashboard");
        const route = encodeURIComponent("/dashboard");
        navigate(`/success/${message}/${buttonText}/${route}`)
      }

    return (
        <main className='dashboard'>
            <div className='dashboard-wallet-balance'>
                <span style={walletShow ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                    Wallet Balance
                    <h3>$ 22,00</h3>
                </span>
                <p></p>
                <p></p>
                <button onClick={() => setWalletShow(!walletShow)}>
                    {walletShow ? 'show' : 'hide'}
                </button>
            </div>

            <div className='dashboard-container'>
                <span className='dashboard-menu'>
                    <button 
                        className={screen == 'overview' ? 'dashboard-title-active' : 'dashboard-title-inactive' }
                        onClick={() => setScreen('overview')}
                    >Overview</button>
                    <button 
                        className={screen == 'overview' ? 'dashboard-title-inactive' : 'dashboard-title-active' }
                        // onClick={() => setScreen('dashboard')}
                        onClick={() => navigate('/transaction-history')}
                    >Transaction history</button>
                </span>

                <section>
                <h2>Active Safes</h2>
                <div className='dashboard-card-grid'>
                    <ButtonNewAccount/>
                </div>
                <button 
                    className='button-light button-wide'
                    onClick={SplitClaimClickHandler}
                >Split & Claim</button>
                </section>

                <section>
                    <h2>My Accounts</h2>
                    <div className='dashboard-card-grid'>
                        <ButtonNewAccount/>
                </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard