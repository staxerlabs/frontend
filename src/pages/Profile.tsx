import React from 'react';
import { CaretRight, PencilSimple, User, UserCircle } from '@phosphor-icons/react';
import BlackCard from '../components/BlackCard';
import '../styles/profile.css';

const Profile: React.FC = () => {
    return (
        <main className='profile'>
            <span className='profile-pic-title'>
                <UserCircle size={48}/>
                <p className='profile-nickname'>Nickname</p>
                {/* Insert edit profile link */}
                <PencilSimple size={16} weight="fill" />
            </span>

            <div>
                <h2>Customize preferences</h2>
                <hr/>
                <span className='profile-settings-row'>
                    
                    <User size={48} weight="fill" className='icon-stroke'/>
                    <p className='profile-settings-name'>Manage account settings</p>
                    <CaretRight size={16} />
                    
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