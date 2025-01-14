import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'



export default function PlannedTrip({ details }) {
  if (!Array.isArray(details)) {
    return (
      <View>
        <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>
          Invalid trip details data
        </Text>
      </View>
    );
  }

  // Group activities by day
  const groupedActivities = details.reduce((acc, activity) => {
    if (!acc[activity.day]) {
      acc[activity.day] = [];
    }
    acc[activity.day].push(activity);
    return acc;
  }, {});

  // Convert grouped activities to an array for rendering
  const groupedActivitiesArray = Object.keys(groupedActivities).map((day) => ({
    day,
    activities: groupedActivities[day],
  }));

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={groupedActivitiesArray}
      keyExtractor={(item) => item.day.toString()}
      renderItem={({ item }) => (
        <View style={{ marginVertical: 10, marginTop: 15}}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>
            Day {item.day}
          </Text>

          {/* FlatList to render each day's activities */}
          <FlatList
            
            data={item.activities}
            keyExtractor={(activity, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginVertical: 8,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 10,
                  marginRight: 10,
                  width: '320'
                }}
              >
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>
                  {item.activity}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: '#666' }}>
                  {item.details}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: '#666' }}>
                  🕒 Time: {item.time}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: '#666' }}>
                  💵 Ticket: {item.ticket_pricing}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    />
  );
}
