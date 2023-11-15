import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Icon } from "@rneui/themed";
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";

import Header from "../../components/Header/Header";
import TodayCalories, {
  TodayCaloriesProps,
} from "../../components/TodayCalories";
import TodayMeals from "../../components/TodayMeals";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal, RootStackParams } from "../../types";

const totalCaloriesPerDay = 2000;

const Home = () => {
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: totalCaloriesPerDay,
  });
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParams, "Home">>();

  const calculateTodayStatistics = async (meal: Meal[]) => {
    try {
      const caloriesConsumed = meal.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
        total: totalCaloriesPerDay,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };
  const loadTodadyFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      calculateTodayStatistics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.log(error);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadTodadyFood().catch(null);
    }, [loadTodadyFood]),
  );
  console.log(todayFood);

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
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        onCompleteAddRemove={() => loadTodadyFood()}
        foods={todayFood}
      />
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
