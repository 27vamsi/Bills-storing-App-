import React, { useState, useEffect } from 'react';
import { firebase } from './config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import HomeScreen from './src/HomeScreen';
import AddScreen from './src/AddScreen';
import ShowScreen from './src/ShowScreen';
import ImageFullScreenScreen from './src/ImageFullScreenScreen'; // Import the new screen

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: 'Bills App',
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25,
                },
              }}
            />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Your Bills' }} />
            <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Add Bills' }} />
            <Stack.Screen name="Show" component={ShowScreen} options={{ title: 'Bill Details' }} />
            <Stack.Screen
              name="ImageFullScreen"
              component={ImageFullScreenScreen}
              options={{ headerShown: false }} // Hide the header
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Bills App',
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#0e477e',
                  shadowColor: '#000',
                  elevation: 25,
                },
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                title: 'Bill App',
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25,
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
