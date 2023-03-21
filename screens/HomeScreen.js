import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Alert, ScrollView, StyleSheet, RefreshControl } from "react-native";
=======
import { ScrollView, StyleSheet } from "react-native";
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
import {
  Box,
  Heading,
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
<<<<<<< HEAD
  VStack,
  IconButton,
  CloseIcon,
  Spinner,
  PresenceTransition,
  Skeleton,
  Pressable,
  AlertDialog,
  Badge,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SkeletonLoader from "../components/SleletonLoader";
import { useIsFocused } from "@react-navigation/native";

const TableData = (props) => {
  const { table, navigation } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

=======
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Example = (props) => {
  const { table } = props;

>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
  return (
    <Box alignItems="center" style={styles.aaaaa}>
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
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
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: table.image,
              }}
              alt="image"
            />
          </AspectRatio>
<<<<<<< HEAD

          <Pressable
            onPress={() => setIsOpen(!isOpen)}
            size="sm"
            position="absolute"
            top="1"
            left="1"
            m="1"
            color="white"
          >
            <Badge
              bg="blue.500"
              // bg="transparent"
              // borderWidth={1}
              // // borderColor="blue.500"
              // borderColor="white"

              borderRadius={999}
              width={8}
              height={8}
              position="absolute"
            >
              <Icon as={Ionicons} name="eye-outline" size="sm" color="white" />
            </Badge>
          </Pressable>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                <Heading size="md">{`${table.name} Table`}</Heading>
                {/* {`${table.name} Table`} */}
              </AlertDialog.Header>
              <AlertDialog.Body>
                <AspectRatio
                  w="100%"
                  ratio={16 / 9}
                  rounded="lg"
                  overflow="hidden"
                >
                  <Image
                    source={{
                      uri: table.image,
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Text
                  fontWeight="400"
                  mt={2}
                  mb={2}
                  fontSize="sm"
                  color="coolGray.800"
                >
                  {table.description}
                </Text>
                {/* {"This is suitable table for " + `${table.users}` +" users."} */}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onPress={() =>
                      navigation.navigate("Booking Screen", {
                        id: table._id,
                      })
                    }
                    startIcon={
                      <Icon as={Ionicons} name="book-outline" size="sm" />
                    }
                  >
                    Book Table
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

=======
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
            roundedTopRight="lg"
          >
            {table.users + " Person"}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {table.name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {table.users} Person
            </Text>
          </Stack>
          <Text fontWeight="400">{table.description}</Text>
          {/* <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                Book Table
                </Button> */}

          <Button
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="book-outline" size="sm" />}
<<<<<<< HEAD
            onPress={() =>
              navigation.navigate("Booking Screen", {
                id: table._id,
              })
            }
=======
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
          >
            Book Table
          </Button>

          {/* <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            
            </HStack> */}
        </Stack>
      </Box>
    </Box>
  );
};

const HomeScreen = ({ navigation }) => {
  const [tables, setTables] = useState();
  const [searchkey, setsearchkey] = useState("");
<<<<<<< HEAD
=======

>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
  const [isLoading, setIsLoading] = useState(false);
  const [notab, setNotab] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filterLoaded, setFilterLoaded] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
<<<<<<< HEAD
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);

    if (filterLoaded) {
      setFilterLoaded(false);
    }
    setsearchkey("");

    setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("table/").then((res) => {
        setTables(res.data);
        setNotab(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("table/").then((res) => {
        setTables(res.data);
        setNotab(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [notab]);

  const filterPackages = (searchkey) => {
    try {
      setIsLoading(true);
      console.log(searchkey);

      axios.get("table/").then((response) => {
        // console.log(response.data);

        //         const filteredData = DATA.filter((item) =>
        //   item.name.toLowerCase().includes(search.toLowerCase())
        // );

        const filteredPackages = response.data.filter((tables) =>
          tables.name.toLowerCase().includes(searchkey.toLowerCase())
        );

        if (filteredPackages.length > 0) {
          setFilterLoaded(true);
          setTables(filteredPackages);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          setsearchkey("");
          setNotab(true);

          setTimeout(() => {
            setNotab(false);
          }, 3000);
        }
      });
=======
    try {
      fetch("http://172.28.8.27:5000/table/")
        .then((response) => response.json())
        .then((data) => setTables(data))
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filterPackages = (searchkey) => {
    try {
      setIsLoading(true);
      console.log(searchkey);

      const response = axios.get("http://172.28.8.27:5000/table/");
      console.log({ response });
      const filteredPackages = response.data.filter((tables) =>
        tables.name.toLowerCase().includes(searchkey)
      );
      if (filteredPackages.length > 0) {
        setTables(filteredPackages);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);

        setNotab(true);
        setTimeout(() => {
          setNotab(false);
        }, 3000);
      }
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View flexDirection="row" alignItems="center" margin={2}>
        <Input
          placeholder="Search Table"
          // value={searchText}
          // onChangeText={setSearchText}
          value={searchkey}
          onChangeText={(newText) => setsearchkey(newText)}
          flex={1}
          margin={2}
<<<<<<< HEAD
          rounded="full"
        />

        {filterLoaded ? (
          <Button
            variant="solid"
            colorScheme="red"
            size={"lg"}
            rounded="full"
            startIcon={<Icon as={Ionicons} name="close" size="sm" />}
            onPress={() => onRefresh()}
          ></Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="red"
            size={"lg"}
            rounded="full"
            startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
            onPress={() => filterPackages(searchkey)}
          ></Button>
        )}
      </View>

      {isLoading ? (
        ""
      ) : (
        <Box>
          {notab && (
            <PresenceTransition
              visible={notab}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 550,
                },
              }}
            >
              <Box
                alignSelf="center"
                px="3"
                py="2"
                width={500}
                // bg="primary.500"
                _text={{
                  alignSelf: "center",
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "warmGray.50",
                  letterSpacing: "lg",
                }}
                bg={["red.400", "blue.400"]}
              >
                Search Not Found
              </Box>
            </PresenceTransition>
          )}{" "}
        </Box>
      )}

      {isLoading ? (

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SkeletonLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <PresenceTransition
            visible={!isLoading}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 500,
              },
            }}
          >
            <Center flex={1} px="3">
              {tables &&
                tables.map((table, index) => (
                  <TableData
                    table={table}
                    key={index}
                    navigation={navigation}
                  />
                ))}
            </Center>
          </PresenceTransition>
        </ScrollView>
      )}
=======
        />

        <Button
          variant="solid"
          colorScheme="red"
          startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
          onPress={() => filterPackages(searchkey)}
        ></Button>
      </View>

      <ScrollView>
        <Center flex={1} px="3">
          {tables &&
            tables.map((table, index) => <Example table={table} key={index} />)}
        </Center>
      </ScrollView>
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
    </NativeBaseProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  aaaaa: {
    boxShadow: "1px 1px 1px 1px #ccc",
    border: "1px solid red",

<<<<<<< HEAD
    marginTop: 5,
    marginBottom: 5,
=======
    marginTop: 10,
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
  },
});
