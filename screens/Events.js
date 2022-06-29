import {useEffect, useRef, useState} from "react";
import {View, StyleSheet, Platform, SafeAreaView} from "react-native";
import {
    AspectRatio,
    Avatar,
    Box,
    Center,
    Heading,
    HStack,
    Icon, Image,
    Pressable,
    ScrollView, Spinner,
    Stack,
    Text, useColorMode,
    VStack
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { WebView } from 'react-native-webview';
import DomSelector from 'react-native-dom-parser';
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import {vh, vw} from "react-native-expo-viewport-units";
import EventSwipeList from "../components/EventSwipeList";
import * as LocalStorage from "../helpers/LocalStorage";
import * as Calendar from "../helpers/Calendar"


const Events = () => {
    const {colorMode} = useColorMode()
    const [events, setEvents] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [agendaPermission, setAgendaPermission] = useState(false)

    function Example() {
        const [mode, setMode] = useState("Basic");
        return <Center h="290px">
            <Box _dark={{
                bg: "coolGray.800"
            }} _light={{
                bg: "white"
            }} flex="1" safeAreaTop maxW="400px" w="100%">
                <Heading p="4" pb="3" size="lg">
                    Inbox
                </Heading>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Basic />
                </ScrollView>
            </Box>
        </Center>;
    }

    function SwipeListView(props) {
        return null;
    }

    function Basic() {
        const data = [{
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            fullName: "Afreen Khan",
            timeStamp: "12:47 PM",
            recentText: "Good Day!",
            avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }, {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            fullName: "Sujita Mathur",
            timeStamp: "11:11 PM",
            recentText: "Cheer up, there!",
            avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
        }, {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            fullName: "Anci Barroco",
            timeStamp: "6:22 PM",
            recentText: "Good Day!",
            avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
        }, {
            id: "68694a0f-3da1-431f-bd56-142371e29d72",
            fullName: "Aniket Kumar",
            timeStamp: "8:56 PM",
            recentText: "All the best",
            avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
        }, {
            id: "28694a0f-3da1-471f-bd96-142456e29d72",
            fullName: "Kiara",
            timeStamp: "12:47 PM",
            recentText: "I will call today.",
            avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
        }];
        const [listData, setListData] = useState(data);

        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        };

        const deleteRow = (rowMap, rowKey) => {
            closeRow(rowMap, rowKey);
            const newData = [...listData];
            const prevIndex = listData.findIndex(item => item.key === rowKey);
            newData.splice(prevIndex, 1);
            setListData(newData);
        };

        const onRowDidOpen = rowKey => {
            console.log("This row opened", rowKey);
        };

        const renderItem = ({item, index}) => <Box>
            <Pressable onPress={() => console.log("You touched me")} _dark={{
                bg: "coolGray.800"
            }} _light={{
                bg: "white"
            }}>
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar size="48px" source={{
                            uri: item.avatarUrl
                        }} />
                        <VStack>
                            <Text color="coolGray.800" _dark={{
                                color: "warmGray.50"
                            }} bold>
                                {item.fullName}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                {item.recentText}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }} alignSelf="flex-start">
                            {item.timeStamp}
                        </Text>
                    </HStack>
                </Box>
            </Pressable>
        </Box>;

        const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
            <Pressable w="70" ml="auto" cursor="pointer" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
                opacity: 0.5
            }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<Entypo name="dots-three-horizontal" />} size="xs" color="coolGray.800" />
                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                        More
                    </Text>
                </VStack>
            </Pressable>
            <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
                opacity: 0.5
            }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </VStack>
            </Pressable>
        </HStack>;

        return <Box bg="white" safeArea flex="1">
            <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={"0"} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
        </Box>;
    }

    const eventLinks = events.map((event,index) => {
        return(
            <LinkPreview
                key={index}
                text={event.link}
                containerStyle={styles.linkContainer}
                enableAnimation={true}
                renderText={()=> {
                    return (<Text>Location: {event.title}</Text>)
                }}
            />
        );
    })

    const Events = events.map((event,index) => {
        const HTML = event.content
        return <Box key={index} alignItems="center">
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
                            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        sneakerness
                    </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {event.title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {event.author}
                        </Text>
                    </Stack>
                    <View >
                        <Text>{event.content}</Text>
                    </View>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                6 mins ago
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>;
    })

    async function getSneakerNessEvents(){
        try {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fsneakerness.com%2Fevents%2Ffeed')
            return await response.json()
        }catch (e) {
            console.log(e)
        }
    }

    const extractText = (tag='description', text) => {
        console.log('TRYING TO EXTRACT METADATA FROM FETCH...')
        const expr = `<meta.*?name="` + tag + `".*?content="(.*?)".*?>|` + `<meta.*?content="(.*?)".*?name="` + tag+` image".*?>`
        const regex = new RegExp(expr);
        const found = text.match(regex);
        console.log('Text is')
        console.log(text)

    }

    useEffect(()=>{
        (async () => {
            try {
                const response = await getSneakerNessEvents()
                setEvents(response.items)

                setLoaded(true)
                const CalendarPermission = await Calendar.getPermissions()
                console.log(`Trying to store event in calendar`)
                const event = await Calendar.createEvent()


            }catch (e) {
                console.log(e)
            }

        })()
        // Promise.all(eventLinks)
        //     .then(async array => {
        //         for (let request of array){
        //             console.log(request)
        //
        //
        //         }
        //     }).catch(e=>console.log(e))

    },[])

    return (
        <SafeAreaView style={{backgroundColor: colorMode === 'dark' ? '#121212' : '#fff'}}>
            <Center>
                <ScrollView style={styles.container} maxW="100%" h="100%" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>

                    <Center mt="8" mb="4">
                        <VStack space={1} alignItems="left">
                        {/*<Heading fontSize="xl">Events</Heading>*/}
                        </VStack>
                        <Text>
                            Stay informed of the latest sneaker events or sneakerness.
                            Press on a event to visit the site for more info and tickets!
                        </Text>
                    </Center>
                    <VStack style={styles.list} flex="1">
                        {loaded ? eventLinks: <Spinner size={'lg'}/>}
                        {/*<EventSwipeList/>*/}
                        {/*{Events}*/}
                    </VStack>
                </ScrollView>
            </Center>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        // padding: 16,
        color:'red',
        width: vw(100),



    },
    list:{
    },
    webview:{
        color:'red',
    },
    linkContainer:{
        backgroundColor:'#e8e8e8',
        marginTop:vh(3),
        marginBottom:vh(3),
        borderRadius:vw(3)
    }
    },
);

export default Events
