import React from 'react';
import { View, Text , Button} from 'react-native';



const ExampleScreen = ({ navigation }) => {
  return (
    <>
   
      
      <View >
        <Text>Example Screen</Text>
        <Button
        title="Go to Home... again"
        onPress={() => navigation.navigate('Table List')}
      />
       <Button
        title="Booked tables"
        onPress={() => navigation.navigate('Booked List')}
      />
         <Button
        title="all Booked "
        onPress={() => navigation.navigate('AllBookings')}
      />

<View>
        <Text>Example Screen</Text>
        <Button
        title="Go to Home... again"
        onPress={() => navigation.navigate('Home Screen')}
      />
      <Button
        title="Go to Alluserinquiries... again"
        onPress={() => navigation.navigate('AllUserInquiry Screen')}
      />
    </View>
    </View></>
  )
}

export default ExampleScreen;