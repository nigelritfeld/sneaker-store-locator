import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {vh, vw} from "react-native-expo-viewport-units";
import {addStore, createStoresTable, getRecords, getStore} from '../helpers/Database'
import FavoriteButton from '../components/FavoriteButton'
import CardSkeleton from '../components/CardSkeleton'
import {KEY} from "@env"
import {Pressable} from "react-native";
import {RefreshControl} from "react-native";
import {Box, Container, Text} from "native-base";
import { useColorMode } from "native-base";


const Stores = ({
                    props, navigation: {navigate}
                }) => {
    const [input, setInput] = useState({value: null})

    const {colorMode} = useColorMode();
    const list = ['vanHaren schoenen', 'Van Lier Store Rotterdam', 'ECCO Rotterdam', 'Leyp', 'BOTH Dames', 'Fairshoe', 'Van den Assem Schoenen', 'COLLAB', 'Shoe Outlet']
    const [dataLoaded, setDataLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [stores, setStores] = useState([])
    const [favoriteStores, setFavoriteStores] = useState([])
    const [localRecords, setLocalRecords] = useState([])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = () => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }

    /**
     * Stores blacklist
     * @param name
     * @returns {boolean}
     */
    const blacklist = (name) => {
        let result = true
        list.map((item) => {
            if (item === name) {
                result = false
            }
        })
        return result
    }

    /**
     * Stores
     * @type {Promise<*>[]}
     */

    const cards = localRecords.map((store, index) => {
        //const photo = store.photos?.[0] ?? undefined
        //const reference = photo?.photo_reference ?? undefined
        if (!blacklist(store.name)) return null
        return <Box variant="storeCard" radius={30} key={index}>
            <Box variant="storeCardInner">
                <Text >{store.rating}</Text>
                <Text >{store.name}</Text>
                {/*<Text style={styles.card_title}>{store.favorite.toString()}</Text>*/}
                <Box variant="storeCardActionsContainer">
                    <Pressable onPress={() => {
                        navigate('Map', {id: store.place_id});
                    }
                    }>
                        <Text>
                            SHOW ON MAP
                        </Text>
                    </Pressable>
                    <FavoriteButton initalState={store.favorite} placeId={store.place_id} name={store.name}/>
                </Box>

            </Box>

        </Box>

    })
    const Skeletons = () => {
        return list.map((o, i) => {
            return <CardSkeleton key={i}/>
        })
    }

    function isSaved(id) {
        let bool = false
        localRecords.map((store, index) => {
            if (store.place_id === id) {
                bool = true
            }
        })
        return bool
    }

    function favorite(id) {
        let bool = false
        let count = 0
        localRecords.map((store) => {
            count++
            if (store.favorite === 1) {
                bool = true
            }
        })
        return bool
    }

    function getLocalRecord(id) {
        let localRecord = null;

        localRecords.map((store, index) => {
            if (store.place_id === id) localRecord = store
        })
        return localRecord
    }


    /**
     * Creating card for received store data
     * @type {*|null}
     */
        // const storeCards =

    const countFavorites = () => {
            let count = 0
            localRecords.map((store, index) => {
                if (store.favorite) {
                    console.log(store.favorite)
                    count++
                }
            })
            return count
        }

    async function init() {
        try {

            //todo: Get data from google places api
            let records = await getRecords('stores')
            if (records?.length >= 0) {
                const googleResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.91821936538702%2C4.473738162279982&radius=1500&type=shoe_store,clothing_store&keyword=sneakers+nike&key=${KEY}`)
                const googleData = await googleResponse.json()
                //todo: Check if place id is saved in favorites
                const data = googleData.results.map(({
                                                         place_id,
                                                         name,
                                                         geometry,
                                                         business_status,
                                                         vicinity
                                                     }, index) => {
                    // id, place_id , name , favorite , geometry , business_status, address )
                    if (isSaved(place_id)) {
                        console.log(`${name} is saved in local database`)
                        const isFavorite = favorite(place_id)
                        return {
                            place_id,
                            name,
                            favorite: isFavorite,
                            geometry,
                            business_status,
                            vicinity
                        }
                    } else {
                        addStore(place_id, name, 0, geometry, business_status, vicinity)
                            .then((r) => console.log(r))
                            .catch(e => console.log(e))
                    }

                    return getStore(place_id)


                    // return  isSaved(place_id) ?  : addStore(place_id, name, isFavorite, JSON.stringify(geometry), business_status, vicinity)

                })
                setStores(data)

                records = await getRecords('stores')
            }
            setLocalRecords(records)
            // props.setFavoriteStoresCount(countFavorites())

            setDataLoaded(true)
            // //todo: setStores => rerender

        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        init()
    }, [])

    return (
        <SafeAreaView style={{backgroundColor: colorMode === 'dark' ? '#121212' : '#fff'}}>
            <Container variant="mainContainer">
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                    >

                        {
                            !dataLoaded ? <Skeletons/> : cards
                        }

                    </ScrollView>
                    <StatusBar style="auto"/>
                </View>
            </Container>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: vh(80),
        width: vw(100),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    cardActionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    input: {
        backgroundColor: 'red',
        fontSize: 40,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '10%',
        width: '66%',
        marginVertical: vh(1),
        borderRadius: 10,
        backgroundColor: '#00B9FFFF',
        fontSize: 40,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    test: {
        backgroundColor: 'red',
        height: vh(10)
    },
    scrollView: {
        display: 'flex',
        // backgroundColor:'blue',
        // alignItems:'center',
        // height: vh(10),
        // width: vw(100),
    },
    stretch: {
        position: 'absolute',
        borderRadius: 10,
        zIndex: 10,
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        width: 500,
        zIndex: 100,
    },
    card_title: {
        fontSize: 30,
    },
    contentAddress: {
        fontSize: 20,
    },
    favorite: {
        fontSize: 30,
    }

});

export default Stores

