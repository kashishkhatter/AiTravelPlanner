import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import moment from 'moment';

const ReviewTrip = () => {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext); // Use context to get and set trip data
  const router=useRouter();

  useEffect(() => {
    // Setup header
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ""
    });
  }, []);

  const locationName = tripData?.locationInfo?.name; //selected location from context

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.white,
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>Review Your Trip</Text>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
          
        }}>Before generating your trip, please review your selections</Text>


        <View style={{ //destination Info
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}>
         
          <Text style={{
            fontSize: 40,
            marginRight: 10
          }}>📍</Text>
          
          <View>
          
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 20,
              color: Colors.grey
            }}>Destination</Text>

            {/* Selected destination */}
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              marginTop: 5 
            }}>
              {locationName && typeof locationName === 'string' ? locationName : "No destination selected"}
            </Text>
          </View>
        </View>

        <View style={{ //date Info
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}>
         
          <Text style={{
            fontSize: 40,
            marginRight: 10
          }}>📅</Text>
          
          <View>
          
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 20,
              color: Colors.grey
            }}>Travel Date</Text>

            {/* Selected date */}
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              marginTop: 5 
            }}>
              {moment(tripData?.startDate).format('DD MMM') +" To "+ moment(tripData.endDate).format('DD MMM')+"  "}
              ({tripData?.totalDays} days)
            </Text>
          </View>
        </View>

        <View style={{ //Traveler Info
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}>
         
          <Text style={{
            fontSize: 40,
            marginRight: 10
          }}>🚌</Text>
          
          <View>
          
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 20,
              color: Colors.grey
            }}>Who Is Travelling</Text>

            {/* Selected date */}
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              marginTop: 5 
            }}>
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>

        <View style={{ //budget Info
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}>
         
          <Text style={{
            fontSize: 40,
            marginRight: 10
          }}>💰</Text>
          
          <View>
          
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 20,
              color: Colors.grey
            }}>Budget</Text>

            {/* Selected date */}
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              marginTop: 5 
            }}>
                {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
      onPress={()=>router.replace('/create-trip/generateTrip')} //redirect to generate trip page on clicking generatetrip(replace instead of push so that user cant go back to prev screen)
    style={{
    padding:15,
    backgroundColor:Colors.primary,
    borderRadius:15,
    marginTop:40
    }}>
    
    
      <Text style={{
        textAlign:'center',
        color:Colors.white,
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Build My Trip</Text>  


    </TouchableOpacity>

    </View>
  )
}

export default ReviewTrip;
