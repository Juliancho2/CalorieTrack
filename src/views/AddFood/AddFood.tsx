import { Button, Icon, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";

import AddFoodModal from "../../components/AddFoodModal/AddFoodModal";
import Header from "../../components/Header";
import MealIteam from "../../components/MealIteam";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";

const AddFood = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const { onGetFoods } = useFoodStorage();

  useEffect(() => {
    loadFoods().catch(null);
  }, []);
  const loadFoods = async () => {
    try {
      const foodResponse = await onGetFoods();
      setFoods(foodResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Food Saved successfully");
      loadFoods();
    }
    setIsVisible(!visible);
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            onPress={() => setIsVisible(!visible)}
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
      <ScrollView style={styles.content}>
        {foods?.map((food) => <MealIteam key={food.name} {...food} />)}
      </ScrollView>
      <AddFoodModal onClose={handleModalClose} visible={visible} />
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
  content: {},
});

export default AddFood;
