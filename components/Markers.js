import {View, Text, StyleSheet} from "react-native";
import {Marker} from "react-native-maps";

const Markers = ({stores}) => {
    const list = stores.map((store, index) => {
        const {location: {lat, lng}} = JSON.parse(store.geometry)

        return (
            <Marker key={index}
                    title={store.name}
                    description={'sdfsdf'}
                    coordinate={{
                        latitude: lat,
                        longitude: lng,
                    }}
            />
        )

    })

    return (
        <View>
            {list}
        </View>
    )
}
const styles = StyleSheet.create({
    marker: {},
})
export default Markers
