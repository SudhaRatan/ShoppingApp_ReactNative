// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import App1 from "./src/App"
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function App() {
  return (
    <App1 />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
