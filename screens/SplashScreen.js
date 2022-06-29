import {View, Text, StyleSheet} from "react-native";
import {Spinner} from "native-base";
import {vh, vw} from "react-native-expo-viewport-units";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Spinner size={'lg'}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: vw(100),
        height: vh(100)
    },
})
export default SplashScreen
