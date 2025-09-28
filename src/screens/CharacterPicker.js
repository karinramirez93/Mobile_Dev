import{View, Text, StyleSheet, SafeAreaView, ImageBackground} from "react-native";
import CharacterImageDetail from "../components/CharacterImageDetails";

const backGroundImage = require("../../pictures/arena/characterPickerBG.jpg");

const CharacterPicker = ({navigation}) => {
    let picker = 
     <ImageBackground
        source={backGroundImage}
        style={{flex: 1}}
        resizeMode="cover"
    >
        <View style={[styles.container, {backgroundColor: "transparent"}]}>
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
    </ImageBackground>


    return(
       
        picker
        
    );
}// end characterPicker()


const styles = StyleSheet.create({
    container:{ alignItems: 'center',  paddingTop: 24, },

    title: { fontSize: 40, marginBottom: 16, color: "#f5f5f5ff" }

});// end styleSheet

export default CharacterPicker;
