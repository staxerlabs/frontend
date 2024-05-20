import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.css'
import CardText from './CardText';
import getLocationfromGeocode from '../utils/getLocationfromGeocode';

interface TrackingProps {}

const Tracking: React.FC<TrackingProps> = () => {
  const navigate = useNavigate();
  const [showCard, setShowCard] = React.useState<boolean>(false);
  const [locationWarning, setLocationWarning] = React.useState<string>('');

  const TrackingClickHandler = () => {
    // Location tracking
    if (navigator.geolocation) {
      getUserLocation()

    } else {
      // Add an error message below the button
      console.error('Geolocation is not supported by this browser.')
      setLocationWarning('Geolocation is not supported by this browser.')
      setShowCard(true)
    }
    // navigate('/location')
  }

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(storePosition, handleLocationError)
  }

  const storePosition = async (position: GeolocationPosition) => {
    const geodata = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  
    const currentLocation = await getLocationfromGeocode(geodata.latitude, geodata.longitude);
    console.log(currentLocation)

    if (!currentLocation || currentLocation.length === 0){
      setLocationWarning('Location tracking is not available in your area. Please try again later.')
      setShowCard(true)
    }
  }

  const handleLocationError = (error: GeolocationPositionError) => {
    console.error('Geolocation error:', error);
    setLocationWarning('An error occurred while retrieving your location. Please try again.');
    setShowCard(true);
  };

  return (
      <main className="onboarding">
        <h2>Location Tracking</h2>
        <p>Staxer can help keep a record of where you are in the world. The tax authorities in many countries will request your travel itinerary per day to determine your tax obligation. Do you want Staxer to help keep a record of your location?</p>

        <CardText text='As we are still in early development, this feature is still to be fully functional. We intend to update the location automatically in the future.' />

        <span className='button-row'>
            <button onClick={() => navigate('/location')} className='button-light'>No</button>
            <button onClick={TrackingClickHandler}>Yes</button>
        </span>

        {showCard && <CardText text={locationWarning}/>}
        
      </main>
  );
}

export default Tracking;
