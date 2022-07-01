import * as React from "react";
import {createDrawerNavigator, DrawerContentScrollView,} from "@react-navigation/drawer";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Box, Pressable, VStack, Text, Center, HStack, Divider, Icon, useColorMode, Flex,} from "native-base";
import CustomSwitch from "../components/Navigation/CustomSwitch";
import {useState} from "react";
import Events from "../screens/Events";
import {MapTabNavigation} from "./TabNavigation";
import {vh, vw} from "react-native-expo-viewport-units";

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
    const {colorMode, toggleColorMode} = useColorMode();
    const [authenticated, setAuthenticated] = useState(false)

    return (
        <DrawerContentScrollView style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white'}} variant="drawerContainer"{...props} safeArea>
            <VStack style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white',
                height: vh(100)
            }}>

                <VStack divider={<Divider/>} space="4" style={{
                    backgroundColor: colorMode === 'dark' ? '#000d20' : 'white',
                    color: colorMode === 'dark' ? '#000d20' : 'white',
                    height: '100%'

                }}>

                    <Flex justify={'space-between'} direction={'column'} >
                    {/*Menu items*/}
                    <VStack style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white'}}>
                        {props.state.routeNames.map((name, index) => (
                            <Pressable space="20" key={index}
                                // px="5"
                                       py="3"
                                       rounded="md"
                                       style={{
                                           backgroundColor: colorMode === 'dark' ? '#000d20' : 'white'
                                       }}
                                       onPress={(event) => {
                                           props.navigation.navigate(name);
                                       }}
                            >
                                <Center>

                                    <HStack alignItems="center" style={{
                                        backgroundColor: colorMode === 'dark' ? 'white' : '#000d20',
                                        paddingVertical: vh(1),
                                        width: '80%',
                                        borderRadius: 10
                                    }}>
                                        <Flex align={'center'} justify={'center'} direction={'row'}>

                                            <Icon color={
                                                index === props.state.index ? "primary.900" : "red"
                                            }
                                                  size="5"
                                                  as={<MaterialCommunityIcons name={getIcon(name)}/>}
                                            />

                                            <Text
                                                fontWeight={
                                                    index === props.state.index ? "800" : "500"
                                                }
                                                fontSize={
                                                    index === props.state.index ? "13" : "12"
                                                }
                                                color={
                                                    colorMode === 'dark' ? "#000" : "white"
                                                }
                                            >
                                                {name}
                                            </Text>
                                        </Flex>
                                    </HStack>
                                </Center>
                            </Pressable>
                        ))}
                    </VStack>
                     <Divider />
                        {/*Settings*/}
                    <VStack   style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white', color: colorMode === 'light' ? '#000d20' : 'white'}}>
                        <Text fontWeight="500" fontSize="14" px="5" py={'5'} style={{color: colorMode === 'light' ? '#000d20' : 'white'}}>
                            Settings
                        </Text>
                        <VStack space="3" style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white'}}>
                            <Pressable px="5" py="3" style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white'}}>
                                <HStack space="7" alignItems="center" style={{backgroundColor: colorMode === 'dark' ? '#000d20' : 'white'}}>
                                    <CustomSwitch name={'Dark mode'}/>
                                </HStack>
                            </Pressable>
                        </VStack>
                    </VStack>
                        <Divider/>
                    </Flex>

                </VStack>

            </VStack>
        </DrawerContentScrollView>
    );
}

function NotAuthenticated(props, nav) {
    return (<Text>{`Authenticated ${props.authenticated}`}</Text>)
}

function MyDrawer() {
    const {colorMode, toggleColorMode} = useColorMode();
    const [authenticated, setAuthenticated] = useState(true)
    return (
        <Drawer.Navigator
            screenOptions={{
                headerTransparent: true,
                // headerBlurEffect: 'systemMaterialDark',
                headerLargeTitle: true,
                headerBlurEffect: 'regular',
                headerStyle: {},
                headerLargeStyle: {
                    // backgroundColor: PlatformColor('systemGroupedBackgroundColor'),
                },
                headerTintColor: colorMode === 'dark' ? '#fff' : '#000d20',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Sneaker Stores">
                {props => <MapTabNavigation {...props}/>}
            </Drawer.Screen>
            <Drawer.Screen name="Events" component={Events}/>

        </Drawer.Navigator>
    );
}

export {MyDrawer, NotAuthenticated, getIcon}
