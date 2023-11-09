import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Header from "../../components/Header/Header";
import { RootStackParams } from "../../types";

const Home = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParams, "Home">>();

  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            onPress={handleAddCaloriesPress}
            color="#4ecb71"
            radius="lg"
            icon={<Icon color="#fff" name="add-circle-outline" />}
            title=""
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  caloriesLegend: {
    fontSize: 20,
  },
});
export default Home;
