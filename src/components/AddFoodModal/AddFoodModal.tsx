import { Button } from "@rneui/base";
import { Icon, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

import useFoodStorage from "../../hooks/useFoodStorage";

type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

const AddFoodModal = ({ onClose, visible }: AddFoodModalProps) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const { onSaveFood } = useFoodStorage();

  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion,
      });
      onClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => onClose()}
      visible={visible}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              type="clear"
              onPress={() => onClose()}
              icon={<Icon size={28} name="close" />}
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                onChangeText={(text: string) => setCalories(text)}
                value={calories}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>CAL</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                onChangeText={(text: string) => setPortion(text)}
                value={portion}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Porcion</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleAddPress}
              disabled={!calories.trim() || !name.trim() || !portion.trim()}
              radius="lg"
              color="#ade8af"
              title="Add"
              icon={<Icon color="#fff" name="add" />}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: "500",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default AddFoodModal;
