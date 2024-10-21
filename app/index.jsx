import { View } from "react-native";
import Login from '../components/Login';
import {auth} from '../configs/FirebaseConfigs'
import { Redirect } from "expo-router";

//main page-jo component chalana yha likho
export default function Index() {

  const user=auth.currentUser; //gets info of curr user if already logged in or not from auth of fb

  return (
    <View style={{ flex: 1 }}>
      {user ?  //if logged in then take firectly to my trips page, else take to login page
        <Redirect href="/mytrip" />: <Login />}
    </View>
  );
}
