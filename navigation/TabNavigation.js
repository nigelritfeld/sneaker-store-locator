import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import Stores from "../screens/Stores";
const Tab = createBottomTabNavigator();
import Map from '../screens/Map'
import {useColorMode} from "native-base";
const MapTabNavigation = () => {
    const {colorMode} = useColorMode()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: [
                    {
                        backgroundColor: colorMode === 'dark' ? '#121212' : '#fff',
                        color: colorMode === 'light' ? '#121212' : '#fff'
                    }
                ]
        }}

        >
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Stores" component={Stores} />
        </Tab.Navigator>
    );
};
export {MapTabNavigation};
