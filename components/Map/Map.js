import {Box, useColorMode, useToast} from "native-base";
import {darkMap, lightMap} from "../../helpers/MapStyles";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import Markers from "./Markers";
import {Dimensions, StyleSheet} from "react-native";
import {vh, vw} from "react-native-expo-viewport-units";

const Map = ({initalRegion,focusedStore, setFocusedStore, region, stores, mapType, showTraffic }) => {
    const {colorMode} = useColorMode()
    const toast = useToast()

    return(
        <MapView
                style={styles.map}
                showsMyLocationButton={true}
                showsUserLocation={true}
                showsCompass={true}
                showsTraffic={showTraffic}
                showsBuildings={true}
                paddingAdjustmentBehavior={"automatic"}
                mapType={mapType}
                onRegionChangeComplete={() => {
                    if (focusedStore) {
                        toast.show({
                            placement: "top",
                            render: () => {
                                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                    {`Showing ${focusedStore}`}
                                </Box>;
                            }
                        })
                    }
                    setFocusedStore(null)
                }}
                initialRegion={initalRegion}
                customMapStyle={colorMode === 'dark' ? darkMap : lightMap}
                region={region}
                provider={PROVIDER_GOOGLE}>
                <Markers stores={stores}/>
            </MapView>
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
        position: 'absolute',
        bottom: 0
    },
    overlayColumn: {
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        height: '100%',
    },
    map: {
        marginTop:- vh(10),
        // zIndex:2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - vh(6),
    },
});
export default Map
