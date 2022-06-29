import AsyncStorage from '@react-native-async-storage/async-storage';

const saveSettings = async (value) => {

    try {
        await AsyncStorage.setItem('@settings', JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}

const toggleDarkModes = async () => {
    try {
        const item = await AsyncStorage.getItem('@darkModes')
        const reversed = !(item === 'true');
        await AsyncStorage.setItem('@darkModes', reversed.toString() )
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
const set = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value),(error) => {
            if (error) throw error
            return true
        })
    } catch (e) {
        // saving error
    }
}
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

export {saveSettings, getDarkModeSettings, toggleDarkModes, get, set}
