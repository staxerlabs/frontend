import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import { Plus } from '@phosphor-icons/react';

const ButtonNewSafe: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className='card-grid dashboard-grid-add-account' onClick={() => navigate('/newsafe')}>
            <p><b>New Safe</b></p>
            <Plus size={32} />
        </div>
    );
}

export default ButtonNewSafe;

