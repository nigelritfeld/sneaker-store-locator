import {createStackNavigator} from "@react-navigation/stack";
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import Map from "../screens/Map";
import Stores from "../screens/Stores";
import {Appearance} from "react-native";
import {getDarkModeSettings} from "../helpers/LocalStorage";
import {useEffect} from "react";
import {useColorMode} from "native-base";

const Stack = createStackNavigator();
const MapStackNavigator = () => {
    const {colorMode} = useColorMode()
    return (
        <Stack.Navigator

            theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Stack.Screen name="MapStores" component={Map}/>
            <Stack.Screen name="Stores" component={Stores}/>
        </Stack.Navigator>
    );
};

export {MapStackNavigator}
