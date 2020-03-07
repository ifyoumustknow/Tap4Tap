import React from 'react';
import {View, StyleSheet} from 'react-native';
import GameArea from './components/GameArea';
import io from 'socket.io-client';

function App (){
  return (
    <View style={styles.container}>
      <GameArea />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingTop: 35,
    backgroundColor: '#250A26',
  },
});

export default App;