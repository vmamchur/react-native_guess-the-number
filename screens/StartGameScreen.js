import { useCallback, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const numberInputHandler = useCallback((number) => {
    setEnteredNumber(number);
  }, []);

  const resetInputHandler = useCallback(() => {
    setEnteredNumber('');
  }, []);

  const confirmHandler = useCallback(() => {
    const chosenNumber = parseInt(enteredNumber);
    const isChosenNumberInvalid = isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99;

    if (isChosenNumberInvalid) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }

    onPickNumber(chosenNumber);
  }, [enteredNumber]);

  return (
    <View style={styles.rootContainer}>
      <Title>Guess The Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          value={enteredNumber}
          onChangeText={numberInputHandler}
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad" />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    fontSize: 32,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  buttonContainer: {
    flex: 1,
  }
});
