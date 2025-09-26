import { StatusBar } from "expo-status-bar";
import { useState, useReducer, useMemo} from "react"; // track pages state
import {StyleSheet, Text, View, Pressable, TextInput, Image, ImageBackground } from "react-native";
import { GlobalStyles } from "../components/GlobalStyles";

const bgImage = require("../../pictures/arena/arena1.jpg");
const HERO_IMAGES = {
    wizard: require("../../pictures/Heroes/wizard.png"),
    knight: require("../../pictures/Heroes/knight.png")
};
function resolveHeroImage(hero) {
  if (!hero) return null;
  if (hero.imageSource) return hero.imageSource;
  if (hero.imageUrl) return { uri: hero.imageUrl };
  if (hero.image && HERO_IMAGES[hero.image]) return HERO_IMAGES[hero.image];
  return null;
}

// Hero Base Stats
const HERO_BASE_STATS = {
    wizard: { strength: 2, health: 12, magic: 6},
    knight: { strength: 5, health: 16, magic: 2},

    default: {strength: 3, health: 12, magic: 3},
};


//making some constant minumum values and total points to spend
const MIN_CHARACTER_VALUES= {strength: 0, health: 0, magic: 0};
const STARTING_POINTS = 15;

//allocation stats state
const initialAllocation= {
    strength: MIN_CHARACTER_VALUES.strength,
    health: MIN_CHARACTER_VALUES.health,
    magic: MIN_CHARACTER_VALUES.magic,
    pointsRemaining: STARTING_POINTS,
};

function allocationReducer(state, action){
    switch (action.type){
        // increment the stats values in case user try to increment a stat
        case "inc": {
            if(state.pointsRemaining <= 0) return state;
            const s= action.stat;
            return {...state, [s]: state[s] +1, pointsRemaining: state.pointsRemaining -1}
        }
        // decrement stats values in case a point is taken away
        case "dec": {
            const s = action.stat;
            if(state[s] <= MIN_CHARACTER_VALUES[s]) return state;
            return {...state, [s]: state[s] - 1, pointsRemaining: state.pointsRemaining +1}
        }
        case "reset":
            return initialAllocation;
        default:
            return state;
    }   
}

const CharacterCreator = ({route, navigation}) => {
    //hero from pricker (name + image)
    const hero = route?.params?.hero ?? { name: "unknowm", imageSource: null};
    const heroImageSource = resolveHeroImage(hero);

    // new pick base stats by hero key; fallback to default
    const base = useMemo(() => {
        const key = hero?.image ?? "default";
        return HERO_BASE_STATS[key] || HERO_BASE_STATS.default;
    },
    [hero]);

    const [alloc, dispatch] = useReducer(allocationReducer, initialAllocation);

    //changed: total are derived (base + state)
    const total = {
        strength: base.strength + alloc.strength,
        health: base.health + alloc.health,
        magic: base.magic + alloc.magic,
    };

    //simple player/hero name input (class: controlled TextInput)
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
        source={bgImage}
        style={{flex: 1}}
        resizeMode="cover"
        >
        <View style = {[GlobalStyles.container, styles.pad, {backgroundColor:"transparent"}]}>
            <Text style = {[GlobalStyles.text, styles.header]}>Customize Your Hero</Text>

            {/* Hero Preview */}
            {heroImageSource && 
                <Image
                source={heroImageSource}
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
                autoCapitalize= "words"
                autoCorrect = {false}
                style = {styles.input}
            />
            {/* a small condition to tell the player to have at least 3 character as a name */}
            {playerName.length > 0 && playerName.length < 3 && (
                <Text style = {styles.warn}>Name should be at least 3 characters.</Text>
            )}

            {/* //shows how many points are available */}
            <Text style = {styles.points}>Points remaining: {alloc.pointsRemaining}</Text>

            {/* three stats rows { strength, health, magic*/}
            <View style = {styles.card}>
                <StatAdjuster
                    label="Strength"
                    base={base.strength}
                    allocated={alloc.strength}
                    total={total.strength}
                    onInc={() => dispatch({ type: "inc", stat: "strength" })}
                    onDec={() => dispatch({ type: "dec", stat: "strength" })}
                    outOfPoints={alloc.pointsRemaining === 0}
                />
                <StatAdjuster
                    label="Health"
                    base={base.health}
                    allocated={alloc.health}
                    total={total.health}
                    onInc={() => dispatch({ type: "inc", stat: "health" })}
                    onDec={() => dispatch({ type: "dec", stat: "health" })}
                    outOfPoints={alloc.pointsRemaining === 0}
                />
                <StatAdjuster
                    label="Magic"
                    base={base.magic}
                    allocated={alloc.magic}
                    total={total.magic}
                    onInc={() => dispatch({ type: "inc", stat: "magic" })}
                    onDec={() => dispatch({ type: "dec", stat: "magic" })}
                    outOfPoints={alloc.pointsRemaining === 0}
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

                {alloc.pointsRemaining === 0 ? (
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

//reusable +/- stats row
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
  warn: { color: "#ffdddd", textAlign: "center", marginBottom: 8 },
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
    backgroundColor: "rgba(22, 89, 128, 0.08)",
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
  smallBtnText: { color: "blue", fontWeight: "600" },
});

export default CharacterCreator