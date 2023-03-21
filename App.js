import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ExampleScreen from "./screens/ExampleScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AllUserInquiryScreen from "./screens/Inquiry/AllUserInquiryScreen";
import EditResponseScreen from "./screens/Inquiry/EditResponseScreen";
import AddInquiryScreen from "./screens/Inquiry/AddInquiryScreen";
import EditInquiryScreen from "./screens/Inquiry/EditInquiryScreen";
import MyInquiryScreen from "./screens/Inquiry/MyInquiryScreen";

import FoodList from "./screens/FoodManagment/FoodList";

//import Card from "./screens/Inquiry/Card";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function TabNav() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Example") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Inquiries") {
              iconName = focused ? "create" : "create-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Example" component={ExampleScreen} />
        <Tab.Screen name="Inquiries" component={AddInquiryScreen} />
        <Tab.Screen name="Foods" component={FoodList} />
      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.bg}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home Screen" component={HomeScreen} />
          <Stack.Screen name="Example Screen" component={ExampleScreen} />

          <Stack.Screen
            name="AllUserInquiry Screen"
            component={AllUserInquiryScreen}
          />
          <Stack.Screen
            name="EditResponse Screen"
            component={EditResponseScreen}
          />
          <Stack.Screen name="AddInquiry Screen" component={AddInquiryScreen} />
          <Stack.Screen
            name="EditInquiry Screen"
            component={EditInquiryScreen}
          />
          <Stack.Screen name="MyInquiry Screen" component={MyInquiryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBox: "1px solid red",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
  bg: {
    flex: 1,
    backgroundColor: "red",
  },
});
