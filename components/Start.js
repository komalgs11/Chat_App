import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

const image = require("../media/Background_Image.png");

const backgroundColors = {
  a: "#757083",
  b: "#474056",
  c: "#8A95A5",
  d: "#B9C6AE",
};

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors.c);
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.appTitle}>Chat App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            placeholderTextColor="#757083"
          />
          <Text style={styles.textColorSelector}>Choose background color:</Text>
          <View style={styles.colorSelector}>
            <TouchableOpacity
              style={[
                styles.circle,
                color === backgroundColors.a && styles.selectedCircle,
                { backgroundColor: backgroundColors.a },
              ]}
              onPress={() => setColor(backgroundColors.a)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.circle,
                color === backgroundColors.b && styles.selectedCircle,
                { backgroundColor: backgroundColors.b },
              ]}
              onPress={() => setColor(backgroundColors.b)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.circle,
                color === backgroundColors.c && styles.selectedCircle,
                { backgroundColor: backgroundColors.c },
              ]}
              onPress={() => setColor(backgroundColors.c)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.circle,
                color === backgroundColors.d && styles.selectedCircle,
                { backgroundColor: backgroundColors.d },
              ]}
              onPress={() => setColor(backgroundColors.d)}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Go To Chat</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* // to avoid keyboard hides the message input field in ios */}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
      {Platform.OS === "android" ? ( // to avoid keyboard hides the message input field in android
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginTop: 15,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
    padding: "6%",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: "6%",
    paddingBottom: 20,
  },
  textColorSelector: {
    fontSize: 16,
    fontWeight: "300",
    color: "#8A95A5",
    marginBottom: 10,
  },
  colorSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#757083",
    padding: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Start;
