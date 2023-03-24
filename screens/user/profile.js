import {
    Button,
    HStack,
    Input,
    NativeBaseProvider,
    VStack,
    Stack,
    Icon,
    Text,
    Spacer,
    Pressable,
    Box,
    View,
    useToast,
    Image
  } from "native-base";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useState } from "react";
  import axios from "axios";
  import {  Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AlertBox from "../../components/AlertBox";
import {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from "react-native";

const ProfileScreen = ({ navigation }) => {
    const toast = useToast();
    const [show, setShow] = React.useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        setEmail("kavindupro40@gmail.com")
        setName("Kavindu")
        setMobile("071-988219")
        

    }, []);

    btnUpdate = () =>  {
        setName()
    }
   

    useEffect(() => {
        
        AsyncStorage.getItem("token").then((value) => {
            console.log({token:value.substring(2, value.length - 2)})
            axios.post('https://sliitfoodsystem.onrender.com/user/view',{
                token: {token:value.substring(2, value.length - 2)}
            })
            .then(response => {
                if(response.data){
                    console.log(response.data);
    
                }
                else{
                    
                }
            })
            .catch(error => {
                console.log(error);
            });
        });
        
        
    } , []);

    return (
    <NativeBaseProvider>
        
        <Center flex={1} px="3">
               
             {/* <View style={{marginTop: 10 }}>
                <Image
                    source={require('../../assets/profile.png')}
                    style={{width: 200, height: 200,marginBottom: 30, alignSelf: 'center' }}
                />
            </View> */}

            <Stack space={1} w="75%" maxW="300px" mx="auto">
                <Text> Name</Text>
                <Input size="sm" placeholder="First Name" value={name} onChangeText={(e) => setName(e)}/>
                <Text >Email</Text>
                <Input size="sm" placeholder="example@gmail.com" value={email} onChangeText={(e) => setEmail(e)} />
                <Text >Mobile Number</Text>
                <Input size="sm" placeholder="071-9882***" value={mobile} onChangeText={(e) => setMobile(e)} />
                <Text >Password</Text>
                <Input size="sm" placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} />
            </Stack>;

            <Button
            style={{ width: 250, marginLeft: 10, marginTop: 25 }}
            variant="solid"
            colorScheme="lightBlue"
            startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
            onPress={() => btnUpdate()}
            >
                Login
            </Button>

         //   <Text style={styles.baseText} onPress={()=>navigation.navigate('register')} >Register</Text>
        </Center>
    </NativeBaseProvider>
    );
  };

  const styles = StyleSheet.create({
    baseText: {
      marginTop: '5%',
      color: 'red',

    }
  });
  export default ProfileScreen;
  