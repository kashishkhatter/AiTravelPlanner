import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../../constants/Colors'; // Ensure this import points to your colors file

const FlightInfo = ({ flight }) => {
  // Function to handle the booking button click
  const handleBooking = () => {
    if (flight.booking_url) {
      Linking.openURL(flight.booking_url).catch(err => console.error('Error opening URL:', err));
    } else {
      console.warn('No booking URL available.');
    }
  };

  // Check if flight details exist and is an array
  const flightDetails = Array.isArray(flight.details) ? flight.details[0] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️Flights </Text>

      {/* Display only the arrival airport */}
      <Text style={styles.airport}>
        Arrival Airport: {flightDetails ? flightDetails.arrival_airport : 'N/A'}
      </Text>

      {/* Render price with currency */}
      {flight.price ? (
        <Text style={styles.price}>
          Price: {flight.price.currency} {flight.price.amount}
        </Text>
      ) : (
        <Text style={styles.price}>Price: N/A</Text>
      )}

      {/* Book Now Button */}
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light_gray, // Adjust based on your color scheme
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1, // Add this line for the border
    marginTop: 0,
    width: '95%', // Reduced width to 85%
    alignSelf: 'center', // Center the container
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 10,
  },
  airport: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 5,
  },
  price: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 15,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});

export default FlightInfo;
