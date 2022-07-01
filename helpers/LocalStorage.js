import AsyncStorage from '@react-native-async-storage/async-storage';
import {addStore, getRecords, getStore} from "./Database";
import {KEY} from "@env"

/**
 * Saves settings
 * @param value
 * @returns {Promise<void>}
 */
const saveSettings = async (value) => {

    try {
        await AsyncStorage.setItem('@settings', JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}

/**
 * Syncronizes stores with Google Places API
 * https://developers.google.com/maps/documentation/places/web-service/overview
 * @returns {Promise<*>}
 */
const getStores = async () => {
    //todo: Get data from google places api
    try {
        let records = await getRecords('stores')
        if (!(records?.length >= 0)) return
        const googleResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.91821936538702%2C4.473738162279982&radius=1500&type=shoe_store,clothing_store&keyword=sneakers+nike&key=${KEY}`)
        const googleData = await googleResponse.json()
        function isSaved(id) {
            let bool = false
            records.map((store, index) => {
                if (store.place_id === id) {
                    bool = true
                }
            })
            return bool
        }
        function favorite(id) {
            let bool = false
            let count = 0
            records.map((store) => {
                count++
                if (store.favorite === 1) {
                    bool = true
                }
            })
            return bool
        }
        //todo: Check if place id is saved in favorites
        const data = googleData.results.map(({place_id, name, geometry, business_status, vicinity}) => {
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
        })

        return  await getRecords('stores')
        // setStores(data)

        // setLocalRecords(records)
    } catch (e) {
        console.log(e)
    }

}

/**
 * Toggle dark modes setting in async storage
 * @returns {Promise<boolean|*>}
 */
const toggleDarkModes = async () => {
    try {
        const item = await AsyncStorage.getItem('@darkModes')
        console.log('item')
        console.log(item)
        const reversed = !(item === 'true');
        await AsyncStorage.setItem('@darkModes', reversed.toString())
        return reversed
    } catch (e) {
        return e
    }
}
const save = async (value) => {

    try {
        await AsyncStorage.setItem('@settings', JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}
/**
 * Gets key value from async storage
 * @param key
 * @returns {Promise<string>}
 */
const get = async (key) => {
    try {
        return await AsyncStorage.getItem(key, (error, result) => {
            if (error) throw error
            return result
        })
    } catch (e) {
        // saving error
    }
}
/**
 * Sets key in async storage
 * @param key
 * @param value
 * @returns {Promise<void>}
 */
const set = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
            if (error) throw error
            return true
        })
    } catch (e) {
        // saving error
    }
}
/**
 * Gets dark mode settings from async storage
 * @param value
 * @returns {Promise<string>}
 */
const getDarkModeSettings = async (value) => {
    try {
        return await AsyncStorage.getItem('@darkModes', (error, result) => {
            if (error) throw error
            const bool = JSON.parse(result)
            return bool ? bool : null
        })
    } catch (e) {
        // saving error
    }
}

export {saveSettings, getDarkModeSettings, toggleDarkModes, get, set, getStores}
