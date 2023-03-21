
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { VStack, HStack, Button, IconButton, Menu, HamburgerIcon,Icon, Text, NativeBaseProvider, Center, Box, StatusBar, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ExampleScreen from "./screens/ExampleScreen";
// import TableList from "./screens/tableBooking/admin/TableList";
import TableList from "./screens/tableBooking/admin/TableList";
import AddTable from "./screens/tableBooking/admin/AddTable";

import Eg from "./screens/Eg";



import Ionicons from "react-native-vector-icons/Ionicons";
<<<<<<< HEAD
import AppBars from "./components/AppBar";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import BookingScreen from "./screens/tableBooking/BookingScreen";
import UpdateTable from "./screens/tableBooking/admin/UpdateTable";
import BookedTables from "./screens/tableBooking/BookedTables";
import UpdateBooking from "./screens/tableBooking/UpdateBooking";
import AllBookings from "./screens/tableBooking/admin/AllBookings";



=======
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
import AllUserInquiryScreen from "./screens/Inquiry/AllUserInquiryScreen";
import EditResponseScreen from "./screens/Inquiry/EditResponseScreen";
import AddInquiryScreen from "./screens/Inquiry/AddInquiryScreen";
import EditInquiryScreen from "./screens/Inquiry/EditInquiryScreen";
import MyInquiryScreen from "./screens/Inquiry/MyInquiryScreen";

<<<<<<< HEAD
 axios.defaults.baseURL = 'http://192.168.8.113:5000/';
// axios.defaults.baseURL = 'http://192.168.23.92:5000/';


=======
//import Card from "./screens/Inquiry/Card";
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Menus() {
  return <Box w="90%" alignItems="center">
      <Menu w="190" trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon />
            </Pressable>;
    }}>
        <Menu.Item>Arial</Menu.Item>
        <Menu.Item>Nunito Sans</Menu.Item>
        <Menu.Item>Roboto</Menu.Item>
        <Menu.Item>Poppins</Menu.Item>
        <Menu.Item>SF Pro</Menu.Item>
        <Menu.Item>Helvetica</Menu.Item>
        <Menu.Item isDisabled>Sofia</Menu.Item>
        <Menu.Item>Cookie</Menu.Item>
      </Menu>
    </Box>;
}

function AppBar() {
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
          
        </HStack>
      </HStack>
    </>;
}

export default function App() {
  function TabNav() {
    return (
      <Tab.Navigator 

        options={{
          headerShown: false,
        }}

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
            else if (route.name === "Inquiries") {
              iconName = focused ? "create" : "create-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
<<<<<<< HEAD
        
          
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}  options={{ tabBarBadge: 3, headerShown: false }}/>
=======
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarBadge: 3 }}
        />
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
        <Tab.Screen name="Example" component={ExampleScreen} />
        <Tab.Screen name="Inquiries" component={AddInquiryScreen} />
      </Tab.Navigator>
    );
  }

<<<<<<< HEAD




  return (
  <NativeBaseProvider>
   
   
      {/* <AppBar  /> */}
         
    
    
   
    
      
   
    <NavigationContainer >
      <Stack.Navigator   screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
       
       
        <Menu w="190" trigger={triggerProps => {
        return  <TouchableOpacity  accessibilityLabel="More options menu" {...triggerProps}>
        <Ionicons name="ios-menu" size={25} color="white" />
      </TouchableOpacity>;
      }}>
          <Menu.Item 
          >My Orders</Menu.Item>
          <Center>
          <Divider w="90%"/>
          </Center>
          <Menu.Item>My Table Reservations</Menu.Item>
          <Center>
          <Divider w="90%"/>
          </Center>

          <Menu.Item>My Inquiries</Menu.Item>
          <Center>
          <Divider w="90%"/>
          </Center>
          <Menu.Item>My Profile</Menu.Item>
          
        </Menu>
    
      ),

        cardStyle: { backgroundColor: '#fffff' }
    }} >
        <Stack.Screen
          name="Food Factory"
          component={TabNav}
          // options={{ headerShown: false }}
      
        />
        <Stack.Screen name="Home Screen" component={HomeScreen} 
          // options={{ headerShown: false }}
       />
        <Stack.Screen name="Example Screen" component={ExampleScreen}  
        options={{
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}


        />
        <Stack.Screen name="Table List" component={TableList} />
        <Stack.Screen name="Eg" component={Eg} />
        <Stack.Screen name="Add Table" component={AddTable} />
        <Stack.Screen name="Booking Screen" component={BookingScreen} />
        <Stack.Screen name="Update Table" component={UpdateTable} />
        <Stack.Screen name="Booked List" component={BookedTables}
        options={{
          headerStyle: {
            
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}

        />
        <Stack.Screen name="Update Booking" component={UpdateBooking} />
        <Stack.Screen name="AllBookings" component={AllBookings} />



        <Stack.Screen
=======
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
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
            name="AllUserInquiry Screen"
            component={AllUserInquiryScreen}
          />
          <Stack.Screen
            name="EditResponse Screen"
            component={EditResponseScreen}
          />
<<<<<<< HEAD
           <Stack.Screen name="AddInquiry Screen" component={AddInquiryScreen} />
=======
          <Stack.Screen name="AddInquiry Screen" component={AddInquiryScreen} />
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
          <Stack.Screen
            name="EditInquiry Screen"
            component={EditInquiryScreen}
          />
<<<<<<< HEAD
            <Stack.Screen name="MyInquiry Screen" component={MyInquiryScreen} />

      </Stack.Navigator>
    </NavigationContainer>
 
    </NativeBaseProvider>
=======
          <Stack.Screen name="MyInquiry Screen" component={MyInquiryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
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
