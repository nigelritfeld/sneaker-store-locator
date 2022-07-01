import * as LocalAuthentication from "expo-local-authentication";

/**
 * Authenticates user using biometric auh hardware
 * @param message
 * @returns {Promise<{success: true}|{success: false, error: string, warning?: string}>}
 */
const onFaceId = async message => {
    try {
        const hasRequiredHardware = await LocalAuthentication.hasHardwareAsync()
        // Checking if device has biometrics records
        if (!hasRequiredHardware) {
            alert('Your device isn\'t compatible.')
        }
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            alert('No Faces / Fingers found.')
        }
        return await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate now",
            cancelLabel: "Cancel",
            disableDeviceFallback: false,
            requireConfirmation: true,
            fallbackLabel: "Fallback label"
        })
    }catch (error) {
        alert('An error as occured', error?.message);

    }

}

export {onFaceId}
