import { useCallback, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function App() {
  const [isGameOver, setIsGameOver] = useState(true);
  const [pickedNumber, setPickedNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumberHandler = useCallback((number) => {
    setPickedNumber(number);
    setIsGameOver(false);
  }, []);

  const gameOverHandler = useCallback((numberOfRounds) => {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds);
  }, []);

  const startNewGameHandler = useCallback(() => {
    setPickedNumber(null);
    setGuessRounds(0);
  }, []);

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (pickedNumber) {
    screen = <GameScreen pickedNumber={pickedNumber} onGameOver={gameOverHandler} />;
  }

  if (isGameOver && pickedNumber) {
    screen = <GameOverScreen roundsNumber={guessRounds} pickedNumber={pickedNumber} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
      <ExpoStatusBar style="light" />
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.root}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.root}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={{ ...styles.root, paddingTop: StatusBar.currentHeight }}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
