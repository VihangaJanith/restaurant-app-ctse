import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  VStack,
  Icon,
  NativeBaseProvider,
  Button,
  Text,
  HStack,
  View,
  Stack,
  Spacer,
  AlertDialog,
} from "native-base";
import axios from "axios";

const Inquiry = (props) => {
  const { inquiry, navigation, index } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <View key={index} style={styles.container}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Inquiry Details</AlertDialog.Header>
          <AlertDialog.Body>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Name :</Text>
              <Text style={styles.detail}>{inquiry.name}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Phone :</Text>
              <Text style={styles.detail}>{inquiry.phone}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Email :</Text>
              <Text style={styles.detail}>{inquiry.email}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Admin Response :</Text>
              <Text style={styles.detail}>{inquiry.adreply}</Text>
            </View>
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

              {inquiry.adreply ===
              "Our team will response to your inquiry soon" ? (
                <Button
                  mr="18.5"
                  onPress={() =>
                    navigation.navigate("EditResponse Screen", {
                      id: inquiry._id,
                    })
                  }
                  variant="solid"
                  colorScheme="green"
                  startIcon={
                    <Icon as={Ionicons} name="add-outline" size="sm" />
                  }
                >
                  Add Response
                </Button>
              ) : (
                <Button
                  mr="18.5"
                  onPress={() =>
                    navigation.navigate("EditResponse Screen", {
                      id: inquiry._id,
                    })
                  }
                  variant="solid"
                  colorScheme="yellow"
                  startIcon={
                    <Icon as={Ionicons} name="open-outline" size="sm" />
                  }
                >
                  Edit Response
                </Button>
              )}
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <VStack mb="2.5" mt="1.5" marginLeft={0}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Inquiry :</Text>
          <Text style={styles.detail}>{inquiry.inq}</Text>
        </View>
        <Spacer height={2} />
        <HStack>
          <HStack style={{ width: 110 }} marginLeft={0}>
            <HStack>
              {inquiry.adreply ===
              "Our team will response to your inquiry soon" ? (
                <HStack>
                  <Button
                    mr="18.5"
                    onPress={() =>
                      navigation.navigate("EditResponse Screen", {
                        id: inquiry._id,
                      })
                    }
                    variant="solid"
                    colorScheme="green"
                    startIcon={
                      <Icon as={Ionicons} name="add-outline" size="sm" />
                    }
                  >
                    Add Response
                  </Button>
                </HStack>
              ) : (
                <HStack>
                  <Button
                    mr="18.5"
                    onPress={() =>
                      navigation.navigate("EditResponse Screen", {
                        id: inquiry._id,
                      })
                    }
                    variant="solid"
                    colorScheme="yellow"
                    startIcon={
                      <Icon as={Ionicons} name="open-outline" size="sm" />
                    }
                  >
                    Edit Response
                  </Button>
                </HStack>
              )}
            </HStack>
            <Spacer height={6} />
            <Button
              onPress={() => {
                setIsOpen(!isOpen);
                console.log("aaaaa");
              }}
              variant="solid"
              colorScheme="violet"
              startIcon={<Icon as={Ionicons} name="eye-outline" size="sm" />}
            >
              View Response
            </Button>
          </HStack>
        </HStack>

        <Spacer height={2} />
        <View style={[styles.detailContainer, styles.horizontalLine]}>
          <View style={styles.line} />
        </View>

        <VStack
          mb="2.5"
          mt="1.5"
          marginLeft={0}
          marginTop={3}
          flexDirection={"row"}
        >
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Response Status :</Text>
          </View>
          {inquiry.adreply === "Our team will response to your inquiry soon" ? (
            <VStack style={{ width: 130 }}>
              <Button
                variant="solid"
                colorScheme="red"
                startIcon={
                  <Icon as={Ionicons} name="close-outline" size="sm" />
                }
              >
                Haven't Responded
              </Button>
            </VStack>
          ) : (
            <VStack style={{ width: 130 }}>
              <Button
                variant="solid"
                colorScheme="green"
                startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
              >
                Response Added
              </Button>
            </VStack>
          )}
        </VStack>
      </VStack>
    </View>
  );
};

const MyInquiryScreen = ({ navigation }) => {
  const [inquiries, setInquiries] = useState();

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
    //setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("http://172.28.8.27:5000/inquiry/").then((res) => {
        setInquiries(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    axios.get("http://172.28.8.27:5000/inquiry/").then((res) => {
      setInquiries(res.data);
    });
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {inquiries &&
          inquiries.map((inquiry, index) => (
            <Inquiry inquiry={inquiry} key={index} navigation={navigation} />
          ))}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default MyInquiryScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "lightgrey",
    marginTop: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    padding: 20,
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333",
  },
  detail: {
    fontSize: 16,
    color: "#555",
  },
  horizontalLine: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "99%",
  },
});
