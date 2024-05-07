import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

const ButtonNewAccount: React.FC = () => {
    const navigate = useNavigate();
    
    return(
        <div 
            className='card-grid dashboard-grid-add-account'
            onClick={() => navigate('/new-account')}
        >
                        <p>New Account</p>
                        <FaPlus />
                    </div>
    )

}

export default ButtonNewAccount;
