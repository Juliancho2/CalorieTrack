import { Button, Icon, Input } from "@rneui/themed";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Header from "../../components/Header";

const AddFood = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            radius="lg"
            color="#4ecb71"
            icon={<Icon color="#fff" name="add-circle-outline" />}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="apple , pie, soda..." />
        </View>
        <Button
          titleStyle={styles.searchBtnTitle}
          radius="lg"
          color="#ade8af"
          title="search"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  legendContainer: {
    flex: 1,
  },
  addFoodLegend: {
    fontSize: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: "#000",
    fontSize: 14,
  },
});

export default AddFood;
