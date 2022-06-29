import {checkRecords} from "../helpers/Database";
import {Pressable, StyleSheet, Text} from "react-native";
import {vh, vw} from "react-native-expo-viewport-units";

const RefreshStoresButton = () => {

    const cb = () => checkRecords().then(r => console.log(r.rows._array))
    return (
        <Pressable style={styles.button} onPress={() => cb }>
            <Text style={styles.buttonText}>
                Check records
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        height: '10%',
        width: '66%',
        marginVertical: vh(1),
        borderRadius:10,
        backgroundColor:'#00B9FFFF',
        fontSize: 40,
    },
    buttonText: {
        fontWeight:'bold',
        color:'#fff',
        fontSize: 40,
    },
});
export default RefreshStoresButton
