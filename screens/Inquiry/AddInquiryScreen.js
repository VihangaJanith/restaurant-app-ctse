import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  VStack,
  Icon,
  Text,
  Spacer,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import axios from "axios";

const AddInquiryScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inq, setInq] = useState("");

  const addInquiry = async () => {
    try {
      if (name === "" || phone === "" || email === "" || inq === "") {
        alert("Please provide all the fields");
      } else {
        const newInquiry = {
          name,
          phone,
          email,
          inq,
          userid: "123",
        };
        await axios
          .post("inquiry/add", newInquiry)
          .then((res) => {
            console.log(res.newInquiry);
          });
        console.log(newInquiry);
        alert("User Created Successfully");
        navigation.navigate("MyInquiry Screen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setInq("");
  };

  return (
    <NativeBaseProvider>
      <VStack
        mb="2.5"
        mt="1.5"
        space={5}
        p={4}
        
        marginTop={40}
      >
        <Text style={{ fontWeight: "bold" }}>Enter Your Name</Text>
        <Input
          variant={"outline"}
          placeholder="Name"
          value={name}
          onChangeText={(e) => setName(e)}
        />

        <Text style={{ fontWeight: "bold" }}>Enter Your Phone</Text>
        <Input
          variant={"outline"}
          placeholder="Phone"
          value={phone}
          onChangeText={(e) => setPhone(e)}
        />

        <Text style={{ fontWeight: "bold" }}>Enter Your Email</Text>
        <Input
          variant={"outline"}
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />

        <Text style={{ fontWeight: "bold" }}>Enter Your Inquiry</Text>
        <Input
          variant={"outline"}
          placeholder="Inquiry"
          value={inq}
          onChangeText={(e) => setInq(e)}
        />
      </VStack>
      <HStack marginLeft={30} space={3} marginTop={30}>
        <Button
          style={{ width: 170 }}
          variant="solid"
          colorScheme="green"
          startIcon={<Icon as={Ionicons} name="add-outline" size="sm" />}
          onPress={() => addInquiry()}
        >
          Add Inquiry
        </Button>
        <Button
          style={{ width: 170 }}
          variant="solid"
          colorScheme="red"
          startIcon={<Icon as={Ionicons} name="close-outline" size="sm" />}
          onPress={reset}
        >
          Reset Details
        </Button>
      </HStack>
      
      <Button
        style={{ width: 350, marginLeft: 30, marginTop: 25 }}
        variant="solid"
        colorScheme="lightBlue"
        startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
        onPress={() => navigation.navigate("MyInquiry Screen")}
      >
        My Inquiries
      </Button>
    </NativeBaseProvider>
  );
};
export default AddInquiryScreen;
