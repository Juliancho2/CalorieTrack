import AsyncStorage from "@react-native-async-storage/async-storage";

import { Meal } from "../types";

const MY_FOOD_KEY = "@MyFood:key";

const useFoodStorage = () => {
  const handleSaveFood = async ({ calories, name, portion }: Meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (currentSaveFood !== null) {
        const currentFoodParsed = await JSON.parse(currentSaveFood);
        currentFoodParsed.push({
          name,
          calories,
          portion,
        });
        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify(currentFoodParsed),
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(
        MY_FOOD_KEY,
        JSON.stringify([
          {
            calories,
            name,
            portion,
          },
        ]),
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
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

  return {
    onGetFoods: handleGetFoods,
    onSaveFood: handleSaveFood,
  };
};
//saving food information
//it is a function to get food information

export default useFoodStorage;
