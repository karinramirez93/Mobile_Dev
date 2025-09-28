import { useState, useReducer, useMemo} from "react"; // track pages state
import {StyleSheet, Text, View, Pressable, TextInput, Image, ImageBackground } from "react-native";
import { GlobalStyles } from "../components/GlobalStyles";
import { HERO_IMAGES, HERO_BASE_STATS,getHeroImage } from "../components/Heroes";


const backGroundImage = require("../../pictures/arena/characterCreatorBG.jpg");


function resolveHeroImage(hero) {
  if (!hero) return null; // nothing passed
  if (hero.imageSource) return hero.imageSource; // already a require("...pathImage")
  if (hero.imageUrl) return { uri: hero.imageUrl }; // remote URL in case to use one instead a local image
  if (hero.image && HERO_IMAGES[hero.image]) return HERO_IMAGES[hero.image]; //key lookup
  return null; // none found
}

//making some constant minumum values and total points to spend
const MIN_CHARACTER_VALUES= {strength: 0, health: 0, magic: 0};
const STARTING_POINTS = 5;

//allocation stats state
const initialAllocation= {
    strength: MIN_CHARACTER_VALUES.strength,
    health: MIN_CHARACTER_VALUES.health,
    magic: MIN_CHARACTER_VALUES.magic,
    skill_Points_Remaining: STARTING_POINTS,
};

function allocationReducer(state, action){
    switch (action.type){
        // increment the stats values in case user still have skill points to add
        case "inc": {
            if(state.skill_Points_Remaining <= 0) return state;
            const s= action.stat; //"strength" | "health" | "magic"
            return {...state, [s]: state[s] +1, skill_Points_Remaining: state.skill_Points_Remaining -1}
        }
        // decrement stats values in case a point is taken away
        case "dec": {
            const s = action.stat;
            if(state[s] <= MIN_CHARACTER_VALUES[s]) return state;
            return {...state, [s]: state[s] - 1, skill_Points_Remaining: state.skill_Points_Remaining +1}
        }
        case "reset":   // reset allocated points to spend to initial values
            return initialAllocation;
        default:
            return state;
    }   
}

const CharacterCreator = ({route, navigation}) => {
    //hero from picker (name + image)
    const hero = route?.params?.hero ?? { name: "unknowm", imageSource: null};
    const heroImage = getHeroImage(hero);

    //pick base stats by hero key; fallback to default
    const base = useMemo(() => {
        const key = hero?.image ?? "default";
        return HERO_BASE_STATS[key] || HERO_BASE_STATS.default;
    },
    [hero]);

    //Allocation state managed by reducer
    const [alloc, dispatch] = useReducer(allocationReducer, initialAllocation);

    //change the base stats + the allocated points assigned
    const total = {
        strength: base.strength + alloc.strength,
        health: base.health + alloc.health,
        magic: base.magic + alloc.magic,
    };

    //player/hero name input
    const [playerName, setPlayerName] = useState("");

    //navigate to combat and pass the final stats + hero info + name
    const beginBattle = () => {
        navigation.navigate("Combat", {
            player: {
                name: playerName || hero.name,  //fallback to hero name if blank
                strength: total.strength,
                health: total.health,
                magic: total.magic,
            },
            hero, //pass the same hero object
        });
    };

    return(
        <ImageBackground
        source={backGroundImage}
        style={{flex: 1}}
        resizeMode="cover"
        >
        <View style = {[GlobalStyles.container, styles.pad, {backgroundColor:"transparent"}]}>
            <Text style = {[GlobalStyles.text, styles.header]}>Customize Your Hero</Text>

            {/* Hero Preview */}
            {heroImage && 
                <Image
                source={heroImage}
                style={styles.heroImage}
                />
                
            }

            {/* take the hero name to display it on the screen */}
            <Text style = {styles.heroName}>Hero: {hero.name}</Text>

            {/* player name input */}
            <TextInput
                value= {playerName}
                onChangeText= {setPlayerName}
                placeholder= 'Enter your player or hero name'
                placeholderTextColor= "#ffffffff"
                autoCapitalize= "words" //capitalize every initial letter of a word
                autoCorrect = {false} // autocorrect words is dissable
                style = {styles.input}
            />
            {/* a small condition to tell the player to have at least 3 character as a name */}
            {playerName.length > 0 && playerName.length < 3 && (
                <Text style = {styles.warn}>Name should be at least 3 characters.</Text>
            )}

            {/* //shows how many points are available */}
            <Text style = {styles.points}>Points remaining: {alloc.skill_Points_Remaining}</Text>

            {/* three stats rows { strength, health, magic} for the Heroe selected*/}
            <View style = {styles.card}>
                <StatAdjuster
                    label="Strength"
                    base={base.strength}
                    allocated={alloc.strength}
                    total={total.strength}
                    onInc={() => dispatch({ type: "inc", stat: "strength" })}
                    onDec={() => dispatch({ type: "dec", stat: "strength" })}
                    outOfPoints={alloc.skill_Points_Remaining === 0}
                />
                <StatAdjuster
                    label="Health"
                    base={base.health}
                    allocated={alloc.health}
                    total={total.health}
                    onInc={() => dispatch({ type: "inc", stat: "health" })}
                    onDec={() => dispatch({ type: "dec", stat: "health" })}
                    outOfPoints={alloc.skill_Points_Remaining === 0}
                />
                <StatAdjuster
                    label="Magic"
                    base={base.magic}
                    allocated={alloc.magic}
                    total={total.magic}
                    onInc={() => dispatch({ type: "inc", stat: "magic" })}
                    onDec={() => dispatch({ type: "dec", stat: "magic" })}
                    outOfPoints={alloc.skill_Points_Remaining === 0}
                />
            </View>

            {/* Reset + Begin */}
            <View style = {styles.actions}>
                <Pressable
                    onPress= {() => dispatch({type: "reset"})}
                    android_ripple= {{color: "#920c0cff"}}
                    style = {({pressed}) => [styles.secondaryBtn, pressed && GlobalStyles.iosPressable]}
                    >
                    <Text style = {styles.secondaryBtnText}>Reset</Text>
                </Pressable>

                {alloc.skill_Points_Remaining === 0 ? (
                <Pressable
                    onPress = {beginBattle}
                    android_ripple= {{color: "#920c0cff"}}
                    style = {({pressed}) => [styles.primaryBtn, pressed && GlobalStyles.iosPressable]}
                >
                    <Text style = {styles.primaryBtnText}>Begin Battle</Text>
                </Pressable>
                ) : (

                /* warning if there are some points left to spend */
                <Text style = {styles.hint}>Spend all points to continue</Text>

                )}

            </View>

        </View>
        </ImageBackground>
    
    );
};

/**
 * stat rows
 * shows "base + spend stats"
 * the new stats is displayed in the middle of - +
 * -/+ buttons modify allocated stats
 */
const StatAdjuster = ({ label, base, allocated, total, onInc, onDec, outOfPoints}) => (
    <View style={styles.statRow}>
        <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.label}>
                Base {base} + Spent {allocated}
            </Text>
        </View>

        <View style={styles.controls}>
            <Pressable onPress={onDec} disabled={allocated <= 0} style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>-</Text> 
            </Pressable>

            <Text style={styles.value}>{total}</Text>

            <Pressable onPress={onInc} disabled={outOfPoints} style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>+</Text>
            </Pressable>
        </View>
    </View>
);

const styles = StyleSheet.create({
  pad: { paddingHorizontal: 16 },
  header: { color: "#fff", textAlign: "center", fontSize: 20, marginBottom: 8 },
  heroImage: { width: 120, height: 120, resizeMode: "contain", alignSelf: "center" },
  heroName: { color: "#000000ff", textAlign: "center", marginTop: 6, marginBottom: 6, backgroundColor: "white"},
  input: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 12,
  },
  warn: { color: "#f40000ff", textAlign: "center", marginBottom: 8, fontSize: 20},
  points: { color: "#fff", textAlign: "center", marginBottom: 16 },
  card: { gap: 10, width: "100%" },
  actions: { marginTop: 20, alignItems: "center", gap: 10 },
  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  secondaryBtnText: { color: "#fff" },
  primaryBtn: {
    backgroundColor: "#d1bee0ff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  primaryBtnText: { color: "blue", fontSize: 18 },
  hint: { color: "#fff" },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
  },
  label: { color: "#fff" },
  controls: { flexDirection: "row", alignItems: "center", gap: 8 },
  value: { color: "#fff", minWidth: 30, textAlign: "center" },
  smallBtn: {
    backgroundColor: "#d1bee0ff",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  smallBtnText: { color: "blue", fontWeight: "600", fontSize: 20 },
});

export default CharacterCreator