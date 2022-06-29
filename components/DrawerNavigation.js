import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {
    NativeBaseProvider,
    Button,
    Box,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    HStack,
    Divider,
    Icon, useColorMode,
} from "native-base";
import Map from "../screens/Map";
import Stores from "../screens/Stores";
import CustomSwitch from "./CustomSwitch";
import SplashScreen from "../screens/SplashScreen";
import {useState} from "react";
import Events from "../screens/Events";
import {MapTabNavigation} from "../navigation/TabNavigation";
import {MapStackNavigator} from '../navigation/StackNavigation'
import {PlatformColor} from "react-native";
const Drawer = createDrawerNavigator();

function Component(props) {
    return (
        <Center>
            <Text mt="12" fontSize="18">
                Authenticate your self via Touch ID or Face ID
            </Text>
        </Center>
    );
}

const getIcon = (screenName) => {
    switch (screenName) {
        case "Inbox":
            return "email";
        case "Outbox":
            return "send";
        case "Favorites":
            return "heart";
        case "Archive":
            return "archive";
        case "Trash":
            return "trash-can";
        case "Spam":
            return "alert-circle";
        default:
            return undefined;
    }
};

function CustomDrawerContent(props) {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    return (
        <DrawerContentScrollView style={{backgroundColor: colorMode === 'dark' ? '#121212' : '#fefefe'}}
             {...props} safeArea>
            <VStack>
                {
                    props.authenticated ?
                        <>
                            <Box px="4">
                                <Text bold color="gray.700">
                                    Mail
                                </Text>
                                <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
                                    john_doe@gmail.com
                                </Text>
                            </Box>
                        </>
                        :
                        <>

                        </>

                }

                <VStack divider={<Divider/>} space="4">
                    <VStack space="3">
                        {props.state.routeNames.map((name, index) => (
                            <Pressable key={index}
                                       px="5"
                                       py="3"
                                       rounded="md"
                                       bg={
                                           index === props.state.index
                                               ? "rgba(6, 182, 212, 0.1)"
                                               : "transparent"
                                       }
                                       onPress={(event) => {
                                           props.navigation.navigate(name);
                                       }}
                            >
                                <HStack space="7" alignItems="center">
                                    <Icon
                                        color={
                                            index === props.state.index ? "primary.500" : "gray.500"
                                        }
                                        size="5"
                                        as={<MaterialCommunityIcons name={getIcon(name)}/>}
                                    />
                                    <Text
                                        fontWeight="500"
                                        color={
                                            index === props.state.index ? "primary.500" : "gray.700"
                                        }
                                    >
                                        {name}
                                    </Text>
                                </HStack>
                            </Pressable>
                        ))}
                    </VStack>
                    <VStack space="5">
                        <Text fontWeight="500" fontSize="14" px="5" color="gray.500">
                            Settings
                        </Text>
                        <VStack space="3">
                            <Pressable px="5" py="3">
                                <HStack space="7" alignItems="center">
                                    <CustomSwitch name={'Dark mode'}/>
                                </HStack>
                            </Pressable>
                            {/*<Pressable px="5" py="2">*/}
                            {/*    <HStack space="7" alignItems="center">*/}
                            {/*        <Icon*/}
                            {/*            color="gray.500"*/}
                            {/*            size="5"*/}
                            {/*            as={<MaterialCommunityIcons name="bookmark" />}*/}
                            {/*        />*/}
                            {/*        <Text color="gray.700" fontWeight="500">*/}
                            {/*            Friends*/}
                            {/*        </Text>*/}
                            {/*    </HStack>*/}
                            {/*</Pressable>*/}
                            {/*<Pressable px="5" py="3">*/}
                            {/*    <HStack space="7" alignItems="center">*/}
                            {/*        <Icon*/}
                            {/*            color="gray.500"*/}
                            {/*            size="5"*/}
                            {/*            as={<MaterialCommunityIcons name="bookmark" />}*/}
                            {/*        />*/}
                            {/*        <Text fontWeight="500" color="gray.700">*/}
                            {/*            Work*/}
                            {/*        </Text>*/}
                            {/*    </HStack>*/}
                            {/*</Pressable>*/}
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView>
    );
}

function NotAuthenticated(props, nav) {
    console.log(props)
    return (<Text>{`Authenticated ${props.authenticated}`}</Text>)
}

function MyDrawer(props) {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();
    const [authenticated, setAuthenticated] = useState(props.authenticated)
    // if (isLoading) {
    //     // We haven't finished checking for the token yet
    //     return <SplashScreen />;
    // }
    return (
        <Drawer.Navigator
            screenOptions={{
                headerTransparent: true,
                // headerBlurEffect: 'systemMaterialDark',
                headerLargeTitle: true,
                headerBlurEffect: 'regular',
                headerStyle: {
                backgroundColor: colorMode === 'dark' ?  '#212121' : '#fff',
            },
                headerLargeStyle: {
                    backgroundColor: PlatformColor('systemGroupedBackgroundColor'), // Color of your background
                },
                headerTintColor: colorMode === 'dark' ?  '#fff' : '#212121',

                // drawerPosition:'right'
            }}
            drawerContent={(props) => <CustomDrawerContent authenticated={authenticated} {...props} />}
        >
            {/*<Drawer.Screen name="Stores" options={{tabBarBadge: 1}}>*/}
            {/*    {*/}
            {/*        props => <Stores {...props}/>*/}
            {/*    }*/}
            {/*</Drawer.Screen>*/}
            <Drawer.Screen name="Sneaker Stores" component={MapTabNavigation}/>
            <Drawer.Screen name="Events" component={Events}/>
            {
                authenticated ?
                    <>

                        <Drawer.Screen name="Favorites">
                            {
                                props => <NotAuthenticated {...props}/>
                            }
                        </Drawer.Screen>
                    </> :
                    <>
                        <Drawer.Screen name="Login" component={Component}/>
                    </>
            }
        </Drawer.Navigator>

    );
}

export default function DrawerNavigation({setFavoriteStoresCount, favoriteStoresCount, authenticated, themeModes}) {
    console.log('Drawer navigation')
    console.log(authenticated)
    return (
        <NavigationContainer>
            <MyDrawer props={{setFavoriteStoresCount, favoriteStoresCount, authenticated, themeModes}}/>
        </NavigationContainer>
    );
}


