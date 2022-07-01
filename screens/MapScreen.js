import {StyleSheet,SafeAreaView} from "react-native";
import * as Database from '../helpers/Database'
import {useEffect, useRef, useState} from "react";
import WarningAlert from "../components/WarningAlert";
import {Button, Container, Flex, Text, useColorMode, useToast} from "native-base";
import {vh, vw} from "react-native-expo-viewport-units";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSatellite } from '@fortawesome/free-solid-svg-icons/faSatellite'
import { faRoad } from '@fortawesome/free-solid-svg-icons/faRoad'
import { faTrafficLight } from '@fortawesome/free-solid-svg-icons/faTrafficLight'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import Map from "../components/Map/Map";

const MapScreen = ({route, navigation}) => {
    const {colorMode} = useColorMode()
    const [region, setRegion] = useState({
        latitude: 51.91819107280592,
        longitude: 4.473466068581789,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    })
    const [mapType, setMapType] = useState('standard')
    const [showTraffic, setShowTraffic] = useState(false)
    const [stores, setStores] = useState([])
    const [errorMsg, setErrorMsg] = useState(null);
    const [focusedStore, setFocusedStore] = useState(null);
    const toast = useToast();

    const toggleMapType = () => {
        setMapType(mapType === 'standard' ? 'satellite' : 'standard')

    }
    const toggleShowTraffic = () => setShowTraffic(!showTraffic)


    useEffect(() => {
            (async () => {
                /**
                 * If screen has received a store ID
                 * It zooms in on the store marker
                 */
                if (route.params !== undefined) {
                    const {id} = route.params
                    const store = await Database.getStore(id)
                    console.log(`Found store ${store.name}`)

                    const {lat, lng} = JSON.parse(store?.geometry)?.location
                    console.log(region)
                    console.log('Store geo')
                    console.log(JSON.parse(store?.geometry))
                    console.log({lat, lng})
                    setRegion({...region, latitude: lat, longitude: lng, latitudeDelta: 0.00043, longitudeDelta: 0.00043})
                    setFocusedStore(store?.name)
                }


            })();


            Database.getRecords('stores')
                .then((stores) => {
                    setStores(stores)
                })
                .catch(e => console.log(e))

        }, [route]
    )

    return (

        <SafeAreaView style={styles.container}>
            {errorMsg ? <WarningAlert status={errorMsg} title={'No access to location'}/> : <Text>''</Text>}
            <Map
                style={styles.map}
                inital={{
                    latitude: 51.91819107280592,
                    longitude: 4.473466068581789,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                region={region}
                focusedStore={focusedStore}
                setFocusedStore={setFocusedStore}
                stores={stores}
                mapType={mapType}
                showTraffic={showTraffic}
            />
            <Container style={styles.toolContainer}>

                    <Button onPress={toggleMapType}>
                        <Text>{mapType !== 'standard' ?  <FontAwesomeIcon icon={ faRoad } color={colorMode !== 'dark'? '#fff' : '#000a31' } />: <FontAwesomeIcon icon={ faSatellite } color={colorMode !== 'dark'? '#fff' : '#000a31' } />}</Text>
                    </Button>
                    <Button onPress={toggleShowTraffic}>
                        <Text>{showTraffic ? <FontAwesomeIcon icon={faBan} color={colorMode !== 'dark'? '#fff' : '#000a31' } /> : <FontAwesomeIcon icon={faTrafficLight} color={colorMode !== 'dark'? '#fff' : '#000a31' } />}</Text>
                    </Button>

            </Container>
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
        position: 'relative',
        justifyContent: 'center',
    },
    toolContainer: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'column',
        alignItems: 'center',
        zIndex: 99,
        width: vw(20),
        marginBottom: vh(10),
        padding: vw(1),
        borderRadius: vw(1),
        height: vh(14),
        bottom: 0,
        right: 10
    },
    map: {
        // position:'absolute',
        zIndex: 1,
    }
})

export default MapScreen
