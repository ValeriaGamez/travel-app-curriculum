import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { useRouter } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { chatSession } from './../../configs/AiModal';

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (tripData) {
      console.log('Triggering trip generation with data:', tripData);
      GenerateAiTrip();
    }
  }, [tripData]);

  const GenerateAiTrip = async () => {
    try {
      setLoading(true);

      // Construct the AI prompt from trip data
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name || 'unknown')
        .replace('{totalDays}', tripData.TotalNoOfDays || 0)
        .replace('{totalNight}', (tripData.TotalNoOfDays || 0) - 1)
        .replace('{traveler}', tripData.traveler?.title || 'a traveler')
        .replace('{budget}', tripData.budget || 'any budget');

      console.log('Sending prompt to AI:', FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      if (!result.response) {
        throw new Error('No response received from AI.');
      }

      const responseText = await result.response.text();
      console.log('AI Response:', responseText);

      const tripResp = JSON.parse(responseText);

      // Firestore call to add a new document to the 'UserTrips' collection
      const tripRef = collection(db, 'UserTrips'); // Reference to 'UserTrips' collection
      await addDoc(tripRef, {
        tripData: tripResp, // Assuming tripResp contains your generated trip data
        startDate: Timestamp.fromDate(new Date(tripData?.startDate || '2025-01-01')), // Convert to Firestore timestamp
        endDate: Timestamp.fromDate(new Date(tripData?.endDate || '2025-01-01')),  // Convert to Firestore timestamp
      });

      console.log('Trip successfully saved to Firestore.');

      setLoading(false);

      // Navigate to the "My Trips" screen after saving trip data to Firestore
      router.push('/mytrip');
    } catch (error) {
      console.error('Error during trip generation:', error);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        marginTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          textAlign: 'center',
        }}
      >
        Please Wait...
      </Text>

      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        We are working to generate your dream trip
      </Text>

      <Image
        source={require('./../../assets/images/plane-gif.gif')}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
        }}
      />

      <Text
        style={{
          fontFamily: 'outfit',
          color: Colors.GRAY,
          fontSize: 20,
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        Do not Go Back
      </Text>
    </View>
  );
}
