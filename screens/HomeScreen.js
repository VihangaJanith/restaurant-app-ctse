import React from 'react';
import { View, Text,Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
        <Text>Home Screen</Text>
        <Button
        title="Go to Example... again"
        onPress={() => navigation.navigate('Example Screen')}
      />

    </View>
  )
}

export default HomeScreen;