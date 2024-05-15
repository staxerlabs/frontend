import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';

const ButtonNewAccount: React.FC = () => {
    const navigate = useNavigate();
    
    return(
        <div 
            className='card-grid dashboard-grid-add-account'
            onClick={() => navigate('/newsafe')}
        >
                        <p>New Account</p>
                        <Plus size={32} />
                    </div>
    )

}

export default ButtonNewAccount;
