import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import ButtonNewAccount from '../components/ButtonNewAccount';
import { getSafes } from '../utils/getSafes';
import AccountButton from '../components/AccountButton';

interface Safe {
    nickname: string;
    percentage: number;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('overview');
    const [walletShow, setWalletShow] = useState(false);
    const [safes, setSafes] = useState<Safe[]>([]);

    const SplitClaimClickHandler = () => {
        const message = encodeURIComponent("Your safes have been split and claimed.");
        const buttonText = encodeURIComponent("Dashboard");
        const route = encodeURIComponent("/dashboard");
        navigate(`/success/${message}/${buttonText}/${route}`)
      }
    
      useEffect(() => {
        getSafes().then((safes: Safe[]) => { // Assuming getSafes() returns an array of Safe objects
            setSafes(safes);
            console.log(safes)
        });
    }, []);

    return (
        <main className='dashboard'>
            <div className='dashboard-wallet-balance'>
                <div style={{"lineHeight": "2rem"}}>
                Wallet Balance
                    <span style={walletShow ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                        <h3>$ 0,00</h3>
                    </span>
                </div>
                  
                    
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
                        // In the future, add transition to the screen change
                        // onClick={() => setScreen('dashboard')}
                        onClick={() => navigate('/transaction-history')}
                    >Transaction history</button>
                </span>

                {/* Safes section */}
                <section>
                <h2>Active Safes</h2>
                <div className='dashboard-card-grid'>
                    {safes.map((safe: Safe) => 
                        <AccountButton
                            key={safe.nickname}
                            safe={safe}
                        />
                    )}
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