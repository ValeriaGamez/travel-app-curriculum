import { Text, View, StyleSheet } from "react-native";
import Landing from './../components/Landing'
import 'react-native-get-random-values'

export default function Index() {
  return (
    <View 
      style={{
        flex: 1,
      }}
      >
      <Landing />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  text: {
    fontSize: 30,
    fontFamily: 'outfit'
  },
});