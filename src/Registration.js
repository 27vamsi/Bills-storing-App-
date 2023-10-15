import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import firebase from '../config';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://test-436b9.firebaseapp.com',
      })
      .then( () => {
        alert('Verification Email Sent')
      }).catch((error) => {
        alert(error.message)
      })
      .then(()=> {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
        })
      })
      .catch((error) => {
        alert(erroe.message)

      })
    })
    .catch((error => {
      alert(error.message)
    }))
  }
  // const registerUser = async (email, password, firstName, lastName) => {
  //   try {
  //     await firebase.auth().createUserWithEmailAndPassword(email, password);
  //     await firebase.auth().currentUser.sendEmailVerification({
  //       handleCodeInApp: true,
  //       url: 'https://test-436b9.firebaseapp.com',
  //     });
  //     await firebase.firestore().collection('users')
  //       .doc(firebase.auth().currentUser.uid)
  //       .set({
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //       });
  //     alert('Verification email sent');
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register Here!!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={() => registerUser(email, password, firstName, lastName)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 20,
    color: 'blue',
  },
  inputContainer: {
    marginTop: 40,
    width: '80%',
  },
  textInput: {
    height: 60,
    fontSize: 18,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: 'blue',
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Registration;
