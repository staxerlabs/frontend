import React from "react";
import '../styles/transaction-card.css'
import { useNavigate } from "react-router-dom";

interface Transaction {
    name: string;
    transaction_id: number;
    senders_wallet: string;
    amount: number;
    timestamp: number;
    main_allocated: number;
    withholding_allocated: number;
  }
  
  interface TransactionCardProps {
    transaction: Transaction;
  }

const TransactionCard: React.FC<TransactionCardProps> = ({transaction}) => {
    const navigate = useNavigate();

    return (
        <div className="transaction-card">
  
                <h2># {transaction.name}</h2>
                <button 
                        onClick={() => navigate(`/edit-transaction/${transaction.transaction_id}`)}
                        className="mini-button"
                    >Edit
                </button>
           
            
            <div className="transaction-card-section">
                <p><strong>Transaction ID:</strong> {transaction.transaction_id}</p>
                <p><strong>Sender's Wallet:</strong> {transaction.senders_wallet}</p>
                <p><strong>Amount:</strong> {transaction.amount} BTC</p>
                <p><strong>Timestamp:</strong> {transaction.timestamp}</p>
            </div>
            <h3>Main Account Allocation</h3>
            <div className="transaction-card-section">
                <p><strong>Main Allocated:</strong> {transaction.main_allocated} BTC</p>
            </div>

            <h3>Main Account Allocation</h3>
            <div className="transaction-card-section">
                <p><strong>Withholding Allocated:</strong> {transaction.withholding_allocated} BTC</p>
            </div>
            
            
        </div>
    );
}

export default TransactionCard;