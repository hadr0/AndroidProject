import React, { useEffect, useState, } from 'react';
import { View, Text, TouchableOpacity, 
          StyleSheet,FlatList, 
          Image, TextInput, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//para importar las imagenes
import Fresa from "./src/assets/strawberry.png";
import Manzana from "./src/assets/manzana.png";
import Melocoton from "./src/assets/melocoton.png";
import Naranja from "./src/assets/naranja.png";
import Pera from "./src/assets/pera.png";
import Piña from "./src/assets/piña.png";
import Platano from "./src/assets/platano.png";
import Uvas from "./src/assets/uvas.png";
import Kiwi from "./src/assets/kiwi.png";

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
          tabBarActiveTintColor: 'rgb(6, 125, 172)',
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
  const [fruits, setFruits] = useState(null);

  function fetchdata() {
    fetch("http://10.0.2.2:8080/fruits")
    .then(response => response.json())
    .then((responseJson) => {
      console.log("geting data from fetch", responseJson);
      setFruits(responseJson);
    })
    .catch(error => console.log(error));
  }
  useEffect( fetchdata,[])

  const printElement = ({ item }) => {
    return (
      <View style = {{display: "flex", flexDirection: "row"}}>
        <View style={style.fruits}>
          
          <Image
            style={{ width: 30, height: 30, marginTop: 5 }}
            source={item.name === "Fresa" ? Fresa : item.name === "Kiwi" ? Kiwi : 
                    item.name === "Pera" ? Pera : item.name === "Platano" ? Platano : 
                    item.name === "Melocoton" ? Melocoton : item.name === "Uvas" ? Uvas : 
                    item.name === "Naranja" ? Naranja : item.name === "Piña" ? Piña : 
                    item.name === "Manzana" ? Manzana : null}/> 
                                {/* usar Manzana de ejemplo para "subir fruta" */}
          <Text style = {{lineHeight: 35, width: 20}} >{item.id} </Text>
          <Text style = {{lineHeight: 35, width: 55}} >{item.name} </Text>
          <Text style = {{lineHeight: 35, width: 35}} >{item.price}€</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => borrarFruta(item.id)}>
            <Text style={style.Borrarbutton}>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  async function  borrarFruta(id) {
    await fetch("http://10.0.2.2:8080/fruits/" + id, { method: "DELETE"})
    fetchdata()
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
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [mesage, setMesage] = useState("");

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
    setMesage("Fruta subida con exito");
    setNombre("");
    setPrecio("");

    return fetch("http://10.0.2.2:8080/fruits", data)
      .then(response => response.json())  // promise
      .catch(error => console.log(error))  
  }

  return (
    <View>
      <View style={style.viewInput}>
        <Text style={{ margin: 30, width: 60 }}>Nombre:</Text>
        <TextInput
          style={style.input}
          value={nombre}
          onChangeText={setNombre}/>
      </View>
      <View style={style.viewInput}>
        <Text style={{ margin: 30, width: 60 }}>Precio:</Text>
        <TextInput
          style={style.input}
          value={precio}
          onChangeText={setPrecio}
          keyboardType='numeric'/>
      </View>
      <View style={style.viewButton}>
        <TouchableOpacity onPress={() => nombre ==="" || precio ===""? setMesage("Debe rellenar los campos") : subirFruta(nombre, precio)}>
          <Text style={style.button}>Guardar fruta</Text>
          <Text>{mesage}</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
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
    backgroundColor: 'skyblue',
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




