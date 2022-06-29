// import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Stores from "./screens/Stores";
import Test from "./screens/Test";
import Map from "./screens/Map";
import Settings from "./screens/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    NativeBaseProvider,
    Box,
    extendTheme,
    themeTools,
    Center,
    StatusBar,
    useColorMode,
    Text,
    useToast
} from "native-base";
import {useCallback, useEffect, useState} from "react";
import * as Database from "./helpers/Database"
import Events from "./screens/Events";
import {deleteStoresTables} from "./helpers/Database";
import {Appearance} from "react-native";
import DrawerNavigation from "./components/DrawerNavigation";
import * as Auth from './helpers/Authentication';
import {mode, theme} from "./helpers/Theme";
import {vh, vw} from "react-native-expo-viewport-units";
import NetInfo from "@react-native-community/netinfo";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    const [test, setTest] = useState('INITAL TEST')
    const [stores, setStores] = useState([])
    const [favoriteStoresCount, setFavoriteStoresCount] = useState(0)
    const [themeModes, setThemeModes] = useState(Appearance.getColorScheme());
    const [authenticated, setAuthenticated] = useState(false)
    const {colorMode, setColorMode} = useColorMode()
    const getFavoriteStoresCount = async () => {
        const stores = await Database.getRecords('stores')

        console.log('---------APPJS---------')
        console.log(typeof stores)
        console.log(stores)
        console.log('---------APPJS---------')
    }
    const toast = useToast();



    useEffect(() => {
        (async() => {
            const darkModes = await mode()
            setThemeModes(darkModes ? 'light' : 'dark' )
            setColorMode(themeModes)
            const unsubscribe = NetInfo.addEventListener(state => {
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                            <Text>{!state.isConnected ? `App is connected to the internet via ${state.type}` : `App has no internet connection`}</Text>
                        </Box>;
                    },
                })
            });
            // Auth.onFaceId()
            //     .then(r => {
            //         const {success} = r
            //         if (success){
            //             setAuthenticated(true)
            //             console.log(`Authenticated ${authenticated}`)
            //         }
            //     })
            Database.getCount('stores').then(count => console.log(`Saved stores = ${count}`))
        })()
    },[])



    console.log('creating component..')
    console.log(authenticated)
    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar
                backgroundColor="#61dafb"
                barStyle={colorMode === 'dark' ? 'dark': 'light-content'}
            />
            {
            <DrawerNavigation props={{setFavoriteStoresCount,favoriteStoresCount, authenticated, themeModes}}/>
            }
            {/*<NavigationContainer theme={theme === 'dark' ?  MyTheme: DarkTheme}>*/}
            {/*    <Tab.Navigator*/}
            {/*        screenOptions={({route}) => ({*/}
            {/*            tabBarActiveTintColor: 'tomato',*/}
            {/*            tabBarInactiveTintColor: 'gray',*/}
            {/*            tabBarShowLabel: true,*/}
            {/*            tabBarStyle: {*/}
            {/*                borderRadius:40,*/}
            {/*                marginBottom:40,*/}
            {/*                backgroundColor: theme === 'light' ?  'red': ''*/}

            {/*            },*/}
            {/*        })}>*/}
            {/*        <Tab.Screen name="Stores" options={{tabBarBadge: favoriteStoresCount}}>*/}
            {/*            {props => <Stores {...props} props={{*/}
            {/*                setFavoriteStoresCount*/}
            {/*            }}/>}*/}
            {/*        </Tab.Screen>*/}
            {/*        <Tab.Screen name="Settings" component={Settings}/>*/}
            {/*        <Tab.Screen name="Map" component={Map}/>*/}
            {/*        <Tab.Screen name="Events" component={Events}/>*/}
            {/*    </Tab.Navigator>*/}
            {/*</NavigationContainer>*/}
        </NativeBaseProvider>
    );
}


