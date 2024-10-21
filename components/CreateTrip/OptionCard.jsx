import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const OptionCard = ({option,selectedOption}) => {
  return (
    <View style={[{
        padding:25,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Colors.light_gray,
        borderRadius:15 //jisko selct hoga upr border aya
    },selectedOption?.id==option?.id && {borderWidth:3}]}> 

    <View>
      <Text style={{ //get titles from array obj
        fontSize:20,
        fontFamily:'outfit-bold',
      }}> {option?.title}</Text> 

      <Text style={{  // get desc from obj of arr 
        fontSize:20,
        fontFamily:'outfit',
        color:Colors.grey
      }}> {option?.desc}</Text> 

    </View>
    <Text style={{ //icon from arr
        fontSize:35
    }}>{option?.icon}</Text>
    </View>
  )
}

export default OptionCard