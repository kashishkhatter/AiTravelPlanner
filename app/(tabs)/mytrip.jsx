import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfigs';
import UserTripList from '../../components/MyTrips/UserTripList';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const MyTrip = () => {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]); // stores trips taken by user till now
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        GetMyTrips();
      }
    }, [user]) // Add user to dependencies
  );

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);

    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email)); // query to get user trips
    const querySnapshot = await getDocs(q);
    
    const trips = [];
    querySnapshot.forEach((doc) => {
      // Collect trip data
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data());
    });

    setUserTrips(trips); // Set the trips at once
    setLoading(false);
  };

  const handleCreateTrip = () => {
    router.push('/create-trip/searchPlace'); // Navigate to trip creation screen
  };

  return (
    <GestureHandlerRootView>
      <ScrollView style={{ // main container
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.white,
        height: '100%',
      }}>

        <View style={{ // title and + icon in same line
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35
          }}>My Trips </Text>
          <Ionicons onPress={handleCreateTrip} name="add-circle" size={50} color="black" />
        </View>

        {loading && <ActivityIndicator size={'large'} color={Colors.primary} />} 

        {/* If no user trip till now call StartNewTrip component */}
        {userTrips.length === 0 ? <StartNewTripCard /> :
          <UserTripList userTrips={userTrips} />}
 
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default MyTrip;
