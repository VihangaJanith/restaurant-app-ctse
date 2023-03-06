import React from 'react';
import { View, Text , Button} from 'react-native';


const ExampleScreen = ({ navigation }) => {
  return (
    <View>
        <Text>Example Screen</Text>
        <Button
        title="Go to Home... again"
        onPress={() => navigation.navigate('Home Screen')}
      />
    </View>
  )
}

export default ExampleScreen;