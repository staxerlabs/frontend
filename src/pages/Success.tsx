import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/success.css';
import successImage from '../assets/success.png';

type SuccessProps = {
    message: string;
    buttonText: string;
    route: string;
}

const Success: React.FC = () => {
    // const { message, buttonText, route } = useParams<{message: string, buttonText: string,      route: string}>();
    const { message, buttonText, route } = useParams<SuccessProps>();

    const navigate = useNavigate();

    return (
        <div className="success-screen">
            <h1>Success!</h1>
            <img src={successImage} alt="" />
            <h2>{message}</h2>
            {/* It sends the user to the dashboard if there's no passed route */}
            <button onClick={() => navigate(route || '/dashboard') }>{buttonText}</button>
        </div>
    );
};

export default Success;
