import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Meal } from "../../types";
import MealIteam from "../MealIteam";

type TodayMealsProps = {
  foods: Meal[];
  onCompleteAddRemove?: () => void;
};
const TodayMeals: FC<TodayMealsProps> = ({ foods, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal: Meal, index) => (
          <MealIteam
            itemPosition={index}
            key={meal.name}
            {...meal}
            onCompletdAddRemove={onCompleteAddRemove}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  content: {},
  title: {
    fontSize: 16,
    marginBottom: 7,
  },
});
export default TodayMeals;
