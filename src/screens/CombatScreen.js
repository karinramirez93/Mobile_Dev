import { View, Text, StyleSheet, Image, Pressable, FlatList, ImageBackground } from "react-native";
import { HERO_IMAGES,} from "./CharacterCreator";
import { GlobalStyles } from "../components/GlobalStyles";
import MONSTER from "../components/Monster";
import { useReducer } from "react";


//backgrondImage for combat
const COMBAT_BG= require("../../pictures/arena/arena2.png");

//Helper: support either a remote URI (imageUrl) or a local require (image)
function resolveHeroImage(hero) {
  if (!hero) return null;
  if (hero.imageSource) return hero.imageSource; //local require("...")
  if (hero.imageUrl)   return { uri: hero.imageUrl }; // remote URL
  if (hero.image && HERO_IMAGES[hero.image]) return HERO_IMAGES[hero.image];
  return null;
}

// Helper: support either a remote URI (imageUri) OR a local require (image)
function resolveMonsterImage() {
  if (MONSTER.image) return MONSTER.image;               // local: require("...")
  if (MONSTER.imageUri) return { uri: MONSTER.imageUri };// remote URL
  return null;
}
const MONSTER_IMG_SRC = resolveMonsterImage();

//--------create the initial combat state----------
function makeInitialCombat(route){
    //check player/hero info + stats; in case no found use the following
    const player = route?.params?.player ?? {name: "Hero", strength: 1, health: 10, magic: 1};
    const hero = route?.params?.hero ?? {name: "Unknown", image: null};


    return {
        hero,
        //player
        pName: player.name,
        pStr: player.strength,
        pHP: player.health,
        pMP: player.magic,
        pMaxHP: player.health, // track the player max health

        //monster // and calling monster from its location file
        mHP: MONSTER.health,
        //mMaxHP: monsterBaseHP,
        
        // log + end state
        log: ["A dangerous monster draws near"],
        ended: false,
        result: null, // victory or defeat
    };


}// end makeInitialCombat()

/**
 * Reducer to keeps combat logic simple and predictable
 */
function combatReducer(state, action){
    switch (action.type){
        case "LOG":
            return {...state, log: [action.message, ...state.log]};

        case "SET_PHP": return {...state, pHP: Math.max(0, action.value) };

        case "SET_PMP": return {...state, pMP: Math.max(0, action.value) };

        case "SET_MHP": return {...state, mHP: Math.max(0, action.value) };

        case "END": return {...state, ended: true, result: action.result};


        //----player actions -----
        case "PLAYER_ATTACK": {
            if (state.ended) return state;
            const dmg = state.pStr; // take damage values from player strength
            const mNew = Math.max(0, state.mHP - dmg);
            return {...state, mHP: mNew, log: [`You strike for ${dmg}.`, ...state.log] };
        }
        case "PLAYER_HEAL":{
            if(state.ended)return state;
            const cost = 3; // Magic Power cost to heal
            const heal = 12; // Amount of heal restore

            //check if the player is at full health
            if(state.pHP >= state.pMaxHP){
                return{...state, log:["You are already at full health"]};
            }
            //check before attend to heal if the player has enough Magic Power.
            if(state.pMP < cost){
                return{...state, log:["Not enough magic to heal", ...state.log]};
            }
            const newHP = Math.min(state.pHP + heal, state.pMaxHP)

            return{...state, pMP: state.pMP - cost, pHP: newHP, 
                    log: [`You heal +${heal}. (-${cost}MP)`, ...state.log]};
        }

        case "PLAYER_FIRE": {
            if(state.ended) return state;
            const cost = 3;
            if( state.pMP < cost) return {...state, log:["Not enough magic!", state.log]};
            const dmg = Math.floor(state.mHP /2) ;
            const mNew = Math.max(0, state.mHP - dmg);
            return {...state, pMP: state.pMP - cost, mHP: mNew, 
                    log:[`Fire hits for ${dmg}. (-${cost} MP)`, ...state.log] };
        }

        // -----monster counterAttack
        case "MONSTER_COUNTER":{
            if(state.ended) return state;
            const dmg = MONSTER.strength;
            const pNew = Math.max(0, state.pHP - dmg);
            return {...state, pHP: pNew, log: [`${MONSTER.name} hits you for ${dmg}.`, ...state.log]};

        }
        default: 
            return state;
    }

}// end combatReducer()

function CombatScreen({route, navigation}){
    const [state, dispatch] = useReducer(combatReducer, route, makeInitialCombat);
    const heroImg = resolveHeroImage(state.hero);

    //after a player action: victory? else monster counter (then maybe defeat)
    const postPlayerAction = (monsterHPAfter) => {
        if(monsterHPAfter <= 0){
            dispatch({type: "END", result: "victory"});
            dispatch({type: "LOG", message: "victory! the Monster is defeated"});
            return;
        }
        setTimeout(() => {
            dispatch({type: "MONSTER_COUNTER"});
            setTimeout(() => {
                if (state.pHP - MONSTER.strength <= 0){
                    dispatch({type: "END", result: "defeat"});
                    dispatch({type: "LOG", message: "You are defeated..."});
                }
            }, 0);
        }, 0);
    };

    //player actions
    const onAttack = () => {
        if(state.ended) return;
        const projectedMHP = Math.max(0, state.mHP - state.pStr);
        dispatch({type: "PLAYER_ATTACK"});
        postPlayerAction(projectedMHP);
    };
    const onFire = () => {
        if(state.ended) return;
        const projectedMHP = Math.max(0, Math.floor(state.mHP / 2));
        if(state.pMP < 3){
            dispatch({type: "LOG", message: "Not enough magic"});
            return;
        }
        dispatch({ type: "PLAYER_FIRE"});
        postPlayerAction(projectedMHP);
    };
    const onHeal = () => {
        if (state.ended) return;
        dispatch({type: "PLAYER_HEAL"}); // no counter on heal
    };

    const renderLog = ({item}) => <Text style={styles.logLine}>• {item}</Text>

    const body = (
        <View style={[GlobalStyles.container, styles.pad, {backgroundColor:"transparent", paddingBottom: 40}]}>
            <Text style={[GlobalStyles.text, styles.header]}>⚔️ Battle</Text>

            {/* player vs Monster stats */}
            <View style={styles.topRow}>
                <View>
                    {heroImg && (
                    <Image
                        source={heroImg}
                        style={{ width: 100, height: 100, resizeMode: "contain", marginBottom: 6 }}
                    />
                    )}
                    <Text style={styles.statHead}>{state.pName}</Text>
                    <Text style={styles.stat}>HP: {state.pHP}</Text>
                    <Text style={styles.stat}>MP: {state.pMP}</Text>
                    <Text style={styles.stat}>STR: {state.pStr}</Text>
                </View>

                <View style={{alignItems: "center"}}>
                    {MONSTER_IMG_SRC && <Image source={MONSTER_IMG_SRC} style={styles.monsterImg} />}
                    <Text style={styles.monsterName}>{MONSTER.name}</Text>
                    <Text style={styles.stat}>HP: {state.mHP}</Text>
                    <Text style={styles.stat}>STR: {MONSTER.strength}</Text>
                </View>
            </View>

            {/* combat log */}
            <View style={styles.logBox}>
                <FlatList
                    data= {state.log}
                    renderItem={renderLog}
                    keyExtractor={(item, idx) => `${idx}-${item}`}
                />
            </View>

            {/* Actions or result */}
            {state.ended ? (
                <View style={{alignItems: "center", gap: 8}}>
                    <Text style={styles.resultText}>
                        {state.result === "victory" ? "🎉 Victory!" : "💀 You have fallen…"}
                    </Text>
                    <Pressable
                    onPress={() => navigation.goBack()}
                    android_ripple={{color:"#920c0cff"}}
                    style={({pressed}) => [styles.primaryBtn, pressed && GlobalStyles.iosPressable]}
                    >
                    <Text style={styles.primaryBtnText}>Play Again</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.actionsRow}>
                    <SmallBtn label="Attack" onPress={onAttack}/>
                    <SmallBtn label="Fire" onPress={onFire}/>
                    <SmallBtn label="Heal" onPress={onHeal}/>
                </View>
            )}
        </View>
    );



    return(
        <ImageBackground
            source={COMBAT_BG}
            style={{flex:1}}
            resizeMode="cover"
        >
            {body}

        </ImageBackground>

    );

}//end CombatScreen()

function SmallBtn({ label, onPress}){
    return(
        <Pressable
        onPress={onPress}
        android_ripple={{color: "#920c0cff"}}
        style={styles.smallBtn}
        >
            <Text style={styles.smallBtnText}>{label}</Text>

        </Pressable>
    );

}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: 16 },
  header: { color: "#fff", textAlign: "center", fontSize: 20, marginBottom: 8 },

  topRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginVertical: 8 },
  statHead: { color: "#fff", fontWeight: "700" },
  stat: { color: "#fff" },

  monsterImg: { width: 120, height: 120, resizeMode: "contain" },
  monsterName: { color: "#fff", marginTop: 4 },

  logBox: {
    flex: 1, width: "100%", borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.35)", // darker to read the text over bg
    padding: 8, marginVertical: 8,
  },
  logLine: { color: "#fff", marginVertical: 2 },

  actionsRow: { flexDirection: "row", justifyContent: "center", gap: 12, marginVertical: 12 },
  smallBtn: { backgroundColor: "#d1bee0ff", borderRadius: 6, paddingVertical: 10, paddingHorizontal: 14 },
  smallBtnText: { color: "blue", fontWeight: "600", fontSize: 16 },

  primaryBtn: { backgroundColor: "#d1bee0ff", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 },
  primaryBtnText: { color: "blue", fontSize: 18 },
  resultText: { color: "#fff", fontSize: 20, marginBottom: 6 },
});






export default CombatScreen;