import {View, StyleSheet} from "react-native";
import {HStack, Switch, Text , useColorMode} from "native-base";
import {useEffect, useRef, useState} from "react";
import * as LocalStorage from '../helpers/LocalStorage'
const CustomSwitch = ({name = ''}) => {
    const [isEnabled, setEnabled] = useState(false)
    const {
        colorMode,
        toggleColorMode,
        setColorMode
    } = useColorMode();

    const toggleSwitch = () => {
        LocalStorage.toggleDarkModes()
            .then((bool) =>{
                setEnabled(bool)
                toggleColorMode()
        }).catch(e=>console.log(e.message))
    }

    useEffect(()=>{
        LocalStorage.getDarkModeSettings()
            .then(bool =>{
                setEnabled((bool === 'true'))
                console.log((bool === 'true'? "Dark": "Light"))

            })
            .catch(e=>console.log(e.message))
    },[])
    return (<HStack alignItems="center" space={4}>
        <Text>{name}</Text>
        <Switch onValueChange={toggleSwitch}
                value={isEnabled} size="sm" />
    </HStack>);
};
// const styles = StyleSheet.create({
//     container: {},
// })
export default CustomSwitch
