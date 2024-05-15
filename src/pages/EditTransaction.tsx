import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../utils/transaction.json";
import UnderDevTooltip from "../components/UnderDevTooltip";
import "../styles/edit-transaction.css";

const EditTransaction: React.FC = () => {

    // Get transaction id
    const transaction_id = useParams<{transaction_id: string}>().transaction_id;
    const transaction = data[0];
    const navigate = useNavigate();

    return (
        <main>
            <h1>Edit Transaction # {transaction_id}</h1>
            <button 
                    onClick={() => navigate('/dashboard')}
                    className="button-wide mini-button"
                > &lt; Dashboard</button>  

            <div className="transaction-card-section">

                <p><strong>Transaction ID:</strong> {transaction.transaction_id}</p>
                <p><strong>Sender's Wallet:</strong> {transaction.senders_wallet}</p>
                <p><strong>Amount:</strong> {transaction.amount} BTC</p>
                <p><strong>Timestamp:</strong> {transaction.timestamp}</p>

            </div>

            
            <h2>Transaction Name</h2>
            <input type="text" placeholder="Enter a name for this transaction" />
            
            <section className="edit-additional-section">
                <span className="edit-additional-title">
                    <h2 className="disabled-text">Additional Options</h2>
                    <UnderDevTooltip/>
                </span>
                <button disabled>Upload invoice</button>
                <button disabled>Add notes</button>
                <button disabled className="button-wide edit-additional-title">Revert Withholding</button>
            </section>

            <button 
                className="button-wide"
                onClick={() => alert("Transaction saved!")}
            >Save</button>
        </main>
    );
}

export default EditTransaction;