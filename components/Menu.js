import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Formulario from './components/Formulario';
import UserList from "./components/UserList";
import { styles } from "./src/styles/StyleMenu";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
        <Stack.Screen name="TabUser" component={TabUserScreen} options={{ title: "Lista de usuarios" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MenuScreen({ navigation }) {
  return (
    <View>
      <Button
        style={styles.button}
        title='Ej1: Formulario'
        onPress={() => navigation.navigate("Formulario")} />
      <Button
        style={styles.button}
        title='Ej2: Lista de usuarios'
        onPress={() => navigation.navigate("TabUser")} />
    </View>
  )
}

function FormularioScreen() {
  return (
    <Formulario />
  )
}

function TabUserScreen() {
  return (
    <UserList />
  )
} 