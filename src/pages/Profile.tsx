import React, { useEffect, useState } from 'react';
import { CaretRight, PencilSimple, User, UserCircle } from '@phosphor-icons/react';
import BlackCard from '../components/BlackCard';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import getUserData from '../utils/getUserData';

const Profile: React.FC = () => {
    const user_id = 1;
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from database
                const userData = await getUserData(user_id);
                if (Array.isArray(userData) && userData.length > 0) {
                    const nicknameData = userData[0].nickname;
                    setNickname(nicknameData);
                    // Insert handler function here
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <main className='profile'>
            <span className='profile-pic-title'>
                <UserCircle size={48}/>
                <p className='profile-nickname'>{nickname}</p>
                {/* Insert edit profile link */}
                <PencilSimple size={24} weight="fill" className='icon-clickable' onClick={() => navigate('/user-settings/:user_id')}/>
            </span>

            <div>
                <h2>Customize preferences</h2>
                <hr/>
                <span className='profile-settings-row'>
                    
                    <User size={48} weight="fill" className='icon-stroke'/>
                    <p className='profile-settings-name'>Manage account settings</p>
                    <CaretRight size={20} className='icon-clickable' onClick={() => navigate('/user-settings/:user_id')} />
                    
                </span>
                <hr/>
            </div>

            <BlackCard text='Soon, a $10 bonus for referrals in Staxer!'/>
            {/* Insert handler function here */}
            <button className='button-light button-wide'>Sign out</button>
        </main>
    );
}

export default Profile