import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
    useToast, Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge,
} from "native-base";
import React, { useEffect, useState } from "react";
import AlertBox from "../../components/AlertBox";
import { TextInput } from 'react-native';

const FoodOrderScreen = ({ navigation, route }) => {
    const { id, qty, foodImage } = route.params;

    const [userid, setUserid] = useState("");

    const [phone, setPhone] = useState("");
    const [cusname, setCusname] = useState("");
    const [address, setAddress] = useState("");
    const [foodname, setFoodname] = useState("");
    const [foodPrice, setFoodPrice] = useState("0");
    const [quantity, setQuantity] = useState("");
    const [total, setTotal] = useState("");

    const toast = useToast();

    const [errorPhone, setErrorPhone] = useState(false);

    //Load food data
    useEffect(() => {
        console.log(id);
        loadTabledata(id);
    }, []);

    const loadTabledata = (id) => {
        axios.get(`food/${id}`).then((res) => {
            setFoodname(res.data.foodName);
            setFoodPrice(res.data.price)
            setQuantity(`${qty}`)
        });
    };


    //Handle Inputs
    const handlePhoneChange = (value) => {
        setErrorPhone(false);
        setPhone(value);
    };
    const handleCusnameChange = (value) => {
        setCusname(value);
    };
    const handleAddressChange = (value) => {
        setAddress(value);
    };
    const handleQuantityChange = (value) => {
        setQuantity(value);
    };
    const handleTotalChange = (value) => {
        setTotal(value);
    };

    //calculate total
    useEffect(() => {
        let subtotal = parseInt(foodPrice) * parseInt(qty)

        setTotal(`Rs.${subtotal}.00`);
    }, [foodPrice]);

    //On Submit
    const orderFood = () => {

        if (phone === "" || phone.length < 10) {
            setErrorPhone("Please Enter a Valid Phone Number");
        } else {
            const data = {
                cusname,
                address,
                phone,
                foodname,
                quantity,
                total,
                userid: "111"
            };
            console.log(data);
            axios.post("food-order/add", data).then((res) => {
                console.log(res.data);
            });
            toast.show({
                placement: "top",

                render: () => (
                    <AlertBox
                        status="success"
                        title="Order Success"
                        description="Your Order Success !!!"
                    />
                ),
            });
            navigation.navigate("Home");
        }

    };

    return (
        <Stack space={4} w="95%" maxW="350px" mx="auto" minH={"90%"} mt={3}>
            <Heading>{foodname}</Heading>
            <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                    source={{
                        uri: foodImage,
                    }}
                    alt="image"
                />
            </AspectRatio>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text style={{ fontSize: 15, fontWeight: "bold",marginTop:'2%' }}>Quantity</Text>

                <TextInput
                    editable={false}
                    value={quantity}
                    style={{
                        flex: 1,
                        height: 30,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        marginHorizontal: 8
                    }}
                />


                <Text style={{ fontSize: 15, fontWeight: "bold",marginTop:'2%' }}>Total</Text>

                <TextInput
                    editable={false}
                    value={total}
                    style={{
                        flex: 1,
                        height: 30,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        marginHorizontal: 8,
                    }}
                />
            </View>


            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer Name</Text>

                <Input
                    variant="outline"
                    placeholder="Customer Name"
                    value={cusname}
                    size="lg"
                    mt={2}
                    onChangeText={handleCusnameChange}
                    keyboardType="default"
                />
            </View>

            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Address</Text>

                <Input
                    variant="outline"
                    placeholder="Address"
                    value={address}
                    isRequired={true}
                    size="lg"
                    mt={2}
                    onChangeText={handleAddressChange}
                    keyboardType="default"
                />
            </View>

            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone Number</Text>

                <Input
                    variant="outline"
                    placeholder="Phone Number"
                    value={phone}
                    size="lg"
                    mt={2}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                />
                {errorPhone && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                Please Enter a valid Phone Number{" "}
                            </Text>
                            <Icon
                                style={{ color: "red" }}
                                as={Ionicons}
                                name="alert-circle-outline"
                                size="sm"
                            />
                        </HStack>
                    </View>
                )}
            </View>

            <View  position="absolute"
            bottom="0"
            right='0'
            left='0'>
        <Button
          colorScheme="orange"
          size="lg"
          onPress={() => orderFood()}
        >
          Confirm Order
        </Button>
      </View>
        </Stack>
    );
};

export default FoodOrderScreen;
