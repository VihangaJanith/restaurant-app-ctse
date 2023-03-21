import axios from "axios";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  HStack,
  Stack,
  Input,
  Button,
  Icon,
  NativeBaseProvider,
} from "native-base";

const EditResponseScreen = ({ navigation, route }) => {
  const id = route.params.id;
  
  const [adreply, setAdreply] = useState("");

  useEffect(() => {
    axios.get(`http://172.28.8.27:5000/inquiry/${id}`).then((res) => {
      console.log(res.data);
      setAdreply(res.data.adreply);
    });
  }, []);

  const editResponse = async (id) => {
    try {
      const updatedResponse = {
        adreply: adreply,
      };
      await axios
        .put(`http://172.28.8.27:5000/inquiry/${id}`, updatedResponse)
        .then((res) => {
          console.log(res.updatedResponse);
        });
      console.log(updatedResponse);
      alert("Response Updated Successfully");

      await axios.get("http://172.28.8.27:5000/inquiry/");

      navigation.navigate("AllUserInquiry Screen");
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setAdreply("");
  };

  return (
    <NativeBaseProvider>
      <Stack
        mb="2.5"
        mt="1.5"
        space={3}
        width={350}
        marginLeft={30}
        marginTop={30}
      >
        <Input 
          variant="outline" 
          placeholder="outline"
          onChangeText={(e) => setAdreply(e)} 
          value={adreply} 
        />
      </Stack>

      <View style={{ height: 30 }}></View>
      <HStack marginLeft={30}>
        <Button
          style={{ width: 170 }}
          variant="solid"
          colorScheme="green"
          startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
          onPress={() => editResponse(id)}
        >
          Edit Response
        </Button>
        <View style={{ width: 10 }}></View>
        <Button
          style={{ width: 170 }}
          variant="solid"
          colorScheme="red"
          startIcon={<Icon as={Ionicons} name="close-outline" size="sm" />}
          onPress={reset}
        >
          Reset Response
        </Button>
      </HStack>
    </NativeBaseProvider>
  );
};

export default EditResponseScreen;