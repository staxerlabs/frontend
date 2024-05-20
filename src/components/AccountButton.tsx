import React from 'react';
// import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'

interface Account {
    nickname: string;
}

interface NewAccountProps {
    account: Account;
}

const ButtonNewAccount: React.FC<NewAccountProps> = ({account}) => {
    // const navigate = useNavigate();
    
    return(
        <div 
            className='card-grid'
            // onClick={() => navigate('/newsafe')}
        >
                        <p><b>{account.nickname}</b></p>
                        
                    </div>
    )

}

export default ButtonNewAccount;
