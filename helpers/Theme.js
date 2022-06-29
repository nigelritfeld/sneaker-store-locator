import {Appearance} from "react-native";
import {getDarkModeSettings} from "./LocalStorage";
import {extendTheme, themeTools} from "native-base";
import {vh, vw} from "react-native-expo-viewport-units";

const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: '#e5e5e5',
            100: '#d7d7d7',
            200: '#c3c3c3',
            300: '#a2a2a2',
            400: '#828282',
            500: '#5a5a5a',
            600: '#454545',
            700: '#2f2f2f',
            800: '#242424',
            900: '#141414',
        },
        // Redefinig only one shade, rest of the color will remain same.
        amber: {
            400: '#d97706',
        },
    },
    config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: 'dark',
    },
    components: {
        Heading: {
            baseStyle: (props) => {
                return {
                    backgroundColor: themeTools.mode("#fff", "primary.900")(props),
                    color: themeTools.mode("primary.400", "primary.900")(props),
                };
            },
        },
        NativeBaseProvider:{
            baseStyle: (props) => {
                return {
                    backgroundColor: themeTools.mode("#fff", "primary.900")(props),
                    color: themeTools.mode("primary.400", "primary.900")(props),
                };
            },
        },
        Box: {
            baseStyle: (props) => {
                return {
                    backgroundColor: themeTools.mode("#000", "primary.800")(props),
                    color: themeTools.mode("primary.400", "primary.900")(props),
                };
            },
            variants: {
                storeCard: ({radius}) => {
                    return {
                        marginBottom: 50,
                        height: vh(20),
                        // height: vh(20),
                        // backgroundColor: themeTools.mode("#fff", "red")(props),
                        width: vw(85),
                        // position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: `${radius}`,
                    };
                },
                storeCardInner: () => {
                    return {
                        // display: 'flex',
                        // justifyContent: 'center',
                        backgroundColor: 'red',
                        // backgroundColor: themeTools.mode("#fff", "primary.400")(props),

                        // padding: vw(3),
                    }
                },
                storeCardActionsContainer: () => {
                    return {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                    }
                },
            }
        },
        Container:{
            baseStyle: (props) => {
                return {
                    color: themeTools.mode("primary.400", "primary.900")(props),
                };
            },
            variants: {
                mainContainer : () => {
                    return {
                        width: vw(100),
                        backgroundColor: 'red',
                    }
                }
            }
        },
        Text:{
            baseStyle: (props) => {
                return {
                    color: themeTools.mode("primary.400", "#fff")(props),
                };
            },
        },
    },
});

const mode = async () => {
    const mode = await getDarkModeSettings()
    console.log('Looking in localstorage for prefrences..')
    console.log(`Found ${mode} `)
    return mode ?? Appearance.getColorScheme()
}

export {mode,theme}
