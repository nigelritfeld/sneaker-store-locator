import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import {useColorMode} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Stores from "../screens/Stores";
import MapScreen from "../screens/MapScreen";

const MapTabNavigation = (navigation) => {
    const {colorMode} = useColorMode()
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Stores') {
                            iconName = focused ? 'store-marker' : 'store-marker-outline';
                            return <MaterialCommunityIcons name={iconName} size={24} color={colorMode === 'dark' ? 'white': '#000d20'} />
                        } else if (route.name === 'Map') {
                            iconName = focused ? 'ios-map' : 'ios-map-outline';
                        return <Ionicons name={iconName} size={size} color={colorMode === 'dark' ? 'white': '#000d20'} />;
                        }

                        // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarStyle: [
                        {
                            backgroundColor: colorMode === 'dark' ? '#000d20' : '#fff',
                            color: colorMode === 'light' ? '#000d20' : '#fff'
                        }
                    ],
                })
            }

        >
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Stores" component={Stores} />
        </Tab.Navigator>
    );
};
export {MapTabNavigation};
