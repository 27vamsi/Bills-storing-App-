import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ShowScreen = ({ route, navigation }) => {
  const { blog } = route.params;

  const navigateToFullScreenImage = () => {
    navigation.navigate('ImageFullScreen', { imageUri: blog.imageUri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>All about your Bill</Text>
      <View style={styles.infoBox}>
        <Text style={styles.titleText}>Title: {blog.title}</Text>
        <Text style={styles.descriptionText}>Description: {blog.description}</Text>
      </View>
      <TouchableOpacity onPress={navigateToFullScreenImage}>
        <Image source={{ uri: blog.imageUri }} style={styles.blogImage} />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  blogImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
  },
});

export default ShowScreen;
