import {useEffect, useState} from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import {Box, Button, Center, ScrollView, Spinner, Text, useColorMode, useToast, VStack} from "native-base";
import {vw} from "react-native-expo-viewport-units";

import * as Calendar from "../helpers/Calendar"
import EventLinkCard from "../components/Event/EventLinkCard";
import * as Auth from "../helpers/Authentication";

const Events = () => {
    const {colorMode} = useColorMode()
    const [events, setEvents] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const toast = useToast()
    const eventLinks = events.map((event, index) => {
        return (
            <EventLinkCard key={index} event={event}/>
        );
    })


    async function getSneakerNessEvents() {
        try {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fsneakerness.com%2Fevents%2Ffeed')
            const feed = await response.json()
            return feed.items

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                Auth.onFaceId()
                    .then(r => {
                        const {success} = r
                        if (success){
                            setAuthenticated(true)
                            toast.show({
                                render: () => {
                                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                        {`Successfully authenticated`}
                                    </Box>;
                                }
                            });
                        }else{
                            toast.show({
                                position: 'top',
                                render: () => {
                                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                        {`Authentication failed`}
                                    </Box>;
                                }
                            });
                        }

                    })

                const events = await getSneakerNessEvents()
                setEvents(events)
                setLoaded(true)
                const CalendarPermission = await Calendar.getPermissions()
                if (CalendarPermission){
                    // console.log(Calendar)
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])


    return (
        <SafeAreaView style={{backgroundColor: colorMode === 'dark' ? '#121212' : '#fefefe'}}>
            <Center>

                {authenticated ?
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
                                Stay informed of the latest sneaker events or SneakerNess.
                                Press on a event to visit the site for more info and tickets!
                            </Text>
                        </Center>
                        <VStack flex="1">
                            {loaded ? eventLinks: <Spinner size={'lg'}/>}
                        </VStack>
                    </ScrollView>:
                    <Center mt="8" mb="4">
                        <VStack space={1} alignItems="left">
                            {/*<Heading fontSize="xl">Events</Heading>*/}
                        </VStack>
                        <Text>
                            You're not authenticated..
                        </Text>
                        <Button onPress={()=>{
                            Auth.onFaceId()
                                .then(r => {
                                    const {success} = r
                                    if (success){
                                        setAuthenticated(true)
                                        toast.show({
                                            render: () => {
                                                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                                    {`Successfully authenticated`}
                                                </Box>;
                                            }
                                        });
                                    }else{
                                        toast.show({
                                            position: 'top',
                                            render: () => {
                                                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                                    {`Authentication failed`}
                                                </Box>;
                                            }
                                        });
                                    }

                                })}
                        }>
                            Authenticate
                        </Button>
                    </Center>
                }

            </Center>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
        container: {
            width: vw(100),
        },

    },
);

export default Events
