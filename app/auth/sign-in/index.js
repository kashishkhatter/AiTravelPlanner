import React,{useState} from 'react';
import { View, Text ,StyleSheet,ToastAndroid } from 'react-native';
import { Colors } from './../../../constants/Colors'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth'; //import from fb for signin func
import { auth } from '../../../configs/FirebaseConfigs'; //import auth obj created in fbconfig file
//gesturehandler for taking text inputs 

//sign in page pr signin nutton pr firebase ka code auth lgega aur create account btn pr redirection/router lagega
const Login = () => {

  const router=useRouter();
  const[email,setEmail]=useState(); //hooks to set and store the mail,pass,name entered by the user
  const[password,setPassword]=useState();

  const onSignIn=()=>{ //func to execute when user signs in(code from fb doc)
    
    if(!email && !password ){ //if any of the details not entered and user clicks create account then bring this pop up for long duration
      ToastAndroid.show('Please enter all details',ToastAndroid.LONG)
      return;
     }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip') //as user signs in redirect to mytrip page
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
    if(errorCode=='auth/invalid-credential'){ //if wring mail/pass added by user then show this pop up(auth/invalid-credential  is the err code for wrong cred- checked from console)
      ToastAndroid.show("Invalid credentials", ToastAndroid,LONG)
    }
  });

  }
  return (
    <GestureHandlerRootView>  
    <View style={{
        padding:25,
        height:'100%',
        backgroundColor:Colors.white,
        paddingTop:40
    }}>
  <TouchableOpacity onPress={()=>router.back()}> 
  <Ionicons name="arrow-back" size={24} color="black" /> 
  </TouchableOpacity>  

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:25
      }}>Let's Sign You In</Text>

      <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        color:Colors.grey,
        marginTop:20,
       }}>Welcome Back</Text>

       <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        color:Colors.grey,
        marginTop:10,
       }}>You've been missed!</Text>

       
       <View style={{marginTop:40}}>   
         <Text style={{
            fontFamily:'outfit-medium'
         }}>Email</Text>

         <TextInput  //takes in input from user(mail)
         style={styles.input}
         placeholder='Enter your Email'
         onChangeText={(val)=>setEmail(val)} //set mail entered by user in email var
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

        <TouchableOpacity onPress={onSignIn} //when signin button clicked call onSignIn func(auth code from fb)
        style={{   //sign in button
            padding:20,
            backgroundColor:Colors.primary,
            borderRadius:15,
            marginTop:40
        }}>
        <Text style={{
            color:Colors.white,
            textAlign:'center',
             fontFamily:'outfit-medium'
        }}>Sign In</Text>

        </TouchableOpacity>

        <TouchableOpacity 
         onPress={()=>router.replace('auth/sign-up')} //redirect user to sign-up screen(unlike push which adds to stack, replaces current entry of stack(no back option to last screen))
         style={{   //create account button
            padding:20,
            backgroundColor:Colors.white,
            borderRadius:15,
            marginTop:20,
            borderWidth:2
        }}>
        <Text style={{
            color:Colors.primary,
            textAlign:'center',
            fontFamily:'outfit-medium'
        }}>Create Account</Text>

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
