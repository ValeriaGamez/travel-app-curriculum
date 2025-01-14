

import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { CreateTripContext } from '../../context/CreateTripContext';


export default function SelectDate() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate]=useState();
  const [endDate, setEndDate] = useState();
  const {tripData, setTripData}=useContext(CreateTripContext)
  
  
  // Define onDateChange function here
  const onDateChange = (date, type) => {
    setSelectedDate(date);
    // console.log(date, type);  // Or handle the selected date however you need
    if (type=='START_DATE')
    {
        setStartDate(moment(date))

    }
    else{
        setEndDate(moment(date))
    }
  };

  const OnDateSelectionContinue=()=>{
    if(!startDate && !endDate){
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Please select start and end dates'
        })
        //USE THIS LINE FOR EXPO ON ANDROID
        // TostAndroid.show('Please select Start and End date',ToastAndroid.LONG )
        return;

    }
    const TotalNoOfDays=endDate.diff(startDate, 'days');
    // console.log(TotalNoOfDays+1)
    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      TotalNoOfDays: TotalNoOfDays+1,

    })
    router.push('/create-trip/select-budget');
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
      }}>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          marginTop: 20
        }}>
        TravelDates
      </Text>

      <View
        style={{
          marginTop: 30
        }}>
        <CalendarPicker
          onDateChange={onDateChange}  // Use the function you defined
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE
          }}
        />

      </View>


      <View>
        <TouchableOpacity 
        onPress={OnDateSelectionContinue}
        style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 35
        }}>
            <Text style={{
                textAlign: 'center',
                color: Colors.WHITE,
                fontFamily: 'outfit-medium',
                fontSize: 20
            }}>Continue</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
