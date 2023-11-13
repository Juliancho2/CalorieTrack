import AsyncStorage from "@react-native-async-storage/async-storage";

import { Meal } from "../types";

const MY_FOOD_KEY = "@MyFood:key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:key";

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(storageKey);
      if (currentSaveFood !== null) {
        const currentFoodParsed = await JSON.parse(currentSaveFood);
        currentFoodParsed.push(meal);
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentFoodParsed),
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveFood = async ({ calories, name, portion }: Meal) => {
    try {
      const result = saveInfoToStorage(MY_FOOD_KEY, {
        name,
        calories,
        portion,
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleSaveTodayFood = async ({ calories, name, portion }: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        name,
        calories,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve(error);
    }
  };
  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleGetTodayFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onGetFoods: handleGetFoods,
    onSaveFood: handleSaveFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFoods,
  };
};
//saving food information today
//saving food information
//it is a function to get food information
//it is a function to get food information today

export default useFoodStorage;
