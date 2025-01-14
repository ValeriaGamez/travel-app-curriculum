import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { SelectTravelerList } from './../../constants/Options'
import OptionCard from './../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext'

export default function SelectTraveler() {
    const navigation = useNavigation();

    const [selectedOption, setSelectedOption]=useState();
    const { tripData, setTripData }=useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, [navigation]);

    useEffect(()=>{
        setTripData({...tripData, 
            traveler: selectedOption
        })
    },[selectedOption]);

    useEffect(()=>{
        // console.log(tripData)
    }, [tripData])



    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%',
        }}>
            <Text style={{
                fontSize: 30,
                fontFamily: 'outfit-bold',
                marginTop: 20,
                }}
            >Who's Traveling</Text>
            <View style={{
                marginTop: 20,
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                }}>Choose your travelers</Text>

                <FlatList
                    data={SelectTravelerList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            onPress={()=>setSelectedOption(item)}
                        style={{
                            marginVertical: 30,
                        }}>
                            <OptionCard option={item} selectedOption={selectedOption}/>
                        </TouchableOpacity>
                        

                    )}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
            
            <TouchableOpacity 
            
            style={{
                padding: 13,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 15,

            }}>
            <Link href={'/create-trip/select-dates'} style={{
                width: '100%',
            }}>
                <Text style={{
                    textAlign:'center',
                    color:Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>Continue</Text>
            </Link>
            </TouchableOpacity>
            
        </View>
    );
}
