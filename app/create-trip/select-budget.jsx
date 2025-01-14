import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, Link, useRouter } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard'
import {Colors} from './../../constants/Colors'
import { CreateTripContext } from '../../context/CreateTripContext'
import Toast from 'react-native-toast-message'

export default function SelectBudget() {
  const navigation=useNavigation();
  const [selectedOption, setSelectedOption]=useState();
  const {tripData, setTripData}=useContext(CreateTripContext)
  const router=useRouter()

  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''

    })
  },[])

  useEffect(()=>{
    selectedOption&&setTripData({
      ...tripData,
      budget: selectedOption?.title
    })
  },[selectedOption])


  const onClickContinue=()=>{
    if(!selectedOption)
    {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Select Your Budget'
      })
        //USE THIS LINE FOR EXPO ON ANDROID
        // TostAndroid.show('Please select Start and End date',ToastAndroid.LONG )
      return;
    }
    router.push('/create-trip/review-trip')
  }

  return (
    <View style={{
      paddingTop: 75,
      padding: 25,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>Budget</Text>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>Choose Spending Habits</Text>


        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item, index }) => (
              <TouchableOpacity 
                  onPress={()=>setSelectedOption(item)}
              style={{
                  marginVertical: 10,
              }}>
                  <OptionCard option={item} selectedOption={selectedOption}/>
              </TouchableOpacity>
              

          )}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>

      <TouchableOpacity 
        onPress={()=>onClickContinue()}    
        style={{
            padding: 13,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,

        }}>
        
            <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontFamily: 'outfit-medium',
                fontSize: 20
            }}>Continue</Text>
        
        </TouchableOpacity>
    </View>
  )
}