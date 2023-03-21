import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  VStack,
  Icon,
  Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";

const EditInquiryScreen = ({ navigation, route }) => {
  const id = route.params.id;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inq, setInq] = useState("");

  useEffect(() => {
<<<<<<< HEAD
    axios.get(`inquiry/${id}`).then((res) => {
=======
    axios.get(`http://172.28.8.27:5000/inquiry/${id}`).then((res) => {
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
      console.log(res.data);
      setName(res.data.name);
      setPhone(res.data.phone);
      setEmail(res.data.email);
      setInq(res.data.inq);
    });
  }, []);

  const editInquiry = async (id) => {
    try {
      const updatedInquiry = {
        name: name,
        phone: phone,
        email: email,
        inq: inq,
      };
      await axios
<<<<<<< HEAD
        .put(`inquiry/${id}`, updatedInquiry)
=======
        .put(`http://172.28.8.27:5000/inquiry/${id}`, updatedInquiry)
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78
        .then((res) => {
          console.log(res.updatedInquiry);
        });
      console.log(updatedInquiry);
      alert("Inquiry Updated Successfully");

<<<<<<< HEAD
      await axios.get("inquiry/");
=======
      await axios.get("http://172.28.8.27:5000/inquiry/");
>>>>>>> 0a1ffb6f33f069fcbf677b36d9d601f3d978ca78

      navigation.navigate("MyInquiry Screen");
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
        width={350}
        marginLeft={30}
        marginTop={60}
      >
        <Text style={{ fontWeight: "bold" }}>Your Name</Text>
        <Input
          variant={"outline"}
          placeholder="Name"
          onChangeText={(e) => setName(e)}
          value={name}
        />

<Text style={{ fontWeight: "bold" }}>Your Email</Text>
        <Input
          variant={"outline"}
          placeholder="Phone"
          onChangeText={(e) => setPhone(e)}
          value={phone}
        />

        <Text style={{ fontWeight: "bold" }}>Your Email</Text>
        <Input
          variant={"outline"}
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />

        <Text style={{ fontWeight: "bold" }}>Your Inquiry</Text>
        <Input
          variant={"outline"}
          placeholder="Inquiry"
          onChangeText={(e) => setInq(e)}
          value={inq}
        />
      </VStack>
      <HStack marginLeft={30} space={3} marginTop={30}>
        <Button
          style={{ width: 170 }}
          variant="solid"
          colorScheme="green"
          startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
          onPress={() => editInquiry(id)}
        >
          Edit Inquiry
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
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default EditInquiryScreen;
