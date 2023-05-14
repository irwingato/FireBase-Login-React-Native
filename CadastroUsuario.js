import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from './firebaseConfig';

export default function CadastroUsuario({ navigation }) {  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

 async function createUserFirebase() {
  try {
    console.log('CadastroUsuario chamado');
    if (senha === confirmaSenha) {
      await firebase.auth().createUserWithEmailAndPassword(email, senha);
      console.log('createUserFirebase=Usuário criado com sucesso');
      console.log('Usuário criado com sucesso');
      setMensagem('Usuário criado com sucesso');
      navigation.navigate('Home'); // redireciona para a página Home
      console.log('navigate to Home');
    } else {
      setMensagem('As senhas não correspondem');
    }
  } catch (error) {
    console.log('createUserFirebase=Falha ao criar usuário');
    console.log(error);
    setMensagem(error.message);
  }
}


  return (
    <View style={styles.container}>
      <MaterialIcons name="person-add" size={50} color="red" />
      <Text style={styles.text}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={setSenha}
        value={senha}
        secureTextEntry={true}
        autoCompleteType="password"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        onChangeText={setConfirmaSenha}
        value={confirmaSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('TouchableOpacity pressed');
          createUserFirebase();
        }}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 10,
    paddingHorizontal: 10
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    marginTop: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  mensagem: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold'
  }
});
