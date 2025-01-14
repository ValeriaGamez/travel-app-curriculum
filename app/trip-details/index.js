import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { ScrollView } from 'react-native';

export default function TripDetails() {
    const navigation=useNavigation();
     const {trip}=useLocalSearchParams();

    const [tripDetails, setTripDetails]=useState([])

    const formatData=(data)=>{
        console.log('form', data)
        return JSON.stringify(data)
    }
    // console.log('Hotels', tripDetails?.tripData?.trip?.hotels)
    // console.log('ITINERARY', tripDetails?.tripData?.trip?.itinerary)


    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })

        setTripDetails(JSON.parse(trip))
        
    },[])

  return tripDetails&&(
    <ScrollView>
      
      <Image source={require('./../../assets/images/starter.png')}
        style={{
            width: '100%',
            height: 330,
            borderRadius: 15
        }}/>

        <View style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            height: '100%',
            marginTop: -30,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
        }}>
            <Text style={{
                fontSize: 25,
                fontFamily: 'outfit-bold'
            }}>{tripDetails?.tripData?.trip?.destination}</Text>
            {/* <Text>{JSON.stringify(tripDetails.startDate)}</Text> */}

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                marginTop: 5
            }}>
                {/* PLACEHOLDERS */}
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.GRAY
                }}>04 Jul 2024 To</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.GRAY
                }}>05 Jul 2024</Text>
            </View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.GRAY
            }}>{tripDetails?.travelers}</Text>

            {/* Flight Info */}
            <FlightInfo flightData={tripDetails?.tripData?.trip?.flights[0]} />


            {/* Hotel info */}
            <HotelList hotelList={tripDetails?.tripData?.trip?.hotels} />


            {/* Trip Day Planner Info */}
            <PlannedTrip details={tripDetails?.tripData?.trip?.itinerary} />

        </View>

        <View>
            
        </View>
    </ScrollView>
  )
}