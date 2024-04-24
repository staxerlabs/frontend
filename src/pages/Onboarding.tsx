import React, { useState } from 'react';
import WorldId from '../components/WorldId';
import Location from '../components/Location';

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = () => {

    return (
            <main>
                <WorldId/>    
            </main>
    );
};

export default Onboarding;
