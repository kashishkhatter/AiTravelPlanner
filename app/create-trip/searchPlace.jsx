import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import axios from 'axios';
import { CreateTripContext } from './../../context/CreateTripContext';

const SearchPlace = () => {
  const navigation = useNavigation(); // Hook to access navigation functions
  const { tripData, setTripData } = useContext(CreateTripContext); // Use context to get and set trip data

  const [query, setQuery] = useState('');  // State for storing the search query
  const [suggestions, setSuggestions] = useState([]); // State for storing autocomplete suggestions
  const [loading, setLoading] = useState(false);  // State for managing loading state
  const router=useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,  // Show the header
      headerTransparent: true,
      headerTitle: 'Search'
    });
  }, []);


  // Effect to fetch suggestions when the query changes
  useEffect(() => {
    if (query.length > 2) { // Only fetch if query length is more than 2
      setLoading(true); // Set loading state to true
      axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: query, // Search query
          key: '2c43a155914547e2890fc6481de80b02', // Replace with your OpenCage API Key
          no_annotations: 1
        }
      })
      .then(response => {
        console.log('API Response:', response.data); // Log the response
        if (response.data && response.data.results) { // Set suggestions if results are available
          setSuggestions(response.data.results);
        } else {
          setSuggestions([]); // Clear suggestions if no results
        }
        setLoading(false); // Set loading state to false
      })
      .catch(error => {
        console.error('API Error:', error); // Log API error
        setSuggestions([]);  // Clear suggestions on error
        setLoading(false);
      });
    } else {
      setSuggestions([]); // Clear suggestions if query length is less than 3
    }
  }, [query]);

  const handleSelectPlace = (place) => {
    setQuery(place.formatted); // Update the search bar with the selected place
    setTripData({
      locationInfo: {
        name: place.formatted,
        coordinates: {
          lat: place.geometry.lat,
          lon: place.geometry.lng
        }
        
      }
      
    });

    router.push('/create-trip/selectTraveler') //suggestions ma sa choose krle to redirect to selectTraveler page

    setSuggestions([]); // Clear suggestions after selection
    // Optionally navigate to another screen or perform another action
    console.log('Selected Place:', place);
  };

  return (
    <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.white, height: '100%' }}>
      <TextInput
        style={{ 
          borderWidth: 1, // Apply border to all sides
          borderColor: Colors.gray, // Set border color
          borderRadius: 10, // Set border radius for rounded corners
          padding: 10 
        }}
        placeholder="Search"
        value={query}
        onChangeText={text => setQuery(text)}
      />
      
      {loading && <Text>Loading...</Text>} 
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => `${item.geometry.lat}-${item.geometry.lng}`} // Unique key for each item
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPlace(item)}>
              <Text style={{ padding: 10 }}>{item.formatted}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchPlace;
