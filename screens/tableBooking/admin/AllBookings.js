import React, { useEffect, useState, useRef } from "react";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from "axios";
import { Alert, RefreshControl, ScrollView, StyleSheet } from "react-native";
import {
  Box,
  Fab,
  Heading,
  Body,
  View,
  FormControl,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Button,
  Icon,
  Input,
  WarningOutlineIcon,
  Divider,
  VStack,
  IconButton,
  CloseIcon,
  Spinner,
  PresenceTransition,
  Skeleton,
  Card,
  Pressable,
  AlertDialog,
  useToast,
  Badge,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import LandscapeLoader from "../../../components/LandscapeLoader";
import { useIsFocused } from "@react-navigation/native";
import DetailsLoader from "../../../components/DetailsLoader";

// import { Container } from './styles';

const GG = (props) => {
  const { table, setTables, navigation, ids , onRefresh} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeletOpen, setIsDeletOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onDeleteClose = () => setIsDeletOpen(false);

  const cancelRef = React.useRef(null);
  const deleteRef = React.useRef(null);
  const toast = useToast();
  

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`tablebooking/${id}`).then((res) => {
        // setTeams(res.data)
        console.log(res.data);
      });
      onRefresh();
      await axios.get("tablebooking/").then((res) => {
        // setTeams(res.data)
        setTables(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const data = {
        status: "Cancelled",
      };
      await axios.put(`tablebooking/${id}`, data).then((res) => {
        console.log(res.data);
      });
      onRefresh();
      await axios.get("tablebooking/").then((res) => {
        // setTeams(res.data)
        setTables(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box alignItems="center" mb={1} mt={2}>
      <Box
        w={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        px={3}
        shadow={0.3}
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Stack direction="row" mb="3" mt="3" space={5}>
          <VStack space={5} overflow="hidden">
            {/* <Center w="64" h="5" bg="indigo.300" rounded="md" shadow={3} /> */}
            <HStack space={6}>
              <Heading size="lg">{table.tabletype}</Heading>
              <Text fontWeight="400" fontSize="sm" color="coolGray.800">
                Created Date : {table.createdAt.substring(0, 10)}
              </Text>
            </HStack>

            <Text fontWeight="800" fontSize="lg" color="coolGray.800">
              Booked Date : {table.date}
              {table.status == "Cancelled" ? (
                <Text color="red.500"> (Cancelled)</Text>
              ) : null}
            </Text>
            <Text fontWeight="800" fontSize="lg" color="coolGray.800">
              Booked Time : {table.time}
            </Text>
            <Text>Booked By : {table.name}</Text>

            {table.status == "Cancelled" ? 
            
            <Pressable onPress={() => deleteTeam(table._id) }>
                  <Center h="12" p="2" bg="red.500" rounded="md">
                    <HStack>
                      <Text color="white" fontSize="lg">
                        {" "}
                        Delete Booking
                      </Text>
                      <Icon
                        mt={1}
                        as={<Ionicons name="trash-outline" />}
                        size="sm"
                        color="white"
                      />
                    </HStack>
                  </Center>
                </Pressable>
            
            : (
              <HStack  mt={1}>
                {/* <Pressable
                  onPress={() =>
                    navigation.navigate("Update Booking", {
                      id: table._id,
                    })
                  }
                >
                  <Center p="2" h="12" bg="yellow.500" rounded="md">
                    <HStack>
                      <Text color="white" fontSize="lg">
                        {" "}
                        Update Booking
                      </Text>
                      <Icon
                        mt={1}
                        as={<Ionicons name="pencil-outline" />}
                        size="sm"
                        color="white"
                      />
                    </HStack>
                  </Center>
                </Pressable> */}

                <Pressable onPress={() => setIsDeletOpen(!isOpen)}>
                  <Center h="12" p="2" bg="red.500" rounded="md">
                    <HStack>
                      <Text color="white" fontSize="lg">
                        {" "}
                        Cancel Booking
                      </Text>
                      <Icon
                        mt={1}
                        as={<Ionicons name="trash-outline" />}
                        size="sm"
                        color="white"
                      />
                    </HStack>
                  </Center>
                </Pressable>

                {isDeletOpen && (
                  <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={isDeletOpen}
                    onClose={onDeleteClose}
                  >
                    <AlertDialog.Content>
                      <AlertDialog.CloseButton />
                      <AlertDialog.Header>
                        <Heading size="md">{`Cancel Reservation?`}</Heading>
                      </AlertDialog.Header>
                      <AlertDialog.Body>
                        <Text
                          fontWeight="400"
                          mt={2}
                          mb={2}
                          fontSize="sm"
                          color="coolGray.800"
                        >
                          Are you sure you want to Cancel table reservation?
                        </Text>
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button.Group space={2}>
                          <Button
                            variant="unstyled"
                            colorScheme="coolGray"
                            onPress={onDeleteClose}
                            ref={cancelRef}
                          >
                            No
                          </Button>
                          <Button
                            variant="solid"
                            colorScheme="red"
                            startIcon={
                              <Icon
                                as={Ionicons}
                                name="trash-outline"
                                size="sm"
                              />
                            }
                            onPress={() => cancelBooking(table._id)}
                          >
                            Cancel Reservation
                          </Button>
                        </Button.Group>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog>
                )}
              </HStack>
            )}
          </VStack>

          {/* <HStack  space={4} justifyContent="space-between">
                <HStack>
                  <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }} fontWeight="400">
                    6 mins ago ssss
                  </Text></HStack>
  
                  <HStack>
                 <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                  Book Table
                  </Button>
  </HStack>
                
              
              </HStack>
  
            <Center bg="primary.500" size="20" rounded="sm" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
              Box 2
            </Center>
            <Center size="20" bg="primary.700" rounded="sm" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
              Box 3
            </Center> */}
        </Stack>
      </Box>
    </Box>
  );
};

const FirstRoute = ({  navigation }) => {
  const [tables, setTables] = useState([]);

  const [img, setImg] = useState("");
  const [ids, setId] = useState("");
  const [isLoading, setIsLoading] = useState();

  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    axios
      .get("tablebooking/")
      .then((res) => {
        setTables(res.data);
        const tableIds = res.data.map((table) => table.tableId);
        setId(tableIds);

        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("tablebooking/")
      .then((res) => {
        setTables(res.data);
        const tableIds = res.data.map((table) => table.tableId);
        setId(tableIds);
        setIsLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <ScrollView>
          <DetailsLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {tables &&
            tables.map((table, index) => (
              <>
                {table.status === "Pending" ? (
                  <GG
                    table={table}
                    key={index}
                    setTables={setTables}
                    navigation={navigation}
                    ids={ids}
                    onRefresh={onRefresh}
                  />
                ) : null}
              </>
            ))}
        </ScrollView>
      )}
    </>
  );
};

const SecondRoute = ({ index, navigation }) => {
  const [tables, setTables] = useState([]);

  const [img, setImg] = useState("");
  const [ids, setId] = useState("");
  const [isLoading, setIsLoading] = useState();

  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    axios
      .get("tablebooking/")
      .then((res) => {
        setTables(res.data);
        const tableIds = res.data.map((table) => table.tableId);
        setId(tableIds);

        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("tablebooking/")
      .then((res) => {
        setTables(res.data);
        const tableIds = res.data.map((table) => table.tableId);
        setId(tableIds);
        setIsLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <ScrollView>
          <DetailsLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {tables &&
            tables.map((table, index) => (
              <>
                {table.status === "Pending" ? null : (
                  <GG
                    table={table}
                    key={index}
                    setTables={setTables}
                    navigation={navigation}
                    ids={ids}
                  />
                )}
              </>
            ))}
        </ScrollView>
      )}
    </>
  );
};

const initialRoutes = [
  { key: "first", title: "Table Reservations" },
  { key: "second", title: "Canceled Reservations" },
];
const renderScene = SceneMap({



  first: FirstRoute,
  second: () => <View>
    <Text>Second</Text>
  <SecondRoute/>
  </View>

});
const renderTabBar = (props) => {
  const { itemLength } = props;

return (
  <TabBar
    {...props}
    style={{ backgroundColor: "#f4511e" }}
    activeColor={"white"}
    inactiveColor={"gray"}
    fontWeight={"bold"}
   
    renderLabel={({ route, focused }) => (
      <View style={{ flexDirection: "row" }}>
      
        <Text fontSize="md" style={{ color: focused ? "white" : "gray"  }}>
          {route.title}{' '}
        </Text>
        {route.key === "second" && (
          <Badge // bg="red.400"
          colorScheme="danger" rounded="full"  zIndex={1} variant="solid" alignSelf="flex-end" _text={{
            fontSize: 12
          }}>
            {itemLength}
            </Badge>
        )}
      </View>
    )}

  />
);
        }

const AllBookings = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const [items, itemsSet] = useState('');

  const [itemLength, setItemLength] = useState('');

  const newff = () => {
    console.log("neww");
  };

  const handleIndexChange = (index) => {
    setIndex(index);
    if (index === 0) {
      console.log("First");
      newff();
    }
    if (index === 1) {
      console.log("Second");
    }
    if (index === 2) {
      console.log("Third");
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("useEffect");
      axios.get("tablebooking/").then((res) => {
        itemsSet(res.data);
        // console.log(res.data, "res");
  
    
        const cancelledItems = res.data.filter(item => item.status === "Cancelled");
        console.log(cancelledItems, 'cannn');
        setItemLength(cancelledItems.length);
        console.log(itemLength, 'itemLength');
    
      });
   
    }
  }, [isFocused, index]);

  // useEffect(() => {
  //   console.log("useEffect");
  //   axios.get("tablebooking/").then((res) => {
  //     itemsSet(res.data);
  //     // console.log(res.data, "res");

  
  //     const cancelledItems = res.data.filter(item => item.status === "Cancelled");
  //     console.log(cancelledItems, 'cannn');
  //     setItemLength(cancelledItems.length);
  //     console.log(itemLength, 'itemLength');
  
  //   });
  // }, [index]);



  return (
    <TabView
      index={index}
      //   key={index}
      navigationState={{ index, routes: initialRoutes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderTabBar={(props) => renderTabBar({...props, itemLength})}
    />
  );
};
export default AllBookings;