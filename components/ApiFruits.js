import React, { useEffect, useState, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList, ScrollView, RefreshControl, Wait } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function ApiFruits() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Subirfruta') {
              iconName = focused
                ? 'cloud-upload'
                : 'cloud-upload-outline';
            } else if (route.name === 'Listado') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'grey',
        })}
      >
        <Tab.Screen name="Listado" component={ListadoSCreen} options={{ headerTitleAlign: 'center' }} />
        <Tab.Screen name="Subirfruta" component={SubirScreen} options={{ headerTitleAlign: 'center' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function ListadoSCreen() {
  const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false), setOpen(false), loadKeychains()); }, []);
  const [refreshing, setRefreshing] = useState(false);

  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    fetch("http://10.0.2.2:8080/fruits")
      .then(response => response.json())
      .then((responseJson) => {
        console.log("geting data from fetch", responseJson);
        setFruits(responseJson);
      })
      .catch(error => console.log(error));
  },
    [])

  const printElement = ({ item }) => {
    return (
        <View style={style.fruits}>
          <Text >ID: {item.id} | NAME: {item.name} | PRICE: {item.price}</Text>
        </View>
    )
  }

  return (
    <FlatList
      data={fruits}
      renderItem={printElement}
      keyExtractor={item => item.id}
    />
  )
}

function SubirScreen() {

  return (
      <View style={{alignItems:"center"}}>
        <TouchableOpacity onPress={() =>subirFruta()}>
          <Text style={style.button}>Subir fruta</Text>
        </TouchableOpacity>
      </View>
    )
}

function subirFruta () {
  let data = {
    method: 'POST',
    body: JSON.stringify({
      name: "watermelon",
      price: 1.90
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch("http://10.0.2.2:8080/fruits", data)
          .then(response => response.json())  // promise
          .catch(error => console.log(error));
  } 



//--------- STYLES ---------------------

const style = StyleSheet.create({
  fruits: {
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    color: "black"
  },
  button: {
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'skyblue',
    color: "black"
  },
})




