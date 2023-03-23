import {
  Button,
  FormControl,
  Icon,
  Input,
  useToast,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AlertBox from "../../../components/AlertBox";

// import { Container } from './styles';

const AddTable = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const [image, setImage] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorUsers, setErrorUsers] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const toast = useToast();

  const handleNameChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorName(false);
    setName(value);
  };
  const handleDescriptionChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorDescription(false);
    setDescription(value);
  };
  const handleUsersChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorUsers(false);
    setUsers(value);
  };
  const handleImageChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorImage(false);
    setImage(value);
  };

  const addTable = async (props) => {
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
        await axios
          // .post("http://192.168.8.113:5000/table/add", data)
          .post("table/add", data)
          .then((res) => {
            console.log(res.data);
          });
        console.log(data);
        await axios.get("table/");

        toast.show({
          placement: "top",
          render: () => {
            return (
              <AlertBox
                title="Table Added"
                description="A New Table Type has been added successfully"
                status="success"
              />
            );
          },
        });

        //   await axios.get('http://192.168.8.113:5000/inquiry/')

        navigation.navigate("Table List", { newItem: data });
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
        onChangeText={handleNameChange}
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
        onChangeText={handleDescriptionChange}
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
        onChangeText={handleUsersChange}
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
        onChangeText={handleImageChange}
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

      <Button colorScheme="orange" size="sm" onPress={() => addTable()}>
        Add Table
      </Button>
    </Stack>
  );
};

export default AddTable;
