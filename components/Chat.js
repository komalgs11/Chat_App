import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, color, userID } = route.params; //shows background color and name on chat pg
  const [messages, setMessages] = useState([]);

  //the function adds new message to firestore
  const addMessage = async (newMessages) => {
    const newMessageRef = await addDoc(
      collection(db, "messages"),
      newMessages[0]
    );
    //if failed to add a new message
    if (!newMessageRef.id) {
      Alert.alert("Unable to add. Please try later");
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // those speech bubbles from the sender ...
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => addMessage(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
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
  },
});

export default Chat;
