import {StyleSheet, View, Button, FlatList} from 'react-native';
import {useState} from 'react';
    
/**
* Functional component that displays a list of randomly colored squares.
* It uses a FlatList for efficient rendering of the list,
*/
function ColorScreenFlatList(){
    /**
    * State hook to manage the array of colors.
    * 'colors' read-only, holds the array of RGB color strings (e.g., 'rgb(255,0,128)').
    * 'setColor' is the function used to update the 'color' state.
    */
    const[colors,setColors] = useState([]);
    //Logs the current array of colors to the console for debugginf purposes.
    console.log(colors);
    
    //JSX structure for the component's UI, assigned to a variable body.
    let body =
        
        <View style={styles.mainContainer}>
            <View style={styles.buttomContainer}>
                {/* Button component to add a new color to the list */}
                <Button title= "Add Color"
                        // 1. Creates a new array by spreading the existing 'color'.
                        // 2. Appends a new, randomly generated RGB color string using produce_RGB_String().
                        // 3. Calls setColors to update the state, which triggers a re-render.
                        onPress={ () => {setColor([...colors, produce_RGB_String() ]);
                        }}
                />
            </View>
            {/* Container for the list of colors */}
            <View style={styles.listContainer}>
                {/* FlatList component for rendering the scrollable list efficiently*/}
                <FlatList
                    //'data' is the source array for the list (the array of color string).
                    data={colors}
                    /**
                    * 'renderItem' is a function that takes an item from the 'data' array and returns a component to render
                    * 'item' destructured from the argument represents a single color string.
                    */
                    renderItem={({item}) => {
                        // returns a View component to act as the colored square.
                        return <View
                            //Applies base styling from 'colorFulSquare' and dynamically sets the 'backgroundColor' of the
                            // square using the current 'item' (the color string)
                            style = { [styles.colorFulSquare, {backgroundColor: item } ] }/>
                    } }
                    // 'keyExtractor' is crucial for FlatList performance. it returns a unique key for each item
                    // here, the color string itself is used as the key
                    keyExtractor = { (color) => {return color;}} 
                />
            </View>
        </View>    
    
    // the component returns the constructed UI element ('body').
    return (
        body
    );
    
    
}//end colorScreenFlatList()
    

//----------------------------------------------------------------------------
//        HELPER FUNCTION
//----------------------------------------------------------------------------

/**
* Helper function to generate a random integer between 0 (inclusive) and maxValue (exclusive).
* @param {number} maxValue - the upper limit (exlusive) for the random number.
* @returns {number} a ranbdom integer.
*/
function getRandomInt(maxValue){
    /**
    * Math.random() generates a float between 0 and 1.
    * Multiplying by maxValue scales it.
    * Math.floor() truncates the decimal part, resulting in an integer.
    */
    return Math.floor(Math.random() * maxValue);
}
/**
* Generates a random RGB color string.
* @returns {string} an RGB color string in the format 'rgb(R,G,B)'.
*/
function produce_RGB_String(){
        //get random values for Red, Green, and Blue, from 0 to 254 (255 exclusive).
    let redValue = getRandomInt(255);
    let greenValue = getRandomInt(255);
    let blueValue = getRandomInt(255);
    
    // USe a template literal to construct the CSS-style RGB string
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`
}

//----------------------------------------------------------------------------
//          STYLESHEET STYLES
//----------------------------------------------------------------------------

const styles=StyleSheet.create({
    
    mainContainer: {
        flex: 1, //takes up the entire available space on the screen
        backgroundColor: "#1dbda5ff", //default background color
        alignItems: 'center', //centers children horizontally along the cross-axis
        justifyContent: 'center', // centers children vertically along the main-axis, which is colunm by default.
    },
    buttonContainer:{
        flex: 1, //takes up 1 part of the available vertical space in the parent container (1/5)
        marginButtom: 12, //adds 12 units of space below the container
        borderColor: "black",
        borderWidth: 0, 
        // ensures the button inside is centured within this space
        alignItems: 'center',
        justifycontent: 'center',
    },
    listContainer: {
        flex: 4, //takes up 4 parts of the available vertical space (4/5 of total flex)
        marginBottom: 12, // adds 12 units space below the container
        borderColor: 'black',
        borderWidth: 0,
        // centers the FlatList content/item
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorFulSquare: {
        heigh: 50, //fixed height of 50 pixels
        width: 50, //fixed width of 50 pixels (making it a square)
        backgroundColor: "rgb(255,0,255)", //default background color
        marginVertical: 20, // adds 20 pixels of external space above and below the square
    },

    
});

export default ColorScreenFlatList;
