import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
}

export default Header;
