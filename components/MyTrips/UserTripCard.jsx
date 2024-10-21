import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Use expo-router to navigate

const UserTripCard = ({ trip }) => {
  const [imageUrl, setImageUrl] = useState(''); // State for the fetched image URL
  const [loading, setLoading] = useState(true); // State for loading indicator
  const API_KEY = '46513422-f16be0e1b522a7ec3822566e6'; // Replace with your actual Pixabay API key
  const router = useRouter(); // Initialize the router

  const formatData = (data) => {
    if (typeof data === 'string' && data.trim()) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing trip data:', error);
      }
    } else {
      console.warn('tripData is not a valid string:', data);
    }
    return null; // Return null if parsing fails
  };

  // Ensure we're accessing the tripData from the correct object
  const tripDataString = trip.tripData || '{}'; // Use an empty object if tripData is invalid
  const tripData = formatData(tripDataString); // Attempt to parse the tripData

  // Access traveler data directly from the parsed tripData
  const travelerName = tripData?.traveler?.title || 'Traveler not specified'; // Use traveler title
  const startDate = tripData
    ? moment(tripData.startDate).format('DD MMM YYYY')
    : 'No trip data available';
  const locationName = tripData?.locationInfo?.name || 'Default Location'; // Fallback to a default name
  const flightInfo = trip.tripPlan?.flight;
  const tripPlan = trip.tripPlan || {}; // Full trip plan

  // Function to fetch image from Pixabay
  const fetchImage = async (location) => {
    if (!location || typeof location !== 'string') {
      console.warn('Invalid location name:', location);
      setImageUrl('https://via.placeholder.com/100'); // Default placeholder image
      setLoading(false);
      return;
    }

    console.log('Fetching image for:', location);
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: location,
          image_type: 'photo',
          per_page: 5,
        },
      });

      if (response.data.hits.length > 0) {
        setImageUrl(response.data.hits[0].largeImageURL);
      } else {
        console.log('No images found for the location');
        setImageUrl('https://via.placeholder.com/100');
      }
    } catch (error) {
      console.error('Error fetching image:', error.message); // Log the error message
      setImageUrl('https://via.placeholder.com/100'); // Default placeholder image
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch image when component mounts or when locationName changes
  useEffect(() => {
    fetchImage(locationName); // Fetch image for the location
  }, [locationName]);

  // Function to handle navigation to TripDetails
  const handlePress = () => {
    router.push({
      pathname: '/trip-details',
      params: {
        trip: JSON.stringify({
          imageUrl,
          locationName,
          startDate: tripData?.startDate,
          traveler: travelerName,
          flightInfo, // Include flight info
          tripPlan, // Pass the entire trip plan
        }),
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" /> // Loading indicator
      ) : (
        <Image
          source={{ uri: imageUrl }} // Use the fetched image URL
          style={styles.image}
        />
      )}
      <View>
        <Text style={styles.loc}>{locationName}</Text>
        <Text style={styles.traveler}>{startDate}</Text>
        <Text style={styles.traveler}>{travelerName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15, // Optional: round the image
  },
  loc: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  traveler: {
    fontSize: 14,
    color: '#666',
    marginLeft: 20,
  },
});

export default UserTripCard;
