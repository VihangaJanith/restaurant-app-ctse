import React from 'react';
import { View, Text, Button } from 'react-native';



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


        <View>
          <Text>Example Food Screen</Text>
          <Button
            title="Go to Admin Food..."
            onPress={() => navigation.navigate('Admin Food List')}
          />
          <Button
            title="Go to Food Order Edit"
            onPress={() => navigation.navigate("Food Order Update", {
              id: "641d5e9133b05418b5075b34",
            })
            }
          />
            <Button
          title="Orders List"
          onPress={() => navigation.navigate('Orders List')}
        />
        </View>
      </View></>
  )
}

export default ExampleScreen;