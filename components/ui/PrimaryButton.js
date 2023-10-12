import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed ? [styles.button, styles.pressed] : styles.button}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  }
});