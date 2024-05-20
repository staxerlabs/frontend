import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'

interface Safe {
    nickname: string;
    percentage: number;
}

interface NewSafeProps {
    safe: Safe;
}

const ButtonNewAccount: React.FC<NewSafeProps> = ({safe}) => {
    const navigate = useNavigate();
    
    return(
        <div 
            className='card-grid'
            // onClick={() => navigate('/newsafe')}
        >
                        <p><b>{safe.nickname}</b></p>
                        {safe.percentage}
                    </div>
    )

}

export default ButtonNewAccount;
