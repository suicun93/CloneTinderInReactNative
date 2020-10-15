import React from "react";
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { HomeScreen } from "./views/HomeScreen";
import { ListUser } from "./views/ListUser";

// Components
import { appName } from "./constants";

// Main App
const App = () => {
  const [view, setView] = React.useState("homeScreen");
  const [loaded, setLoaded] = React.useState(false);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#efe3af" }}>
        <View style={{ flexDirection: "row", backgroundColor: "#efe3af" }}>
          <Icon
            name="home"
            color={view === "homeScreen" ? "#23b5be" : "rgba(255,255,255,0.8)"}
            containerStyle={{ padding: 10 }}
            size={40}
            onPress={() => {
              setLoaded(true);
              setView("homeScreen");
            }}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                color: "#da5a5d",
                fontSize: 35,
                fontWeight: "bold",
              }}
            >
              {appName}
            </Text>
          </View>
          <Icon
            name="book"
            color={view === "listUser" ? "#23b5be" : "rgba(255,255,255,0.7)"}
            containerStyle={{ padding: 10 }}
            size={40}
            onPress={() => {
              setLoaded(false);
              setView("listUser");
            }}
          />
        </View>
        {view === "homeScreen" ? <HomeScreen /> : <ListUser />}
      </SafeAreaView>
    </>
  );
};

export default App;
