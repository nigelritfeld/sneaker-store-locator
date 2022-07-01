import {Callout, CalloutSubview, Marker} from "react-native-maps";
import {Badge, Heading, Pressable, Text} from "native-base";
import {Dimensions, StyleSheet, View} from "react-native";
import {vh, vw} from "react-native-expo-viewport-units";

const Markers = ({stores}) => {
    const storeMarkers = stores.map((store, index) => {
        const {location: {lat, lng}} = JSON.parse(store.geometry)
        return (
            <Marker
                key={index}
                title={store.name}
                identifier={store.place_id}
                coordinate={{
                    latitude: lat,
                    longitude: lng,
                }}
                description={`Address: ${store.address}`}
            >
                <Callout style={styles.overlayContainer}>
                    <CalloutSubview style={styles.overlayColumn}>
                        {store.favorite ?
                            <Badge colorScheme="success">Favorite</Badge>: null

                        }
                        <Heading>{store.name}</Heading>
                        <View>

                            <Pressable>
                                <Text>Address: {store.address}</Text>
                            </Pressable>
                        </View>
                    </CalloutSubview>
                </Callout>

            </Marker>
        )

    })

    return (
        <>
        {storeMarkers}
        </>
    )
}

const styles = StyleSheet.create({

    overlayContainer: {
        zIndex: 99,
        width: vw(90),
        // backgroundColor: 'red',
        height: vh(25),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal: vw(5),
        position:'absolute',
        bottom: 0
    },
    overlayColumn: {
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        height: '100%',
    },
});

export default Markers
