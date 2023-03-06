import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { Box, Heading, View,FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button , Icon, Input, WarningOutlineIcon, Divider} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

const Example = (props) => {
    const {table} = props;

    return <Box alignItems="center"  style={styles.aaaaa}>
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
                uri: table.image
            }} alt="image" />
            </AspectRatio>
            <Center bg="violet.500" _dark={{
            bg: "violet.400"
          }} _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
          }} position="absolute" bottom="0" px="3" py="1.5"
            roundedTopRight="lg"
          >
              {table.users + ' Person'}
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
              {table.name}
              
              </Heading>
              <Text fontSize="xs" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                {table.users} Person
              </Text>
            </Stack>
            <Text fontWeight="400">
                {table.description}
            </Text> 
             {/* <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                Book Table
                </Button> */}
           
      
      <Button variant="solid" colorScheme="red" startIcon={<Icon as={Ionicons} name="book-outline" size="sm" />}>
        Book Table
      </Button>
 


            {/* <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            
            </HStack> */}
          </Stack>
        </Box>
      </Box>
 

  };



const HomeScreen = ({ navigation }) => {


  const [tables, setTables] = useState(); 
  const [searchkey, setsearchkey] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [notab, setNotab] = useState(false);



    useEffect(() => {
        try {

           fetch('http://192.168.83.175:5000/table/')
           .then(response => response.json())
           .then(data => setTables(data))
           .catch(error => console.error(error))
       


        }
        catch (error) {
            console.log(error);
        }



    }, []);

    const filterPackages =  (searchkey) => {
      try {
        setIsLoading(true);
        console.log(searchkey);
    
        const response = axios.get('http://192.168.83.175:5000/table/');
        console.log({response});
        const filteredPackages = response.data.filter((tables) =>
          tables.name.toLowerCase().includes(searchkey)
        );
        if (filteredPackages.length > 0) {
          setTables(filteredPackages);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
    
          setNotab(true);
          setTimeout(() => {
            setNotab(false);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    





  return (
    
      

<NativeBaseProvider>
         
     
         

            <View flexDirection="row" alignItems="center" margin={2} >
      <Input
        placeholder="Search Table"
        // value={searchText}
        // onChangeText={setSearchText}
        value={searchkey}  onChangeText={(newText) => setsearchkey(newText)}
        flex={1}
        margin={2}
      />
      
    <Button
  variant="solid"
  colorScheme="red"
  startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
  onPress={() => filterPackages(searchkey)}
>

       
      </Button>
    </View>


         
<ScrollView >  
<Center flex={1} px="3" >
 
{tables && tables.map((table , index) => (
                <Example table={table} key={index} />
                ))} 
                 
            </Center>
          </ScrollView>
    </NativeBaseProvider>



      

  )
}



export default HomeScreen;

const styles = StyleSheet.create({
    aaaaa: {
      boxShadow: "1px 1px 1px 1px #ccc",
        border: "1px solid red",
  
      marginTop: 10,
    },
  });