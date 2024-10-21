import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const StartNewTripCard = () => {

  const router=useRouter();
  return (
    <GestureHandlerRootView >
    <View style={{
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 30
    }}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize: 25,
        fontFamily: 'outfit-medium'
      }}>
        No Trips planned yet
      </Text>

      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit',
        textAlign: "center",
        color: Colors.grey
      }}>
        Looks like its time to plan a new travel experience! Get Started below 
      </Text>

      <TouchableOpacity onPress={()=>router.push('/create-trip/searchPlace')} //on clicking this button using file routing obj redirect to searchPlace screen
      style={{
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        paddingHorizontal: 30
      }}>
        <Text style={{
            color: Colors.white,
            fontFamily: "outfit-medium"
        }}>
          Start a new trip
        </Text>
      </TouchableOpacity>
    </View>
    </GestureHandlerRootView>
  );
};

export default  StartNewTripCard;
