import{View, Text, StyleSheet, SafeAreaView} from "react-native";
import CharacterImageDetail from "../components/CharacterImageDetails";

const CharacterPicker = ({Navigation}) => {
    let picker = 
    <View style={StyleSheet.backGroundContainer}>
        <View style={styles.backGroundContainer}>
            <Text style={styles.text}> Pick Your Warrior</Text>
        </View>

        <SafeAreaView>
            <View>
                <CharacterImageDetail // wizard character
                    title= 'Wizard'
                    imageSource={require("../../pictures/Heroes/wizard.png")}
                    onPress={() =>
                        Navigation.navigate("Character Creator", {
                            hero: { name: "Wizard", image: "wizard"},
                        })
                    }
                />
                
                <CharacterImageDetail // Knight character
                    title= 'Knight'
                    imageSource={require("../../pictures/Heroes/knight.png")}
                    onPress={() =>
                        Navigation.navigate("Character Creator", {
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
    backGroundContainer:{
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 5,
    },
    text:{
        fontSize: 30,
    },

});// end styleSheet

export default CharacterPicker;
