import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import generateRandomBetween from "../utils/generateRandomBetween";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import NumberContainer from "../components/game/NumberContainer";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ pickedNumber, onGameOver }) {
  const initialGuess = useMemo(() => generateRandomBetween(minBoundary, maxBoundary, pickedNumber), []);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, pickedNumber, guessRounds]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = useCallback((direction) => {
    const isHintIncorrect = (direction === 'lower' && currentGuess < pickedNumber) ||
      (direction === 'greater' && currentGuess > pickedNumber);

    if (isHintIncorrect) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newRandomNumber]);
  }, [currentGuess, minBoundary, maxBoundary]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.card}>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="md-remove" size={24} color={Colors.white} />
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name="md-add" size={24} color={Colors.white} />
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <FlatList
        data={guessRounds}
        renderItem={({ item, index }) => (
          <GuessLogItem roundNumber={index + 1} guess={item} />
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.logsListContainer}
        style={styles.logsList}
      />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    marginBottom: 24,
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    flex: 1,
  },
  logsListContainer: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    gap: 8,
  },
  logsList: {
    width: '100%',
    marginBottom: 50,
  }
})