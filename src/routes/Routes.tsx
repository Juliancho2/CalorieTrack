import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParams } from "../types";
import AddFood from "../views/AddFood";
import Home from "../views/Home/Home";

const Stack = createNativeStackNavigator<RootStackParams>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddFood"
          component={AddFood}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
