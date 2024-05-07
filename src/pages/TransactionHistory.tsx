import React from "react";
import '../styles/transaction-history.css'
import data from '../utils/transaction.json'
import TransactionCard from '../components/TransactionCard'
import { useNavigate } from "react-router-dom";

const TransactionHistory: React.FC = () => {
    const navigate = useNavigate();
    return (
        <main className="history-container">
            <h1>Transaction History</h1>
            {data.map(transaction => (
                <TransactionCard key={transaction.transaction_id} transaction={transaction} />
            ))}
            
         <button 
            onClick={() => navigate('/dashboard')}
            className="button-wide"
         >Back to dashboard</button>       
        </main>
    );
}

export default TransactionHistory;