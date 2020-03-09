import React from 'react';
import {View, StyleSheet} from 'react-native';
import GameArea from './components/GameArea';
import io from 'socket.io-client';
import HomeScreen from  './screens/HomeScreen'

function App (){
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#250A26',
  },
});

export default App;