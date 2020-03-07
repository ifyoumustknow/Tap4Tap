import React from 'react';
import {View, StyleSheet} from 'react-native';
import GameArea from './components/GameArea';
import io from 'socket.io-client';
import WaitRoom from './components/WaitRoom';

function App (){
  return (
    <View style={styles.container}>
      <WaitRoom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: '#250A26',
  },
});

export default App;
