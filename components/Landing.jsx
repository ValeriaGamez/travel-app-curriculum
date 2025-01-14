import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRouter } from 'expo-router';

export default function Landing() {
    const router = useRouter();
  return (
    <View>
        <Image source={require('./../assets/images/background-image.png')}
            style={{
                width:'100%', 
                height: 520
            }}
        />
        <View style={styles.container}>
            <Text style={{
                fontSize:30,
                fontFamily: 'outfit-bold',
                textAlign: 'center'
            }}>AI Travel Planner</Text>

            <Text style={{
                fontFamily: 'outfit', 
                fontSize: 17,
                textAlign: 'center',
                color: '#777',
                marginTop: 20,
            }}>
                Discover your next adventure effortlessly.
                Personalized itineraries at your fingertips. Travel smarter with AI driven insights
            </Text>

            <TouchableOpacity style={styles.button}
                onPress={()=>router.push('/(tabs)/mytrip')}
            >
                <Text style={{
                    color: '#FFF',
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    fontSize: 17
                }}>Get started</Text>
            </TouchableOpacity>

        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFF', 
        marginTop: -20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: '100%',
        padding: 15
    },
    button:{
        padding: 15,
        backgroundColor: '#000',
        borderRadius: 99,
        marginTop: '10%'
    }
});
