import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useToast, Box,Thumbnail, Body,Heading, CardItem,View,Card, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import LandscapeLoader from "../../components/LandscapeLoader";
import { useIsFocused } from "@react-navigation/native";
import DetailsLoader from "../../components/DetailsLoader";

const FoodOrderData = (props) => {
    const { orders, setOrders, navigation, ids } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDeletOpen, setIsDeletOpen] = React.useState(false);

    const [food, setFood] = useState([]);


    const onClose = () => setIsOpen(false);
    const onDeleteClose = () => setIsDeletOpen(false);

    const cancelRef = React.useRef(null);
    const deleteRef = React.useRef(null);
    const toast = useToast();

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`food-order/${id}`).then((res) => {
                // setTeams(res.data)
                console.log(res.data);
            });

            await axios.get("food-order/").then((res) => {
                // setTeams(res.data)
                setOrders(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const cancelOrder = async (id) => {
        try {
            const data = {
                status: "Cancelled",
            };
            await axios.put(`food-order/${id}`, data).then((res) => {
                console.log(res.data);
            });
            await axios.get("food-order/").then((res) => {
                // setTeams(res.data)
                setOrders(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    //Load food data
    useEffect(() => {
        console.log(orders.foodId);
        loadTabledata(orders.foodId);
    }, [orders]);

    const loadTabledata = (id) => {
        axios.get(`food/${id}`).then((res) => {
            setFood(res.data);
        });
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
              
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                    source={{
                        uri: food.foodImage,
                    }}
                    alt="image"
                />
            </AspectRatio>
                    
                <Stack direction="row" mb="3" mt="3" space={5}>
                    <VStack space={3} overflow="hidden">

                        <HStack space={6}>
                            <Heading size="lg">{food.foodName} - ({orders.quantity})</Heading>
                            <Text fontWeight="400" fontSize="sm" color="coolGray.800">
                            </Text>
                        </HStack>

                        <Text fontWeight="800" fontSize="lg" color="coolGray.800">
                        Order By : {orders.cusname}
                            
                        </Text>
                        <Text>
                       Total : {orders.total}
                            
                            </Text>
                        <Text>
                        Order Date : {orders.orderedDate.substring(0, 10)}
                            {orders.status == "Cancelled" ? (
                                <Text color="red.500"> (Cancelled)</Text>
                            ) : null}
                            </Text>

                        {orders.status == "Cancelled" ? null : (
                            <HStack space={3} mt={1}>
                                
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Food Order Update", {
                                            id: orders._id,
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
                                </Pressable>

                                <Pressable onPress={() => setIsDeletOpen(!isOpen)}>
                                    <Center h="12" p="2" bg="red.500" rounded="md">
                                        <HStack>
                                            <Text color="white" fontSize="lg">
                                                {" "}
                                                Cancel Order
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
                                                <Heading size="md">{`Cancel Order?`}</Heading>
                                            </AlertDialog.Header>
                                            <AlertDialog.Body>
                                                <Text
                                                    fontWeight="400"
                                                    mt={2}
                                                    mb={2}
                                                    fontSize="sm"
                                                    color="coolGray.800"
                                                >
                                                    Are you sure you want to Cancel food Order?
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
                                                        onPress={() => cancelOrder(orders._id)}
                                                    >
                                                        Cancel Order
                                                    </Button>
                                                </Button.Group>
                                            </AlertDialog.Footer>
                                        </AlertDialog.Content>
                                    </AlertDialog>
                                )}
                            </HStack>
                        )}
                    </VStack>

                </Stack>
            </Box>
        </Box>
    );
};

const OrderFoods = ({ navigation }) => {
    const [order, setFoodOrder] = useState([]);
    const [food, setFood] = useState([]);

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
            .get("food-order/")
            .then((res) => {
                setFoodOrder(res.data);
                const orderIds = res.data.map((order) => order.foodId);
                setId(orderIds);

                console.log(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("food-order/")
            .then((res) => {
                setFoodOrder(res.data);
                const orderIds = res.data.map((order) => order.foodId);
                setId(orderIds);
                setIsLoading(false);

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
                      <Text fontSize="2xl" style={{marginLeft:'3%',fontWeight:'bold',marginTop:'4%',marginBottom:'5%'}}>
                                    Kamindu's Food Orders
                                </Text>
                    {order &&
                        order.map((orders, index) => (
                            <View style={{marginBottom:'4%'}}>
                            <FoodOrderData
                                orders={orders}
                                key={index}
                                setOrders={setFoodOrder}
                                navigation={navigation}
                                ids={ids}
                            />
                            </View>
                        ))}
                </ScrollView>
            )}
        </>
    );
};

export default OrderFoods;
