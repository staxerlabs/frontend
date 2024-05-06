import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/success.css';
import successImage from '../assets/success.png';

interface SuccessProps {
    message: string;
    buttonText: string;
    route: string;
}

const Success: React.FC = () => {
    const { message, buttonText, route } = useParams<SuccessProps>();

    const navigate = useNavigate();

    return (
        <div className="success-screen">
            <h1>Success!</h1>
            <img src={successImage} alt="" />
            <h2>{decodeURIComponent(message)}</h2>
            <button onClick={() => navigate(decodeURIComponent(route)) }>{decodeURIComponent(buttonText)}</button>
        </div>
    );
};

export default Success;
