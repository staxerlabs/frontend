import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import ButtonNewAccount from '../components/ButtonNewAccount';
import { getSafes } from '../utils/getSafes';
import { getAccounts } from '../utils/getAccounts';
import AccountButton from '../components/AccountButton';
import SafeButton from '../components/SafeButton';

interface Safe {
    nickname: string;
    percentage: number;
}

interface Account {
    nickname: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('overview');
    const [walletShow, setWalletShow] = useState(false);
    const [safes, setSafes] = useState<Safe[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const SplitClaimClickHandler = () => {
        const message = encodeURIComponent("Your safes have been split and claimed.");
        const buttonText = encodeURIComponent("Dashboard");
        const route = encodeURIComponent("/dashboard");
        navigate(`/success/${message}/${buttonText}/${route}`)
      }
    
      useEffect(() => {
        getSafes().then((safes: Safe[] | Error) => { // Assuming getSafes() returns an array of Safe objects
            if (safes instanceof Array) {
                setSafes(safes);
            } else {
                console.error("Error occurred while fetching safes:")
            }
            
        });

        getAccounts().then((accounts: Account[] | Error) => { 
            if (accounts instanceof Array) {
                setAccounts(accounts);
            } else {
                console.error("Error occurred while fetching accounts:")
            }
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
                <h3>Active Safes</h3>
                <div className='dashboard-card-grid'>
                    {safes.map((safe: Safe) => 
                        <SafeButton
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
                    <h3>My Accounts</h3>
                    <div className='dashboard-card-grid'>
                            {accounts.map((account: Account) => 
                                <AccountButton
                                    key={account.nickname}
                                    account={account}
                                />
                            )}
                        <ButtonNewAccount/>
                </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard