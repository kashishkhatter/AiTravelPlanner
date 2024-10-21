// Login page component of our app(components folder contains all parts of app)
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Login = () => {
  const router=useRouter(); //this hook is used to navigate btw pages in a app, so use router obj and use it for refirection

  return (
 <View> 
      <Image source={require('./../assets/images/login.gif')}
        style={{ //internal styling
            width:'100%',
            height:500
        }}
      />

    <View style={styles.container}>  
        <Text style={  //container with stuff below image(button,text)
        {
            fontSize:28,
            fontFamily:'outfit-bold',
            textAlign:'center', //horizontal allignment
            marginTop:10
        }
          }>AI Travel Planner</Text>

        <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            textAlign:'center',
            color:Colors.grey,
            marginTop:20
        }}>Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with Al-driven insights. </Text>

        <TouchableOpacity style={styles.button} //to make button clickable we use touchableopacity
        onPress={()=>router.push('auth/sign-in')} //uses router obj to redirect to signin page when this button clicked using push method
        > 
            <Text style=
            {{color:Colors.white,
              textAlign:'center',
              fontFamily:'outfit',
              fontSize:17
            }}>Get Started</Text> 
        </TouchableOpacity>
    </View>

</View>
  );
};
const styles = StyleSheet.create({ //external styling (repeated styling)
    container:{
        backgroundColor:Colors.white,
        marginTop: -20,
        height:'100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:25
    },
    button:{
        borderRadius:99,
        backgroundColor:Colors.primary,
        padding:15,
        marginTop:'10%'
    }
})
export default Login;
