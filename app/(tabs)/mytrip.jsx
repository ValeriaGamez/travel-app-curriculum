import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import StartNewTripCard from './../../components/MyTrips/StartNewTripCard'
import { collection, query, getDocs } from 'firebase/firestore' 
import { db } from './../../configs/FirebaseConfig'
import { ActivityIndicator } from 'react-native';
import UserTripList from '../../components/MyTrips/UserTripList';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function MyTrip() {

    const [userTrips, setUserTrips] = useState([])
    const [loading, setLoading] = useState(true) // Set to true initially to show the loader
    const router = useRouter();  

    useEffect(() => {
        GetMyTrips();
    }, [])

    const GetMyTrips = async () => {
        setLoading(true)
        const q = query(collection(db, 'UserTrips'))
        const querySnapshot = await getDocs(q)

        // Collect all trips before updating state
        const tripsData = []
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            tripsData.push(doc.data())
        })

        // Update state once all data is collected
        setUserTrips(tripsData)
        setLoading(false) // Stop loading once data is fetched
    }

    const handleAddTrip = () => {
        // Use the router.push() method to navigate to the 'generate-trip' screen
        router.push('create-trip/search-place');  // Navigates to the generate-trip screen
    };

    return (
        <ScrollView style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                }}>My Trips</Text>
                <Ionicons name="add-circle" size={50} color="black" onPress={handleAddTrip} />
            </View>
            {/* Show the ActivityIndicator while loading */}
            {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
            
            {/* Show StartNewTripCard if there are no trips */}
            {userTrips?.length === 0 
                ? <StartNewTripCard /> 
                : <UserTripList userTrips={userTrips} />
            }
        </ScrollView>
    )
}
