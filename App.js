import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Info') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Listado') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Listado" component={ListadoStack} options={{ headerTitleAlign: 'center' }} />
        <Tab.Screen name="Info" component={InfoScreen} options={{ headerTitleAlign: 'center' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function ListadoStack() {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen name="Users" component={UsersScreen} options={{ title: 'Lista de usuarios' }} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ title: 'Datos del usuarios' }} />
    </Stack.Navigator>
  );
}

function UsersScreen({ navigation }) {
  const DATA = [
    {
      id: 1,
      nombre: 'Carlos Sánchez',
      edad: 35,
      sexo: 'Hombre',
    },
    {
      id: 2,
      nombre: 'Adrián Aparcero',
      edad: 26,
      sexo: 'Hombre',
    },
    {
      id: 3,
      nombre: 'Antonio Jiménez',
      edad: 25,
      sexo: 'Hombre',
    },
  ];

  const printElement = ({ item }) => {
    return (
      <View >
        <TouchableOpacity onPress={() => navigation.navigate('UserInfo', { item })}>
          <Text style={style.users}>{item.nombre}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={DATA}
      renderItem={printElement}
      keyExtractor={item => item.id}
    />
  );
}

function UserInfoScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={style.dataUser}>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Edad: {item.edad}</Text>
      <Text>Sexo: {item.sexo}</Text>
    </View>
  );
}

function InfoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Vaya lio de ejercicio!</Text>
    </View>
  );
}

//--------- STYLES ---------------------

const style = StyleSheet.create({
  users: {
    fontWeight: 'bold',
    margin: 25,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "orange",
    color: "black"
  },

  dataUser: {
    fontWeight: 'bold',
    margin: 25,
    padding: 25,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "orange",
    color: "black"
  }
})






