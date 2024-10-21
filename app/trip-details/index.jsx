import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { Colors } from '../../constants/Colors'; 
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

const TripDetails = () => {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });

    if (trip) {
      try {
        const parsedTripDetails = JSON.parse(trip);
        setTripDetails(parsedTripDetails);
      } catch (error) {
        console.error('Error parsing trip data:', error);
      }
    } else {
      console.error('No trip data provided.');
    }
  }, [trip]);

  useEffect(() => {
    if (tripDetails) {
      console.log('Trip Plan Data:', tripDetails.tripPlan);
      console.log('Hotel Data:', tripDetails.tripPlan?.hotel);
      console.log('Travel Plan:', tripDetails.tripPlan?.travel_plan);
    }
  }, [tripDetails]);

  if (!tripDetails) {
    return <Text>No trip data available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: tripDetails.imageUrl }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.locationName}>
          {tripDetails.locationName || 'No Location'}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.date}>
            {tripDetails.startDate
              ? moment(tripDetails.startDate).format('DD MMM YYYY')
              : 'No Start Date'}
          </Text>

          <Text style={styles.traveler}>
            🚌 {tripDetails.traveler || 'Traveler not specified'}
          </Text>
        </View>
      </View>

      {/* Display flight information if available */}

      {tripDetails.tripPlan && tripDetails.tripPlan.flight ? (
        <FlightInfo flight={tripDetails.tripPlan.flight} />
      ) : (
        <Text style={styles.noFlightInfo}>No Flight Information Available</Text>
      )}

      {/* Display hotel information if available */}

      {tripDetails.tripPlan && Array.isArray(tripDetails.tripPlan.hotel) && tripDetails.tripPlan.hotel.length > 0 ? (
        <HotelList hotels={tripDetails.tripPlan.hotel} />
      ) : (
        <Text style={styles.noFlightInfo}>No Hotel Information Available</Text>
      )}

      {tripDetails.tripPlan && tripDetails.tripPlan.travel_plan ? (
        <PlannedTrip itenary={tripDetails.tripPlan.travel_plan} />
      ) : (
        <Text style={styles.noFlightInfo}>No travel plan Information Available</Text>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor:Colors.light_gray
  },
  image: {
    width: '100%',
    height: 260,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 1,
  },
  detailsContainer: {
    padding: 20,
    marginTop: 10,
  },
  locationName: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  date: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.grey,
  },
  traveler: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.grey,
  },
  noFlightInfo: {
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.grey,
    marginTop: 20,
  },
});

export default TripDetails;
