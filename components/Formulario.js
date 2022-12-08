import React, { Fragment, useState } from 'react';
import { Button, View, Text, TextInput, Switch, Image, StyleSheet, Pressable, ImageBackground } from "react-native";

export default function Formulario(props) {

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [edad, setEdad] = useState("");
    const [correo, setCorreo] = useState("");
    const [mostrar, setMostrar] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [errorEdad, setErrorEdad] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorApellidos, setErrorApellidos] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");

    const { onPress, title = 'Save' } = props;


    function validarEdad(entrada) {
        const re = /^[0-9]+/;
        if (entrada === "") {
            setErrorEdad("");
        } else if (!re.test(entrada)) {
            setErrorEdad("Se debe introducir una edad válida");
        } else {
            setErrorEdad("");
        }
        setEdad(entrada);
    }

    function validarNombre(entrada) {
        const re = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        if (entrada === "") {
            setErrorNombre("");
        } else if (!re.test(entrada)) {
            setErrorNombre("Se debe introducir solo letras");
        } else {
            setErrorNombre("");
        }
        setNombre(entrada);
    }

    function validarApellidos(entrada) {
        const re = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        if (entrada === "") {
            setErrorApellidos("");
        } else if (!re.test(entrada)) {
            setErrorApellidos("Se debe introducir solo letras");
        } else {
            setErrorApellidos("");
        }
        setApellidos(entrada);
    }

    function validarCorreo(entrada) {
        const re = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,40})+$/;
        if (entrada === "") {
            setErrorCorreo("");
        } else if (!re.test(entrada)) {
            setErrorCorreo("Este correo no es válido");
        } else {
            setErrorCorreo("");
        }
        setCorreo(entrada);
    }

    function comprobarErrorres() {
        if (nombre === "" || apellidos === "" || edad === "" || correo === "" ||
            errorNombre === "Se debe introducir solo letras" || errorApellidos === "Se debe introducir solo letras" ||
            errorEdad === "Se debe introducir una edad válida" || errorCorreo === "Este correo no es válido") {
            return (true)
        }
        else {
            return (false)
        }
    }

    function enviar() {
        setMostrar(true)
    }

    function reset() {
        setMostrar(false)
        setNombre("")
        setApellidos("")
        setEdad("")
        setCorreo("")
    }

    const styles = StyleSheet.create({
        texto: {
            fontWeight: 'bold',
            marginLeft: 45,
            color: "#405f5a"
        },

        input: {
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 40,
            marginRight: 25,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "#ead9b4",
            borderRadius: 15,
            color: "black",
            height: 40,
            width: 300,
        },

        viewBotones: {
            flexDirection: "row",
            margin: 10,
        },

        vewSexo: {
            flexDirection: "row",
            marginTop: 10,
            position: 'relative',
            left: 70
        },

        textoBoton: {
            fontSize: 13,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: "#ead9b4",
        },

        button: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            width: 150,
            height: 50,
            backgroundColor: '#405f5a',
            borderWidth: 2,
            borderColor: "black",
            marginTop: 15,
            marginLeft: 25,

        },

        resultado: {
            flexDirection: 'row',
            color: "#405f5a",

        }

    })

    return (

        <View style={styles.fondo}>
            <Text style={styles.texto}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={validarNombre} />
            {errorNombre && <Text>{errorNombre}</Text>}

            <Text style={styles.texto}>Apellidos:</Text>
            <TextInput
                style={styles.input}
                value={apellidos}
                onChangeText={validarApellidos} />
            {errorApellidos && <Text>{errorApellidos}</Text>}

            <Text style={styles.texto}>Edad:</Text>
            <TextInput
                style={styles.input}
                value={edad}
                keyboardType='numeric'
                onChangeText={validarEdad} />
            {errorEdad && <Text>{errorEdad}</Text>}

            <Text style={styles.texto}>Correo electrónico:</Text>
            <TextInput
                style={styles.input}
                value={correo}
                onChangeText={validarCorreo} />
            {errorCorreo && <Text>{errorCorreo}</Text>}

            <View style={styles.vewSexo}>
                <Text style={styles.texto}>Hombre</Text>
                <Switch
                    style={{ position: "relative", left: 30 }}
                    trackColor={{ false: "#03D1E3", true: "#FF51D2" }}
                    thumbColor={"silver"}
                    onValueChange={() => setIsEnabled(previousState => !previousState)}
                    value={isEnabled}
                />
                <Text style={styles.texto}>Mujer</Text>
            </View>

            <View style={styles.viewBotones}>
                <Pressable
                    style={styles.button}
                    disabled={comprobarErrorres()}
                    onPress={enviar}>
                    <Text Text style={styles.textoBoton}>Enviar</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    disabled={comprobarErrorres()}
                    onPress={reset}>
                    <Text Text style={styles.textoBoton}>Limpiar</Text>
                </Pressable>
            </View>

            {mostrar ? <><Text style={styles.resultado}>Nombre: {nombre}. Apellidos: {apellidos}. Edad: {edad}. Correo electrónio: {correo}. Sexo: {isEnabled ? "Mujer" : "Hombre"} </Text>
                <Image
                    style={{ width: 300, height: 315, }}
                    source={require('../img/Snorlax.png')}
                /></> : null}
        </View>
    )
}

