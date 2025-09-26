import{View, Text, StyleSheet, SafeAreaView} from "react-native";
import CharacterImageDetail from "../components/CharacterImageDetails";

const CharacterPicker = ({navigation}) => {
    let picker = 
    <View style={styles.container}>
            <Text style={styles.title}> Pick Your Warrior</Text>


        <SafeAreaView>
            <View>
                <CharacterImageDetail // wizard character
                    title= 'Wizard'
                    imageSource={require("../../pictures/Heroes/wizard.png")}
                    onPress={() =>
                        navigation.navigate("Character Creator", {
                            hero: { name: "Wizard", image: "wizard"},
                        })
                    }
                />
                
                <CharacterImageDetail // Knight character
                    title= 'Knight'
                    imageSource={require("../../pictures/Heroes/knight.png")}
                    onPress={() =>
                        navigation.navigate("Character Creator", {
                            hero: { name: "Knight", image: "knight"},
                        })
                    }
                />
                
            </View>
        </SafeAreaView>
    </View>


    return(
        picker
    );
}// end characterPicker()


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 24,
    },
    title: {
        fontSize: 40,
        marginBottom: 16,
        color: "#010101ff"
    }

});// end styleSheet

export default CharacterPicker;
