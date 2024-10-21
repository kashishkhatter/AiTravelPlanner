import { View, Text, ToastAndroid } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import CalendarPicker from 'react-native-calendar-picker';
import { TouchableOpacity } from 'react-native';
import moment from 'moment'; // to allow date in any format
import { CreateTripContext } from './../../context/CreateTripContext';

const selectDates = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(); // to store selected start and end dates
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext); // Use context to get and set trip data

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      // to get back header(back button)
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onDateChange = (date, type) => {
    // whenever date picked from calendar(predefined) -> date gives actual date type gives if start or end date
    if (type === 'START_DATE') {
      // type gives if start or end if start then setstartdate as selected date
      setStartDate(moment(date)); // parsing the date using moment to use any format
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelection = () => {
    // on selecting date and continue
    if (!startDate || !endDate) {
      ToastAndroid.show('Please select start and end dates', ToastAndroid.SHORT); // if continue clicked without selecting dates
      return;
    }

    const totalDays = endDate.diff(startDate, 'days'); // total days of travel(end-start date)
    setTripData({
      // context imported in every component to keep storing data to share it
      ...tripData, // tripdata sent to context from this component is start, end dates and total days
      startDate: startDate,
      endDate: endDate,
      totalDays: totalDays + 1,
    });



    // Navigate to the next screen or perform any other action
   router.push('/create-trip/selectBudget') //continue krna pr budget selection component pr redirect
  };

  return (
    <View
      style={{
        // main container
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>

      <View
        style={{
          marginTop: 30, // this view contains calendar imported from react-native date picker
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true} // allows user to select range of dates
          minDate={new Date()} // disables date before today(new date gets today's date)
          maxRangeDuration={5} // max 5 day selection (idea- make more than 5 paid)
          selectedRangeStyle={{
            backgroundColor: Colors.primary, // range selected background color-by default green
          }}
          selectedDayTextStyle={{
            color: Colors.white, // selected text(date) color
          }}
        />
      </View>

      <TouchableOpacity
        onPress={onDateSelection} // call this function on clicking continue
        style={{
          // continue button
          padding: 15,
          backgroundColor: Colors.primary,
          borderRadius: 15,
          marginTop: 35,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: Colors.white,
            fontFamily: 'outfit-medium',
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default selectDates;
