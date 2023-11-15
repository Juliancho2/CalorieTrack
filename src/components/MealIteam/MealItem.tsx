import { Button, Icon } from "@rneui/themed";
import React, { FC } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompletdAddRemove?: () => void;
  itemPosition: number;
};
const MealItem: FC<MealItemProps> = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  onCompletdAddRemove,
  itemPosition,
}) => {
  const { onSaveTodayFood, onRemoveTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, name, portion });
        Alert.alert("Added food today");
      } else {
        await onRemoveTodayFood(itemPosition);
        Alert.alert("Food deleted");
      }
      onCompletdAddRemove();
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
          onPress={handleIconPress}
          style={styles.iconButton}
          type="clear"
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
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
