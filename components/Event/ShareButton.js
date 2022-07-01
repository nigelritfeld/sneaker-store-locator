import {View, Text, StyleSheet, Share} from "react-native";
import {useEffect} from "react";
import {Button, Flex} from "native-base";

const ShareButton = (props) => {

    const share = async () => {
        try {
            const result = await Share.share({
                title: props.content.title,
                url: props.content.link,
                // message: event.description,
            });
            if (result.action === Share.sharedAction) {
                if (result?.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        console.log(props.loadedData)
    }, [props.loadedData])
    return (
            <Button style={styles.button} title={"share"} onPress={share}><Text>Share</Text> </Button>
    )
}
const styles = StyleSheet.create({
    button: {width: '50%'},
})
export default ShareButton
