import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'

export default function HotelList({ hotelList }) {

  // console.log('hotelList', hotelList[0].price)

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
        }}
      >
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        data={hotelList}
        style={{
          marginTop: 8,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()} // Add keyExtractor to avoid warnings
        renderItem={({ item }) => (
          <View
            style={{
              marginRight: 20,
              width: 180,
            }}
          >
            <Image
              source={require('./../../assets/images/starter.png')}
              style={{
                width: 180,
                height: 120,
                borderRadius: 15,
              }}
            />
            <View
              style={{
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: 'outfit-medium',
                  fontSize: 17,
                }}
              >
                {item.name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'outfit',
                  }}
                >
                  ⭐{item.rating}
                </Text>
                <Text
                  style={{
                    fontFamily: 'outfit',
                  }}
                >
                  💵{item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
