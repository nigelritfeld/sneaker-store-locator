import * as Notifications from "expo-notifications";

/**
 * Sends push notification
 * @param title
 * @param body
 * @param data
 * @returns {Promise<void>}
 */
async function send(title, body, data) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: { data: data },
        },
        trigger: { seconds: 2 },
    });
}

export {send}
