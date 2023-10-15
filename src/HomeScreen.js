import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if (route.params && route.params.newBlog) {
      setBlogData((prevBlogData) => [...prevBlogData, route.params.newBlog]);
    }
  }, [route.params]);

  const handleAddBlog = (newBlog) => {
    setBlogData((prevBlogData) => [...prevBlogData, newBlog]);
  };

  const handleDeleteBlog = (id) => {
    setBlogData((prevBlogData) => prevBlogData.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Bills !!!</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add', { handleAddBlog })}
      >
        <Text style={styles.buttonText}>Add a Bill</Text>
      </TouchableOpacity>
      <FlatList
        data={blogData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Show', { blog: item })}
            style={styles.blogItem}
          >
            <Image source={{ uri: item.imageUri }} style={styles.blogImage} />
            <View style={styles.blogContent}>
              <Text style={styles.blogTitle}>{item.title}</Text>
              
              <Button
                title="Delete"
                onPress={() => handleDeleteBlog(item.id)}
                color="#FF6666" 
                style={styles.deleteButton} 
              />
              
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  blogItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
  },
  blogImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  blogContent: {
    flex: 1,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5, 
  },
});

export default HomeScreen;
