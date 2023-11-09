import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import Routes from "./src/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
