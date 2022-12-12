import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function MenuNavigation() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Menu" component={MenuScreen}/>
        <Stack.Screen name = "Formulario" component={FormularioScreen}/>
        <Stack.Screen name = "TabUser" component={TabUserScreen} options={{title:"Lista de usuarios"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}