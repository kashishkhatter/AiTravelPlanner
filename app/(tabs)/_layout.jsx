import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'; //to import icons
import { Colors } from '../../constants/Colors';
//contains tab layout for all tabs at bottom of screen

const _layout = () => {
  return (
    <Tabs  screenOptions={{
      headerShown:false, //to remove header from top for all tab screens in this stack
      tabBarActiveTintColor:Colors.primary //so that icons are black not blue(by def)
    }}>
        <Tabs.Screen name='mytrip'
        options={{
          tabBarLabel:"My Trip", //name of tab
          tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color={color}/>  //custom icon for tab from expo icons
        }}/>
        <Tabs.Screen name='discover'
         options={{
          tabBarLabel:"Discover", //name of tab
          tabBarIcon:({color})=><Ionicons name="globe-sharp" size={24} color={color}/>  //custom icon for tab from expo icons
        }}/>
        <Tabs.Screen name='profile'
         options={{
          tabBarLabel:"People", //name of tab
          tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color}/>  //custom icon for tab from expo icons
        }}/>
    </Tabs>
  )
}

export default _layout