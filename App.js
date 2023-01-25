import React, { useEffect, useState, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList, 
        Image,ScrollView, RefreshControl, Wait, TextInput } from 'react-native';
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

            if (route.name === 'Subir fruta') {
              iconName = focused
                ? 'cloud-upload'
                : 'cloud-upload-outline';
            } else if (route.name === 'Listado') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'skyblue',
          tabBarInactiveTintColor: 'grey',
        })}
      >
        <Tab.Screen name="Listado" component={ListadoSCreen} options={{ headerTitleAlign: 'center' }} />
        <Tab.Screen name="Subir fruta" component={SubirScreen} options={{ headerTitleAlign: 'center' }} />
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
      <View style = {{display: "flex", flexDirection: "row"}}>
        <View style={style.fruits}>
          
          {item.nombre === "Kiwi" ? null: <Image
            style={{ width: 30, height: 30, }}
            source={require("./src/assets/strawberry.png")}/>}

          <Text style = {{lineHeight: 35}} >{item.id} </Text>
          <Text style = {{lineHeight: 35}} >{item.name} </Text>
          <Text style = {{lineHeight: 35}} >{item.price}€</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => borrarFruta(item.id)}>
            <Text style={style.Borrarbutton}>Borrar</Text>
          </TouchableOpacity>
        </View>
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

function borrarFruta(id) {
  fetch("http://10.0.2.2:8080/fruits/" + id, { method: "DELETE"})
  console.log(id)

}

function SubirScreen() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  return (
    <View>
      <View style={style.viewInput}>
        <Text style={{ margin: 30, width: 60 }}>Nombre:</Text>
        <TextInput
          style={style.input}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>
      <View style={style.viewInput}>
        <Text style={{ margin: 30, width: 60 }}>Precio:</Text>
        <TextInput
          style={style.input}
          value={precio}
          onChangeText={setPrecio}
          keyboardType='numeric' />
      </View>
      <View style={style.viewButton}>
        <TouchableOpacity onPress={() => subirFruta(nombre, precio)}>
          <Text style={style.button}>Guardar fruta</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

function subirFruta(nombre, precio) {
  let data = {
    method: 'POST',
    body: JSON.stringify({
      name: nombre,
      price: precio
    }),
    headers: {
      'Accept': 'application/json',
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
    display: "flex",
    flexDirection: "row",
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 5,
    paddingLeft: 5,
    width: 310,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "space-around",
    backgroundColor: 'skyblue',
  },
  button: {
    fontWeight: 'bold',
    margin: 10,
    padding: 10,
    width: 120,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'skyblue',
    color: "black"
  },
  Borrarbutton: {
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    width: 65,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'orange',
    color: "black"
  },

  viewButton: {
    alignItems: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    color: "black",
    height: 40,
    width: 200,
  },

  viewInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  }
})




