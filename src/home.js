import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const Home = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCMv4MfuqQ7a6FT8C7JW7TWdS3jzabMkBM', // Replace with your API key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
      console.log('Selected Place:', place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <h1>Google Maps Autocomplete Example</h1>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter a location"
          style={{
            width: '400px',
            height: '40px',
            padding: '10px',
          }}
        />
      </Autocomplete>
      <p>Selected Address: {address}</p>
    </div>
  );
};

export default Home;
