import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useState} from "react";
import {addStore, removeStore, updateFavoriteStore} from "../helpers/Database"
import {Box, Text, useToast} from "native-base";
const FavoriteButton = ({initalState, placeId, name}) => {
    const [isChecked, setIsChecked] = useState(initalState)
    const [id, setID] = useState(placeId)
    const [storeName, setStoreName] = useState(name ?? "")
    // console.log(initalState)
    const toast = useToast();

    return (
        <BouncyCheckbox
            size={50}
            fillColor="#323232"
            unfillColor="#FFFFFF"
            text={isChecked ? 'Remove from favorites' : 'Add to favorites'}
            iconStyle={{borderColor: "#242424"}}
            // textStyle={{fontFamily: "JosefinSans-Regular"}}
            isChecked={isChecked}
            onPress={() => {
                updateFavoriteStore(id, (!isChecked))
                    .then(r => {
                        console.log(r)
                    }).catch(e=>{
                    console.log(e)
                })
                setIsChecked(!isChecked)
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                            <Text>{!isChecked ? `Added ${storeName} to favorites` : `Removed ${storeName} from favorites`}</Text>
                        </Box>;
                    },
                })
            }}
        />
    )
}

export default FavoriteButton
