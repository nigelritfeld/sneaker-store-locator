import {StyleSheet,View, Text} from "react-native";
import Spinner from "../components/Spinner";
import {useEffect, useState} from "react";
import DrawerNavigation from "../components/DrawerNavigation";
const Settings = () => {

    const [loading, setLoading] = useState(true)

    useEffect(()=>{

    })

    return (
        <View>
            <Text>Layout komt eraan.</Text>
            <DrawerNavigation/>
            {/*{loading ? <Spinner/>: ''}*/}
        </View>
    )
}
const styles = StyleSheet.create({
    button:{},
})
export default Settings
