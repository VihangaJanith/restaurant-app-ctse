import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  useToast,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";

// import { Container } from './styles';

const UpdateBooking = ({ navigation, route }) => {
  const id = route.params.id;

  const [tabletype, setTabletype] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [errorDate, setErrorDate] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const toast = useToast();

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    const selectedDate = new Date(selectedTime);
    const selectedHours = selectedDate.getHours();

    if (selectedHours >= 9 && selectedHours < 22) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
      setErrorTime(false);
      hideTimePicker();
    } else {
      hideTimePicker();
      toast.show({
        render: () => {
          return (
            <Box bg="red.600" px="2" py="2" rounded="lg" mb={5}>
              <Text style={{ color: "white" }}>
                Restaurant Opens at 9:00 AM and Closes at 10:00 PM
              </Text>
            </Box>
          );
        },
      });
    }
  };

  const handlePhoneChange = (value) => {
    setErrorPhone(false);
    setPhone(value);
  };

  // const handleTimeConfirm = (selectedTime) => {
  //   const selectedDate = new Date(selectedTime);
  //   const selectedHours = selectedDate.getHours();

  //   if (selectedHours > 9 && selectedHours < 22) {
  //     const formattedTime = selectedDate.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //     setTime(formattedTime);
  //     hideDatePicker();
  //   } else {
  //     hideTimePicker();
  //     alert("The Restaurant Opens at 9:00 AM and Closes at 10:00 PM");
  //   }
  // };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const converteddate = date.toLocaleDateString();
    setDate(converteddate);
    console.log(converteddate);
    console.warn("A date has been picked: ", date);
    setErrorDate(false);
    hideDatePicker();
  };

  useEffect(() => {
    console.log(id);
    axios.get(`tablebooking/${id}`).then((res) => {
      setTabletype(res.data.tabletype);
      setDate(res.data.date);
      setTime(res.data.time);
      setPhone(res.data.phone);

      console.log(res.data);
    });

    console.log(time);
  }, []);

  const minimumTime = new Date();
  minimumTime.setHours(9, 0, 0, 0); // Set minimum time to 9:00 AM
  const maximumTime = new Date();
  maximumTime.setHours(17, 0, 0, 0); // Set maximum time to 5:00 PM

  const updateBooking = async () => {
    try {
      if (date === "") {
        setErrorDate("Please Select a Date");
      }
      if (time === "") {
        setErrorTime("Please Select a Time");
      }
      if (phone === "") {
        setErrorPhone("Please Enter a Phone Number");
      }
      if (date && time && phone) {
        const res = await axios.put(`tablebooking/${id}`, {
          date,
          time,
          phone,
        });
        console.log(res.data);
        // navigation.navigate('Booking')
        navigation.navigate("Booked List");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Book {tabletype}</Text>

      <Input
        variant="outline"
        placeholder="Table Type"
        value={tabletype}
        disabled={true}
        mb={4}
        mt={4}
        size="lg"
      />

      {/* <Input
        variant="outline"
        placeholder="User ID"
        value={userid}
        disabled={true}
      /> */}

      <Input
        variant="outline"
        placeholder="Date"
        value={date}
        size="lg"
        InputRightElement={
          <Button
            rounded="xs"
            w="2/6"
            h="full"
            onPress={showDatePicker}
            colorScheme="amber"
          >
            <Ionicons name="calendar" size={24} color="white" />
          </Button>
        }
      />

      {errorDate && (
        <Text style={{ color: "red" }}>
          Please Select a Date{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        backdropStyleIOS={{ backgroundColor: "red" }}
        cancelTextIOS="Cancel"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Input
        variant="outline"
        placeholder="Time"
        value={time}
        size="lg"
        InputRightElement={
          <Button
            rounded="xs"
            w="2/6"
            h="full"
            onPress={showTimePicker}
            colorScheme="amber"
          >
            <Ionicons name="time" size={24} color="white" />
          </Button>
        }
      />

      {errorTime && (
        <Text style={{ color: "red" }}>
          Please Select a Time{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        minimumDate={minimumTime}
        maximumDate={maximumTime}
      />

      <Input
        variant="outline"
        placeholder="Phone"
        value={phone}
        size="lg"
        onChangeText={handlePhoneChange}
      />
      {errorPhone && (
        <Text style={{ color: "red" }}>
          Please Enter a Phone Number{" "}
          <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
        </Text>
      )}

      {/* 
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
      )} */}

      <Button colorScheme="orange" size="sm" onPress={() => updateBooking()}>
        Add Table
      </Button>
    </Stack>
  );
};

export default UpdateBooking;
