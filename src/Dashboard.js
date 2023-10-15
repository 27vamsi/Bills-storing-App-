import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [name, setName] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  const navigateToMyBills = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Text animation="bounceIn" style={styles.headerText}>
        Welcome to Bills App {name.firstName}
      </Animatable.Text>
      <TouchableOpacity onPress={navigateToMyBills} style={styles.button}>
        <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.buttonText}>
          My Bills
        </Animatable.Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.button}>
        <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.buttonText}>
          Sign out
        </Animatable.Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    margin: 10,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Dashboard;
