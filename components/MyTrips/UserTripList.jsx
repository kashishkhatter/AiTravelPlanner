import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import UserTripCard from './UserTripCard';
import axios from 'axios';
import { useRouter } from 'expo-router';

const UserTripList = ({ userTrips }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [latestTrip, setLatestTrip] = useState(null);
  const API_KEY = '46513422-f16be0e1b522a7ec3822566e6';
  const router = useRouter();

  useEffect(() => {
    let foundTrip = null;

    for (const trip of userTrips) {
      if (trip.tripData) {
        try {
          foundTrip = JSON.parse(trip.tripData);
          // Add tripPlan if it exists in the trip
          if (trip.tripPlan) {
            foundTrip.tripPlan = trip.tripPlan;
          }
          break; // Exit loop after finding the first valid tripData
        } catch (error) {
          console.error('Error parsing tripData:', error);
        }
      }
    }
    console.log(userTrips);
    setLatestTrip(foundTrip); // Set the latest trip here
  }, [userTrips]);

  useEffect(() => {
    if (latestTrip) {
      const locationName = latestTrip.locationInfo?.name || 'default';
      fetchImage(locationName);
    }
  }, [latestTrip]);

  const fetchImage = async (location) => {
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
        setImageUrl('https://via.placeholder.com/800x600');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl('https://via.placeholder.com/800x600');
    } finally {
      setLoading(false);
    }
  };

  // If no trips are available, return an early message
  if (!userTrips || userTrips.length === 0) {
    return <Text>No trips available</Text>;
  }

  // If there is no latest trip data, return an error message
  if (!latestTrip) {
    return <Text>Error loading trip data</Text>;
  }

  return (
    <GestureHandlerRootView>
      <View>
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: '100%', height: 240, borderRadius: 15 }}
              resizeMode="cover"
            />
          )}

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>
              {latestTrip.locationInfo?.name || 'No Location'}
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}
            >
              <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.grey }}>
                {latestTrip.startDate ? moment(latestTrip.startDate).format('DD MMM YYYY') : 'No Start Date'}
              </Text>

              <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.grey }}>
                🚌 {latestTrip.traveler?.title ?? 'Traveler not specified'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/trip-details',
                  params: {
                    trip: JSON.stringify({
                      imageUrl, // Pass the selected image
                      locationName: latestTrip.locationInfo?.name || 'No Location',
                      startDate: latestTrip.startDate || 'No Start Date',
                      traveler: latestTrip.traveler?.title || 'Traveler not specified',
                      flightInfo: latestTrip.tripPlan?.flight || {},
                      // Pass the entire tripPlan
                      
                      tripPlan: latestTrip.tripPlan || {}, // Pass the tripPlan here
                    }),
                  },
                })
              }
              
              style={{
                backgroundColor: Colors.primary,
                padding: 15,
                borderRadius: 15,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  textAlign: 'center',
                  fontFamily: 'outfit-medium',
                  fontSize: 15,
                }}
              >
                See Your Plan
              </Text>
            </TouchableOpacity>
          </View>

          {userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default UserTripList;
