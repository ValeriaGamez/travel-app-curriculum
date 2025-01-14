import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import { useRouter } from 'expo-router'  
import moment from 'moment'

export default function UserTripCard({ trip }) {
  const router = useRouter()  

  return (
    <TouchableOpacity 
      // onPress={() => router.push(`/trip/${trip.id}`)}  //no ID
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
      }}
    >
      <Image 
        source={require('./../../assets/images/starter.png')} 
        style={{
          width: 100,
          height: 100,
          borderRadius: 15
        }}
      />
      <View>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 18
        }}>{trip.tripData?.trip?.destination}</Text>

        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GRAY
        }}>
          Traveling: {trip.tripData.trip.travelers}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
