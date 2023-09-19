// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  // web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBAK2eDwAEVS9oxZvc05rXqLaodk4Fm02g",
    authDomain: "chatapp-b1faf.firebaseapp.com",
    projectId: "chatapp-b1faf",
    storageBucket: "chatapp-b1faf.appspot.com",
    messagingSenderId: "944728333259",
    appId: "1:944728333259:web:4f88ed027c08297fc8744e",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
