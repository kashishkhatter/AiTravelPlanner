import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { CreateTripContext } from '../context/CreateTripContext';

// Root layout to be used throughout the app
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  const [tripData, setTripData] = useState([]); // Context for trip data

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); // Placeholder loading screen
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define stack screens here */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
