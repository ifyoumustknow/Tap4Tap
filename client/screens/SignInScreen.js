import * as React from 'react';
import { StyleSheet, View, Button, Image, TextInput, Text, TouchableOpacity} from 'react-native';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export default function SignInScreen({navigation}) {
  

  // Debugging
  // console.log(navigation)

  const [playerName, onChangePlayerName] = React.useState('PLAYER NAME');
  const [password, onChangePassword] = React.useState('PASSWORD');

  return (
    <View style={styles.container}>
          <Image
          style={styles.tapSignInImage}
          source={require('../components/assets/images/tapSignIn.png')}/>
          <TextInput
      style={styles.playerName}
      onChangeText={text => onChangePlayerName(text)}
      placeholder={playerName}
    />
    <TextInput
      style={styles.password}
      onChangeText={text => onChangePassword(text)}
      placeholder={password}
    />
     <TouchableOpacity style={styles.signInButton}
              onPress={() => this.state.props.navigation.navigate('GameArea')}>
              <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton}
              onPress={() => this.state.props.navigation.navigate('HomePage')}>
              <Text style={styles.signInButtonText}>Back</Text>
      </TouchableOpacity>
    
    </View>
  );
}

SignInScreen.navigationOptions = {

  headerShown: false,
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'center',
    marginTop: 30,
    color:"white",
  },

  signInButton: {
    alignSelf:'center',
    width: 250,
    height: 9,
    paddingTop:25,
    paddingBottom:25,
    backgroundColor:'#A83131',
    borderRadius: 45,
    marginTop: 30,
    shadowColor: '#000',

  },

  signInButtonText: {
    position:'absolute',
    alignSelf:'center',
    color:'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft : 2,
    paddingRight : 10,
    paddingTop : 10,
    zIndex:9999,
  },

  container: {
      flex:1,
      justifyContent:'center',
      height: 900,
      backgroundColor: '#250A26',
  },

  playerName: {
    backgroundColor: 'white',
    height: 40,
    width: 250,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 25,
    marginTop: 20,
    fontFamily: 'FiraSansExtraCondensed-Bold',

  },

  password: {
    backgroundColor: 'white',
    height: 40,
    width: 250,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 25,
    marginTop: 30,
    fontFamily: 'FiraSansExtraCondensed-Bold',

  },
  // signInSheet: {
  //     height: 300,
  //     width: 350,
  //     marginTop: 230,
  //     alignSelf: "center",
  //     borderRadius: 30,
  //     backgroundColor: '#B49A9A'
  // },
  tapSignInImage: {
      alignSelf: "center",
      marginTop: 10,
      fontFamily: 'FiraSansExtraCondensed-Bold',

  }
});
