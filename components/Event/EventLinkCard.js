import {View, Text, StyleSheet, Platform} from "react-native";
import {LinkPreview} from "@flyerhq/react-native-link-preview";
import ShareButton from "./ShareButton";
import {useEffect, useState} from "react";
import {vh, vw} from "react-native-expo-viewport-units";
import {Badge, Box, Button, Flex, useToast} from "native-base";
import * as Calendar from "../../helpers/Calendar";

const EventLinkCard = ({event}) => {

    const [eventData, setEventData] = useState(null)
    let [loadedData, setLoadedData] = useState(false)
    let [counter, setCounter] = useState(0)
    const toast = useToast();

    const saveToAgenda = async () => {
        console.log(`Trying to store event in calendar`)
        let dateString = event.pubDate,
            dateTimeParts = dateString.split(' '),
            pubDate = new Date(dateTimeParts[0]),
            estimatedStartDate = new Date(pubDate.setMonth(pubDate.getMonth() + 3)),
            estimatedEndDate = new Date(new Date(estimatedStartDate).setDate(estimatedStartDate.getDate() + 2))


        // let string = `${dateParts[0]}-${parseInt(dateParts[1])}-${dateParts[2]}`
        // date = new Date()
        // console.log(event.pubDate.toString())
        console.log(estimatedStartDate)
        console.log(estimatedEndDate)
        console.log(eventData)
        const calendarItem = await Calendar.createEvent(eventData.title, estimatedStartDate, estimatedEndDate, eventData.description)
        if (Platform.OS === 'android'){
            await Calendar.openEvent(calendarItem)
        }
        toast.show({
            render: () => {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    {`Created event for ${event.title} in calendar`}
                </Box>;
            }
        });

    }

    useEffect(() => {
        // console.log(event)
    }, [])

    function f(data) {
        if (eventData !== null) return
        setEventData(data)
        // console.log('Het is gelukt')
        // console.log(data)
        console.log(setEventData.link)
    }

    useEffect(()=>{
        console.log(eventData)
    },[eventData])

    return (
        <>
            <LinkPreview
                text={event.link}
                containerStyle={styles.container}
                enableAnimation={true}
                renderText={
                    ()=>{
                        let date = new Date(event.pubDate.split(' ', 1)[0]),
                            today = new Date()
                        date = date.setMonth(date.getMonth() + 4)

                        // if (currentDate > minDate && currentDate < maxDate ){
                        //     alert('Correct Date')
                        // }
                        console.log(date)
                        console.log(today)


                        return date > today? <Badge colorScheme="warning">Coming soon</Badge> : <Badge colorScheme="error">Event has ended</Badge>
                    }
                }
                onPreviewDataFetched={(data) => {
                    if (loadedData) return
                    setEventData(data)
                    setLoadedData(true)
                }}
            />
            {/*<VStack space={2.5} w="100%" px="3">*/}
            <Flex style={styles.buttonContainer} direction={"row"}>
                    <ShareButton loadedData={loadedData} content={eventData}/>
                <Button title={"Attend"} style={styles.button} onPress={saveToAgenda}><Text>Save in
                    agenda</Text></Button>

            </Flex>
            {/*</VStack>*/}

        </>
    )
}

// onPreviewDataFetched={
//     // (data)=>setEventData(data)
// }
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        marginTop: vh(3),
        marginBottom: vh(3),
        borderRadius: vw(3)
    },
    hidden: {
        display: "none"
    },
    buttonContainer: {
        width: '100%',
        // backgroundColor:'red'
    },
    button: {
        width: "50%"
    }
})
export default EventLinkCard
