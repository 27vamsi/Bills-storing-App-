import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RNTesseractOcr } from 'react-native-tesseract-ocr';

const AddScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [scannedText, setScannedText] = useState('');

  const takePictureFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      await performOCR(result.uri);
    }
  };

  const takePictureFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      await performOCR(result.uri);
    }
  };

  const performOCR = async (uri) => {
    try {
      const result = await RNTesseractOcr.recognize(uri, 'LANG_ENGLISH', {});
      setScannedText(result);
    } catch (error) {
      console.error('OCR Error:', error);
    }
  };

  const saveBlog = () => {
    const id = Math.random().toString(36).substring(7);
    const newBlog = { id, title, description, imageUri, scannedText };

    if (route.params && route.params.handleAddBlog) {
      route.params.handleAddBlog(newBlog);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Bill</Text>
      <TextInput
        style={styles.input}
        placeholder="Bill Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bill Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button
        title="Take Picture from Camera"
        onPress={takePictureFromCamera}
        color="#00e4d0"
      />
      <View style={styles.buttonSeparator} />
      <Button
        title="Choose Picture from Gallery"
        onPress={takePictureFromGallery}
        color="#00e4d0"
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {scannedText !== '' && <Text>{scannedText}</Text>}
      <View style={styles.buttonSeparator} />
      <Button
        title="Save and Navigate"
        onPress={saveBlog}
        color="#00e4d0"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  buttonSeparator: {
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default AddScreen;
