import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Input,
  Stack,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import AlertBox from "../../../components/AlertBox";

export default function UpdateTable({ navigation, route }) {
  const { id } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const [image, setImage] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorUsers, setErrorUsers] = useState("");
  const [errorImage, setErrorImage] = useState("");

  const toast = useToast();

  const getTable = async () => {
    await axios.get(`table/${id}`).then((res) => {
      setName(res.data.name);
      setDescription(res.data.description);
      setUsers(res.data.users);
      setImage(res.data.image);
    });
  };

  useEffect(() => {
    getTable();
  }, []);

  const UpdateTable = async () => {
    try {
      if (name === "") {
        setErrorName("Please Enter a Table Type Name");
      }
      if (description === "") {
        setErrorDescription("Please Enter a Table Description");
      }
      if (users === "") {
        setErrorUsers("Please Enter a Table User Amount");
      }
      if (image === "") {
        setErrorImage("Please Enter a Image URL");
      } else {
        const data = {
          name,
          description,
          users,
          image,
        };
        await axios.put(`table/${id}`, data);

        toast.show({
          placement: "top",
          render: () => {
            return (
              <AlertBox
                title="Table Details Updated"
                description="Table Details has been updated successfully"
                status="success"
              />
            );
          },
        });
        console.log(data);

        navigation.navigate("Table List");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
      <Input
        variant="outline"
        placeholder="Table Type Name"
        value={name}
        onChangeText={(e) => setName(e)}
      />
      {errorName && (
        <Text style={{ color: "red" }}>
          Please Enter a Table Type Name{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}

      <Input
        variant="outline"
        placeholder="Description"
        value={description}
        onChangeText={(e) => setDescription(e)}
      />
      {errorDescription && (
        <Text style={{ color: "red" }}>
          Please Enter a Table Description{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}
      <Input
        variant="outline"
        placeholder="Users"
        value={users}
        onChangeText={(e) => setUsers(e)}
      />
      {errorUsers && (
        <Text style={{ color: "red" }}>
          Please Enter a Table User Amount{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}
      <Input
        variant="outline"
        placeholder="Image"
        value={image}
        onChangeText={(e) => setImage(e)}
      />
      {errorImage && (
        <Text style={{ color: "red" }}>
          Please Enter a Image URL{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}

      <Button colorScheme="orange" size="sm" onPress={() => UpdateTable()}>
        Update Table
      </Button>
    </Stack>
  );
}
