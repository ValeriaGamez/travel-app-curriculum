import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { CreateTripContext } from '../../context/CreateTripContext'
import moment from 'moment'



export default function ReviewTrip() {
  const navigation=useNavigation();
  const {tripData, setTripData}=useContext(CreateTripContext)
  const router=useRouter()

  useEffect(()=>{
    navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: ''
    })
  },[])
    return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>ReviewTrip</Text>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20
        }}>Before generating your trip, please review your selection</Text>
      </View>
        {/* //DEST INFO */}
      <View style={{
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }}>
        {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
        <Text style={{
            fontSize: 30
        }}>📍</Text>
        <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.GRAY
            }}>Destination</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize: 20
            }}>{tripData?.locationInfo?.name}</Text>
        </View>        
      </View>


      {/* //DATE INFO */}
      <View style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }}>
        {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
        <Text style={{
            fontSize: 30
        }}>📆</Text>
        <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.GRAY
            }}>Travel Date</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize: 20
            }}>{moment(tripData?.startDate).format('DD MMM') + " To " + 
                moment(tripData.endDate).format('DD MMM')}</Text>
        </View> 

      </View>


      {/* // TRVALAR INFO */}
      <View style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }}>
        {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
        <Text style={{
            fontSize: 30
        }}>✈️</Text>
        <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.GRAY
            }}>Who is Traveling</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize: 20
            }}>{tripData?.traveler?.title}</Text>
        </View>        
      </View>


      {/* // BUDGET INFO */}
      <View style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }}>
        {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
        <Text style={{
            fontSize: 30
        }}>💰</Text>
        <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.GRAY
            }}>Budget</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize: 20
            }}>{tripData?.budget}</Text>
        </View>        
      </View>

      <TouchableOpacity 
          onPress={()=>router.push('/create-trip/generate-trip')}        
        style={{
            padding: 13,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 20

        }}>
            <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontFamily: 'outfit-medium',
                fontSize: 20
            }}>Build My Trip</Text>
        </TouchableOpacity>



      

      

    </View>
  )
}