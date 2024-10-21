import { View, Text, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../../constants/Colors';
import { selectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from './../../context/CreateTripContext';


const selectBudget = () => {

    const navigation=useNavigation();
    const [selectedOption,setSelectedOption]=useState();
    const { tripData, setTripData } = useContext(CreateTripContext); // Use context to get and set trip data
    const router=useRouter(); //to nav btw pages

    useEffect(()=>{
        navigation.setOptions({ //to get back header(back button)
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
      },[]);

      useEffect(()=>{
        selectedOption && setTripData({  //settripdata hook stores info of budget selected
          ...tripData,
          budget:selectedOption?.title //store selected budget option inside budget
        })
      },[selectedOption]) //whenever selectedoption changes


      const onClickContinue=()=>{ //fun to call on clicking cont
        if(!selectedOption){ //if nothing selected and continue clicked give this notif
          ToastAndroid.show('Select Your Budget',ToastAndroid.LONG)
          return;
        }

        router.push('/create-trip/reviewTrip'); //else nav to next page using router
      }

  return (
    <GestureHandlerRootView>
    <View style={{
        paddingTop:75,
        padding:25,
        backgroundColor:Colors.white,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20
      }}>Budget</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20
        }}> Choose spending habits for your trip</Text>


       <FlatList //list for diff budget
       data={selectBudgetOptions} //name of list 
       renderItem={({item,index})=>(
        <TouchableOpacity style={{marginVertical:10}}
        onPress={()=>setSelectedOption(item)} //jo bhi option select ho save it
        >
            <OptionCard option={item} selectedOption={selectedOption}/>
        </TouchableOpacity>
       )}
       
       />
      </View>

      <TouchableOpacity 
      onPress={()=>onClickContinue()} //on clicking cont button call this func
    style={{
    padding:15,
    backgroundColor:Colors.primary,
    borderRadius:15,
    marginTop:20
    }}>
    
    
      <Text style={{
        textAlign:'center',
        color:Colors.white,
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Continue</Text>  


    </TouchableOpacity>

    </View>
    </GestureHandlerRootView>
  )
}

export default selectBudget
