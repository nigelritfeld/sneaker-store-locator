import {Text, View} from "react-native";
import {useEffect} from "react";

const Test = ({navigation:{navigate}, route:{params:{names}}}) => {




    useEffect(()=>{
        console.log(navigate)
        console.log(names)
    },[])
    return (
        <View>
            {
                names.map((name, index) => {
                   return <Text key={index}>{name}</Text>

                })
            }

        </View>



    )

}

export default Test
