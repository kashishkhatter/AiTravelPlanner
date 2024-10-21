import React, { useState } from 'react';
import { View, Text ,StyleSheet, ToastAndroid } from 'react-native';
import { Colors } from './../../../constants/Colors'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth'; //import from fb for signup
import { auth } from '../../../configs/FirebaseConfigs';

//gesturehandler for taking text inputs 
//signup page ma create account button pr firebase doc sa auth code lgega aur signin button pr redirection/routing
const Login = () => {

  const router=useRouter();
  const[email,setEmail]=useState(); //hooks to set and store the mail,pass,name entered by the user
  const[password,setPassword]=useState();
  const[fullName, setFullName]= useState();

  const onCreateAccount=()=>{ //func to call when create account btn clicked(this func code copied from fb code->sign up authentication)
    
     if(!email && !password && !fullName){ //if any of the details not entered and user clicks create account then bring this pop up for long duration
      ToastAndroid.show('Please enter all details',ToastAndroid.LONG)
      return;
     }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip') //on signup redirect to mytrips page
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("--", errorMessage,errorCode);
    // ..
  });


  }
  return (
    <GestureHandlerRootView>  
    <View style={{
        padding:25,
        height:'100%',
        backgroundColor:Colors.white,
        paddingTop:60
    }}>
    <TouchableOpacity onPress={()=>router.back()}> 
    <Ionicons name="arrow-back" size={24} color="black" /> 
    </TouchableOpacity>  
   
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:20
      }}>Create New Account</Text>

        <View style={{marginTop:30}}>   
         <Text style={{
            fontFamily:'outfit-medium'
         }}>Full Name</Text>

         <TextInput  //takes in input from user(name)
         style={styles.input}
         placeholder='Enter your Full Name'
         onChangeText={(val)=>setFullName(val)} //when name/text entered set its val in FullName var
         />
        </View>

        <View style={{marginTop:30}}>   
         <Text style={{
            fontFamily:'outfit-medium'
         }}>Email</Text>

         <TextInput  //takes in input from user(mail)
         style={styles.input}
         placeholder='Enter your Email'
         onChangeText={(val)=>setEmail(val)}
         />
        </View>

        <View style={{marginTop:30}}>  
         <Text style={{
            fontFamily:'outfit-medium'
         }}>Password</Text>

         <TextInput  //takes in input from user(password)
          secureTextEntry={true} //hide pass while entring
         style={styles.input}
         placeholder='Enter your password'
         onChangeText={(val)=>setPassword(val)}
         />
        </View>


        <TouchableOpacity onPress={onCreateAccount} //when createAccount button pressed call create account func(contains fb auth code)
         
         style={{   //create account button
            padding:20,
            backgroundColor:Colors.white,
            borderRadius:15,
            marginTop:45,
            borderWidth:2
        }}>
        <Text style={{
            color:Colors.primary,
            textAlign:'center',
            fontFamily:'outfit-medium'
        }}>Create Account</Text>

        </TouchableOpacity>

        <TouchableOpacity 
            onPress={()=>router.replace('auth/sign-in')} //redirect user to sign-in screen(unlike push which adds to stack, replaces current entry of stack(no back option to last screen))
            style={{   //sign in button
            padding:20,
            backgroundColor:Colors.primary,
            borderRadius:15,
            marginTop:20
        }}>
        <Text style={{
            color:Colors.white,
            textAlign:'center',
             fontFamily:'outfit-medium'
        }}>Sign In</Text>

        </TouchableOpacity>


     </View>
     </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    input:{
        padding:15,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.grey,
        fontFamily:'outfit'
    }
})
export default Login;
