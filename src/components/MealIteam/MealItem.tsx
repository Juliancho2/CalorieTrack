import { Button, Icon } from "@rneui/themed";
import React, { FC } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";

const MealItem: FC<Meal> = ({ calories, name, portion }) => {
  const { onSaveTodayFood } = useFoodStorage();
  const handleAddItemPress = async () => {
    try {
      await onSaveTodayFood({ calories, name, portion });
      Alert.alert("Added food today");
    } catch (error) {
      console.log(error);
      Alert.alert("food didn't add today");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          onPress={handleAddItemPress}
          style={styles.iconButton}
          type="clear"
          icon={<Icon name="add-circle-outline" />}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fefefe",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "222",
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
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    fontSize: 13,
    color: "#808080",
    fontWeight: "500",
  },
  calories: {
    fontSize: 18,
  },
  iconButton: {
    marginBottom: -12,
  },
});

export default MealItem;
