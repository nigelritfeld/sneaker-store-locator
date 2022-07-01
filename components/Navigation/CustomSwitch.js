import {View, StyleSheet} from "react-native";
import {HStack, Switch, Text , useColorMode} from "native-base";
import {useEffect, useRef, useState} from "react";
import * as LocalStorage from '../../helpers/LocalStorage'
import {StatusBar} from "react-native";
import {setStatusBarStyle} from "expo-status-bar";

const CustomSwitch = ({name = ''}) => {
    const [isEnabled, setEnabled] = useState(false)
    const {colorMode, toggleColorMode, setColorMode} = useColorMode();
    const [barStyle, setBarStyle] = useState(colorMode === 'dark' ? 'light-content' : 'dark-content')

    const toggleSwitch = () => {
        console.log('Toggle Modes')
        LocalStorage.toggleDarkModes()
            .then((bool) =>{
                console.log(bool)
                setEnabled(bool)
                toggleColorMode()
                setBarStyle(colorMode === 'dark' ?  'dark-content': 'light-content' )
            }).catch(e=>console.log(e.message))
    }

    useEffect(()=>{
        LocalStorage.getDarkModeSettings()
            .then(bool =>{
                setEnabled((bool === 'true'))
                console.log((bool === 'true'? "Dark": "Light"))

            })
            .catch(e=>console.log(e.message))
    },[barStyle])

    return (<HStack alignItems="center" space={4}
            style={{
                backgroundColor: colorMode === 'dark' ? '#121212' : 'white'
            }}
    >
        <Text style={{
            backgroundColor: colorMode === 'dark' ? '#121212' : 'white'
        }}>{name}</Text>
        <StatusBar barStyle={barStyle}/>
        <Switch onValueChange={toggleSwitch}
                value={isEnabled}
                size="sm"
        />
    </HStack>);
};

export default CustomSwitch
