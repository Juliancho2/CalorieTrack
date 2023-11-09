import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const staticInfo = {
  name: "Juan ortiz",
  uri: "https://plus.unsplash.com/premium_photo-1697477564605-e7e2a61aa9a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTU2NjI3Nw&ixlib=rb-4.0.3&q=80&w=1080",
};

const Header = () => {
  const { canGoBack, goBack } = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack() && (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      )}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{staticInfo.name}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.image} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});
export default Header;
