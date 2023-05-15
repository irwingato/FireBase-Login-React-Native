import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

import firebase from './firebaseConfig';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');

  const enviarEmail = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      console.log('E-mail de redefinição de senha enviado com sucesso');
    } catch (error) {
      console.log('Erro ao enviar o e-mail de redefinição de senha:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <Text style={styles.subtitle}>Digite seu email abaixo para recuperá-la</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={enviarEmail}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#0077cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
