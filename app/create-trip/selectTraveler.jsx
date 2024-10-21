import { View, Text } from 'react-native'
import React, { useEffect, useState ,useContext} from 'react'
import { Link, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import { SelectTravelersList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from './../../context/CreateTripContext';

const selectTraveler = () => {

  const navigation=useNavigation();
  const[ selectedTraveler,setSelectedTraveler]=useState(); //to store selection(solo,couple etc)
  const { tripData, setTripData } = useContext(CreateTripContext); // Use context to get and set trip data


  useEffect(()=>{
    navigation.setOptions({ //to get back header(back button)
        headerShown:true,
        headerTransparent:true,
        headerTitle:''
    })
  },[])

  useEffect(()=>{ //yha settripdata context is used to store traveler(tripdata from here is selectedtraveler)
    setTripData({...tripData, //The new object is created using the spread operator (...tripData), which copies all existing properties of tripData.
      traveler:selectedTraveler //The traveler property of tripData is then updated to the value of selectedTravele
    })
  },[selectedTraveler]) //whenever selctedtraveller change this hook executes

  useEffect(()=>{ //store tripdata of selected traveler
    console.log(tripData);
  },[tripData])

  return (
    <GestureHandlerRootView>
    <View style={{ //main container
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.white,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:5
      }}>Who's Travelling?</Text>

      <View>
        
        <FlatList
        data={SelectTravelersList} //data para of flatlist refers to the arr of obj created jha sa data ayega
        renderItem={({item})=>( //renderitem contains an arrrow fun that gets the items from inside the arr
          //render optioncard and pass this item
          <TouchableOpacity 
           onPress={()=>setSelectedTraveler(item)} //select krna pr save it in selectedtraveler hook
           style={{
            marginVertical:10 //gap btw items of list
          }}>
            <OptionCard option={item} selectedOption={selectedTraveler}/> 
          </TouchableOpacity>
         )}
         
        />

        
      </View>
 
  <TouchableOpacity style={{
    padding:15,
    backgroundColor:Colors.primary,
    borderRadius:15,
    marginTop:20
    }}>
    
    <Link href={'/create-trip/selectDates'} //alternative of router->on clicking continue redirets to selctdates filoe
     style={{
      width:'100%',
      textAlign:"center"
     }}>
      <Text style={{
        textAlign:'center',
        color:Colors.white,
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Continue</Text>  

     </Link>
    </TouchableOpacity>

    </View>
    </GestureHandlerRootView>
  )
}

export default selectTraveler