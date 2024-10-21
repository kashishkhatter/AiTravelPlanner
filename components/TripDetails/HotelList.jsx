import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Colors } from '../../constants/Colors'; // Adjust the path as necessary

const HotelList = ({ hotels }) => {
  const [hotelImages, setHotelImages] = useState({});
  const [loading, setLoading] = useState(true);
  const UNSPLASH_ACCESS_KEY = 'l_bdk0toY78YgpLhmeboXAjQsukiv2XJfUaM7Hcv4hw'; // Replace with your Unsplash access key

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = {};
      setLoading(true);

      for (const hotel of hotels) {
        const hotelName = hotel.name?.trim() || 'default hotel';
        const location = hotel.location?.trim() || 'default location'; // Assuming you have location info
        const query = `${hotelName} hotel ${location}`; // Create a unique query for each hotel

        try {
          const imageUrl = await fetchImageFromUnsplash(query);
          updatedImages[hotelName] = imageUrl || 'https://via.placeholder.com/150'; // Fallback to placeholder
        } catch (error) {
          console.error(`Error fetching image for hotel ${hotelName}:`, error);
          updatedImages[hotelName] = 'https://via.placeholder.com/150'; // Fallback to placeholder
        }
      }
      
      setHotelImages(updatedImages);
      setLoading(false);
    };

    fetchImages();
  }, [hotels]);

  const fetchImageFromUnsplash = async (query) => {
    const requestURL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=10`;

    const response = await axios.get(requestURL);
    const results = response.data.results;

    if (results.length > 0) {
      // Select a random image from the filtered results
      const randomIndex = Math.floor(Math.random() * results.length);
      return results[randomIndex].urls.regular; // Return a random image URL
    }
    return null; // Return null if no image found
  };

  const renderHotel = ({ item }) => (
    <View style={styles.hotelContainer}>
      <Image source={{ uri: hotelImages[item.name] }} style={styles.hotelImage} />
      <Text style={styles.name}>{item.name || 'N/A'}</Text>
      <Text style={styles.price}>
      💲 Price: {item.price ? `${item.price.currency} ${item.price.amount}` : 'N/A'}
      </Text>
      <Text style={styles.location}>📍Location: {item.address || 'N/A'}</Text>
      <Text style={styles.rating}>⭐Rating: {item.rating ? `${item.rating}/5` : 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨  Recommended Hotels</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : hotels.length > 0 ? (
        <FlatList
          data={hotels}
          renderItem={renderHotel}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hotelList} // Added styling for padding
        />
      ) : (
        <Text style={styles.noHotels}>No hotel data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light_gray,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
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
  hotelContainer: {
    width: 150, // Ensure a smaller width for scrolling
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  hotelImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  name: {
    fontFamily: 'outfit-bold',
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.grey,
  },
  location: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.grey,
  },
  rating: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.grey,
  },
  noHotels: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.red,
    textAlign: 'center',
  },
});

export default HotelList;
