import {Center, Skeleton, VStack} from "native-base";
import {StyleSheet} from "react-native";
import {vw} from "react-native-expo-viewport-units";

const CardSkeleton = () => {
    return <Center w="100%" style={styles.container}>
        <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: "coolGray.500"
        }} _light={{
            borderColor: "coolGray.200"
        }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
        </VStack>
    </Center>;
};

const styles = StyleSheet.create({
    container:
        {
            width: vw(100),
            marginTop:20,
        },
})

export default CardSkeleton
