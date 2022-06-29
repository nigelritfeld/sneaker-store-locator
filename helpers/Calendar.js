import * as Calendar from "expo-calendar";
import {Platform} from "react-native";
import * as LocalStorage from "./LocalStorage";

async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
}

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

async function createEvent(title= 'test', startDate = new Date('2022-06-23'), endDate= new Date('2022-06-23') ) {
    try {
        const defaultCalendar = JSON.parse(await LocalStorage.get('@calendarID'));
        console.log(`Creating event for ${defaultCalendar}`)

        return await Calendar.createEventAsync(defaultCalendar, {
            title: title,
            allDay: true,
            startDate: startDate,
            endDate: endDate,
        });

    } catch (e) {
        console.log(e.message);
    }
}

async function getPermissions () {
    try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            let calendarID = await LocalStorage.get('@calendarID')
            if (!(typeof calendarID === "string")){
                const calendarID = await createCalendar()

                const createdCalendar = await LocalStorage.set('@calendarID', calendarID)
                alert(`Created new calendar named: ${createdCalendar?.name}`)
            }
            calendarID = JSON.parse(await LocalStorage.get('@calendarID'))
        }
       return status === 'granted'
    }catch (e) {
        console.log(e)
    }

}

export {getDefaultCalendarSource, createEvent,createCalendar}
