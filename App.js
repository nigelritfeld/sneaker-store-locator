import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, Box, useColorMode, Text, useToast, extendTheme} from "native-base";
import {useEffect, useRef, useState} from "react";
import * as LocalStorage from "./helpers/LocalStorage"
import {MyDrawer} from "./navigation/DrawerNavigation";
import {mode, theme} from "./helpers/Theme";
import NetInfo from "@react-native-community/netinfo";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from "expo-task-manager";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


TaskManager.defineTask('GET_BACKGROUND_LOCATION', ({data: {locations}, error}) => {
    if (error) {
        console.log(error)
        // check `error.message` for more details.
        return;
    }
    console.log('Received new locations', locations);
});
export default function App() {

    // States
    const [stores, setStores] = useState([])
    const {colorMode, setColorMode} = useColorMode()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // Feedback messages
    const toast = useToast();

    // Functions
    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token
    }

    useEffect(() => {
        (async () => {
            const darkMode = await mode()
            // Changing to initial settings
            extendTheme({
                config: {
                    initialColorMode: darkMode ? 'light' : 'dark',
                },
            })
            // Registering for push notifications
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });
            const stores = await LocalStorage.getStores()
            const unsubscribe = NetInfo.addEventListener(state => {
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                            <Text>{!state.isConnected ? `App is connected to the internet via ${state.type}` : `App has no internet connection`}</Text>
                        </Box>;
                    },
                })
            });
            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        })()
    }, [colorMode])

    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <MyDrawer/>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}


