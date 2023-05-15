import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase';

import CadastroUsuario from './CadastroUsuario';

import EsqueciSenha from './EsqueciSenha';

import Home from './Home';

const Stack = createStackNavigator();

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  function loginFirebase(navigation) {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((user) => {
        console.log(email + '-' + senha);
        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
        console.log("loginFirebase=" + errorCode + "/" + errorMessage);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("useEffect user.uid=" + user.uid);
        console.log('Usuário conectado');
        setMensagem('Usuário conectado');
      } else {
        console.log("useEffect=Usuário não logado");
      }
    });
  }, []);

  function logoutFirebase() {
    firebase.auth().signOut().then(function () {
      console.log("logoutFirebase=Usuário desconectado com sucesso")
      setMensagem('Usuário desconectado');
    }).catch(function (error) {
      console.log("logoutFirebase=Falha ao desconectar");
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false}} initialParams={{ navigation }} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppScreen( {navigation} ) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  function loginFirebase(navigation) {
  console.log("loginFirebase called");
  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((user) => {
      console.log(email + '-' + senha);
      console.log("loginFirebase user.uid=" + user.uid);
      navigation.navigate('Home');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
      console.log("loginFirebase=" + errorCode + "/" + errorMessage);
      console.log(error);
  });
}


useEffect(() => {
  firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("useEffect user.uid=" + user.uid);
    console.log('Usuário conectado');
    setMensagem('Usuário conectado');
    } else {
      console.log("useEffect=Usuário não logado");
    }
  }); 
}, []);

function createUserFirebase() {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((user) => {
    console.log("createUserFirebase=Usuário criado com sucesso");
    setMensagem('Usuário criado com sucesso');
    navigation.navigate('CadastroUsuario'); // <- redireciona para a página CadastroUsuario
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("createUserFirebase=Falha ao desconectar")
  });
}

return (
  <View style={styles.container}>
    <Text style={styles.title}>Faça seu Login</Text>

  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Endereço de e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        onChangeText={email => setEmail(email)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={senha => setSenha(senha)}
        value={senha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.esqueceuSenha} onPress={() => navigation.navigate('EsqueciSenha')}>
        <Text style={styles.esqueceuSenhaText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>        
        <TouchableOpacity style={styles.button} onPress={() => { loginFirebase(navigation) }}>

          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.cadastroContainer}>
          <Text>Não possui uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
            <Text style={styles.cadastroLink}>Criar Uma</Text>
          </TouchableOpacity>
        </View>

        <Text>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
    height: 50
  },
  esqueceuSenha: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: 'blue',
  },
  esqueceuSenhaText: {
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  cadastroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  cadastroLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 5
  }
});
