import MapView, {Callout, CalloutSubview, Marker,PROVIDER_GOOGLE} from "react-native-maps";
import {View, StyleSheet, Dimensions, Appearance, SafeAreaView} from "react-native";
import * as Database from '../helpers/Database'
import {useEffect, useState} from "react";
import Markers from "../components/Markers";
import * as Location from 'expo-location';
import WarningAlert from "../components/WarningAlert";
import {Pressable, Text, useColorMode} from "native-base";
import {vh, vw} from "react-native-expo-viewport-units";
import {darkMap, lightMap} from '../helpers/MapStyles'
import {mode} from '../helpers/Theme'
const Map = ({ route, navigation }) => {
    const {colorMode} = useColorMode()
    const [region, setRegion] = useState({
        latitude: 51.91819107280592,
        longitude: 4.473466068581789,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    })
    const [location, setLocation] = useState({})
    const [stores, setStores] = useState([])
    const [errorMsg, setErrorMsg] = useState(null);


    const markers = stores.map((store, index) => {
        const {location: {lat, lng}} = JSON.parse(store.geometry)

        return (
            <Marker
                key={index}
                title={store.name}
                coordinate={{
                latitude: lat,
                longitude: lng,
                }}
                description={`Address: ${store.address}`}
            >
                <Callout style={styles.overlayContainer}>
                    <CalloutSubview style={styles.overlayColumn} >
                        <Text>{}</Text>
                        <View >

                            <Pressable>
                                <Text>Rating: {store.rating}</Text>
                                <Text>Address: {store.address}</Text>
                            </Pressable>
                        </View>
                    </CalloutSubview>
                </Callout>

            </Marker>
        )

    })
    useEffect(() => {
        (async () => {

            // const {id} = route.params
            // const store = await Database.getStore(id)
            // console.log('found store')
            // console.log(store)
            // const geometry = JSON.parse(store?.geometry)
            // const {lat, lng} = geometry.location
            // setRegion({...region, latitude: lat, longitude: lng })
            // console.log(geometry.location)
            // console.log(`got place id :${id}`)

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();


            Database.getRecords('stores')
                .then((stores) => {
                    setStores(stores)
                })
                .catch(e => console.log(e))

        }, []
    )

    return (

        <SafeAreaView style={styles.container}>
            {errorMsg ? <WarningAlert status={errorMsg} title={'No access to location'}/> : <Text>''</Text>}
            <MapView style={styles.map}
                     showsMyLocationButton={true}
                     showsUserLocation={true}
                     showsCompass={true}
                     showsTraffic={true}
                     showsBuildings={true}
                     initialRegion={{
                         latitude: 51.91819107280592,
                         longitude: 4.473466068581789,
                         latitudeDelta: 0.05,
                         longitudeDelta: 0.05,
                     }}
                     customMapStyle={colorMode === 'dark' ? darkMap : lightMap}
                     region={region}
                     provider={PROVIDER_GOOGLE}
                     // userInterfaceStyle={Appearance.getColorScheme()}
            >
                {/*const {latitude, longitude} = location.coords*/}

                {/*<Marker title={"MY Location"} coordinate={{location.coords.latitude, location.coords.longitude } }></Marker>*/}
                {markers}
            </MapView>
        </SafeAreaView>
    );
}

// todo: Convert address to coordinates
// https://maps.googleapis.com/maps/api/geocode/json?address=Coolhaven%20464,%203024%20AR&key=

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayContainer: {
        zIndex: 99,
        width: vw(90),
        backgroundColor: 'red',
        height: vh(25),
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: vw(5),
        // position:'absolute',
        bottom: 0
    },
    overlayColumn: {
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        height: '100%' ,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Map
