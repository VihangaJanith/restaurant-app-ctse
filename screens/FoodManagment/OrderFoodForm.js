import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Button, Heading, HStack, Icon, Input, Stack, Text, useToast, View } from "native-base";
import React, { useEffect, useState } from "react";
import AlertBox from "../../components/AlertBox";

const FoodOrderScreen = ({ navigation, route }) => {
    const id = route.params.id;

    const [userid, setUserid] = useState("");

    const [phone, setPhone] = useState("");
    const [cusname, setCusname] = useState("");
    const [address, setAddress] = useState("");
    const [foodname, setFoodname] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
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

    //On Submit
    const bookTable = () => {

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
                userid:"111"
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
        <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
            <Heading>Order Food - {foodname}</Heading>


            <View mt={3}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Food Name</Text>

                <Input
                    variant="outline"
                    placeholder="Food Name"
                    value={foodname}
                    disabled={true}
                    mt={2}
                    size="lg"
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
                    keyboardType="numeric"
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

            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Quantity</Text>

                <Input
                    variant="outline"
                    placeholder="Quantity"
                    value={quantity}
                    size="lg"
                    mt={2}
                    onChangeText={handleQuantityChange}
                    keyboardType="default"
                />
            </View>
            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Total</Text>

                <Input
                    variant="outline"
                    placeholder="Total"
                    value={total}
                    size="lg"
                    mt={2}
                    onChangeText={handleTotalChange}
                    keyboardType="default"
                />
            </View>

            <Button colorScheme="orange" size="lg" onPress={() => bookTable()}>
                Confirm Order
            </Button>
        </Stack>
    );
};

export default FoodOrderScreen;
