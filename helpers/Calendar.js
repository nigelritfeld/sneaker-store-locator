import * as Calendar from "expo-calendar";
import {Platform} from "react-native";
import * as LocalStorage from "./LocalStorage";

/**
 * Getting default calendar
 * @returns {Promise<number|string|SourceObject|Array<SourceObject>>}
 */
async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
}

/**
 * Creates new calendar named Store Locator
 * @returns {Promise<string>}
 */
async function createCalendar() {
    const defaultCalendarSource =
        Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Store Locator' };
    return await Calendar.createCalendarAsync({
        title: 'Sneaker Events',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'StoreLocatorAgenda',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
}

/**
 * Creates new event in Store Locator calendar
 * @param title
 * @param startDate
 * @param endDate
 * @param notes
 * @returns {Promise<string>}
 */
async function createEvent(title= 'test', startDate = new Date('2022-06-23'), endDate= new Date('2022-06-23'), notes='' ) {
    try {
        const defaultCalendar = JSON.parse(await LocalStorage.get('@calendarID'));
        console.log(defaultCalendar)
        console.log(`Creating event for ${defaultCalendar}`)

        return await Calendar.createEventAsync(defaultCalendar, {
            title: title,
            allDay: true,
            startDate: startDate,
            endDate: endDate,
            notes: notes
        });

    } catch (e) {
        console.log(e.message);
    }
}

/**
 * Gets all events in native calendar
 * @returns {Promise<boolean>}
 */
async function getEvents () {
    try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            // todo: Get calendar events for sneaker app
            Calendar.getEventAsync()
        }
       return status === 'granted'
    }catch (e) {
        console.log(e)
    }

}

/**
 * Gets permission for reading and writing to native calendar
 * @returns {Promise<boolean>}
 */
async function getPermissions () {
    try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            let calendarID = await LocalStorage.get('@calendarID')
            if (!(typeof calendarID === "string")){
                const calendarID = await createCalendar()

                const createdCalendar = await LocalStorage.set('@calendarID', calendarID)
                alert(`Created new calendar named: Sneaker Events`)
            }
            calendarID = JSON.parse(await LocalStorage.get('@calendarID'))
        }
       return status === 'granted'
    }catch (e) {
        console.log(e)
    }

}

/**
 * Open event in native calendar (android only)
 * @param id
 * @returns {Promise<void>}
 */
async function openEvent (id) {
    try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            // todo: Open calendar event in calendar app
            Calendar.openEventInCalendar(id)
        }
    }catch (e) {
        console.log(e)
    }

}

export {getDefaultCalendarSource, createEvent,createCalendar, getPermissions, openEvent}
