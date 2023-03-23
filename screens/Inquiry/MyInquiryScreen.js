import React, { useState, useEffect } from "react";
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
} from "native-base";
import axios from "axios";

const MyInquiryScreen = ({ navigation }) => {
  const [inquiries, setInquiries] = useState();

  useEffect(() => {
    axios.get("inquiry/").then((res) => {
      setInquiries(res.data);
    });
  }, [navigation]);

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
      axios.get("inquiry/").then((res) => {
        setInquiries(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(`inquiry/${id}`);
      alert("Inquiry Deleted Successfully");
      navigation.navigate("MyInquiry Screen");

      await axios.get("inquiry/").then((res) => {
        setInquiries(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {inquiries &&
          inquiries.map((inquiry, index) => (
            <View key={index} style={styles.container}>
              <HStack mb="2.5" mt="1.5" width={350}>
                <VStack mb="2.5" mt="1.5" marginLeft={0}>
                  <HStack mb="2.5" mt="1.5" marginLeft={0}>
                    <VStack>
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
                        <Text style={styles.label}>Inquiry :</Text>
                        <Text style={styles.detail}>{inquiry.inq}</Text>
                      </View>
                    </VStack>
                    <VStack>
                      <Stack style={{ width: 110 }} marginLeft={3}>
                        <Button
                          onPress={() =>
                            navigation.navigate("EditInquiry Screen", {
                              id: inquiry._id,
                            })
                          }
                          variant="solid"
                          colorScheme="green"
                          startIcon={
                            <Icon as={Ionicons} name="open-outline" size="sm" />
                          }
                        >
                          Edit Inquiry
                        </Button>
                        <Spacer height={6} />
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
                          onPress={() => deleteInquiry(inquiry._id)}
                        >
                          Delete Inquiry
                        </Button>
                      </Stack>
                    </VStack>
                  </HStack>
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
                    {inquiry.adreply ===
                    "Our team will response to your inquiry soon" ? (
                      <VStack style={{ width: 130 }}>
                        <Button
                          variant="solid"
                          colorScheme="red"
                          startIcon={
                            <Icon
                              as={Ionicons}
                              name="close-outline"
                              size="sm"
                            />
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
                          startIcon={
                            <Icon as={Ionicons} name="open-outline" size="sm" />
                          }
                        >
                          Response Added
                        </Button>
                      </VStack>
                    )}
                  </VStack>
                  <View style={styles.detailContainer}>
                    <Text style={styles.label}>Response :</Text>
                    <Text style={styles.detail}>{inquiry.adreply}</Text>
                  </View>
                </VStack>
              </HStack>
            </View>
          ))}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default MyInquiryScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#F7F1E5",
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
