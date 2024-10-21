import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useContext } from 'react';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfigs';
import { setDoc, doc } from 'firebase/firestore';
import { HeaderBackButton } from '@react-navigation/elements'; // Import HeaderBackButton

const GenerateTrip = () => {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    GenerateAiTrip();
  }, []);

  // Helper function to validate JSON structure
  const isValidJson = (text) => {
    try {
      const data = JSON.parse(text);
      return data && typeof data === 'object';
    } catch (error) {
      return false;
    }
  };

  const GenerateAiTrip = async (retryCount = 0) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name.split(' ')[0])
        .replaceAll('{totalDays}', tripData.totalDays)
        .replaceAll('{totalNights}', tripData.totalDays - 1)
        .replace('{Traveler}', tripData.traveler?.title)
        .replace('{budget}', tripData.budget);

      console.log('AI Prompt:', FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      const textResponse = await result.response.text();

      console.log('Raw Response:', textResponse);

      // Handle empty response
      if (!textResponse || textResponse.trim().length === 0) {
        console.error('Empty response from AI');
        throw new Error('Empty response');
      }

      // Check if the response is a valid JSON
      if (!isValidJson(textResponse)) {
        console.error('Invalid JSON format received');
        if (retryCount < 3) {
          console.log(`Retrying... (${retryCount + 1})`);
          return GenerateAiTrip(retryCount + 1);
        }
        throw new Error('Failed to parse valid JSON after multiple retries');
      }

      const tripResp = JSON.parse(textResponse); // Parse response after validation

      // Check for expected fields in the parsed data
      if (!tripResp.flight || !tripResp.hotel || !tripResp.places_to_visit) {
        throw new Error('Incomplete trip data received');
      }

      const docId = Date.now().toString();
      await setDoc(doc(db, 'UserTrips', docId), {
        userEmail: user.email,
        tripData: JSON.stringify(tripData),
        docId: docId,
        tripPlan: tripResp,
      });

      router.push('(tabs)/mytrip');
      setLoading(false);
    } catch (error) {
      console.error('Error generating trip:', error);
      setErrorMessage(error.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.white, height: '100%' }}>
      <View style={{ position: 'absolute', top: 40, left: 25, zIndex: 100 }}>
        <HeaderBackButton onPress={() => router.back()} tintColor="black" />
      </View>

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, textAlign: 'center' }}>Please Wait...</Text>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: 40 }}>
        We are working to generate your dream trip
      </Text>

      <Image
        source={require('./../../assets/images/travel-lets-go.gif')}
        style={{ width: '100%', height: 300, objectFit: 'contain', marginTop: 50 }}
      />

      {errorMessage && (
        <Text style={{ fontFamily: 'outfit', color: Colors.red, fontSize: 16, textAlign: 'center', marginTop: 20 }}>
          {errorMessage}
        </Text>
      )}

      <Text style={{ fontFamily: 'outfit', color: Colors.grey, fontSize: 20, textAlign: 'center', marginTop: 50 }}>
        Do not Go Back
      </Text>
    </View>
  );
};

export default GenerateTrip;
