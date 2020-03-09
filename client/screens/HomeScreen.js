import * as React from 'react';
import { StyleSheet, View, Image , TouchableOpacity, Text} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage}
      source={require('../components/assets/images/home_logo.png')}>
      </Image>
      <TouchableOpacity style={styles.signInButton}
              color='white'
              title="SIGN IN"
              underlayColor='#fff'
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createPlayerButton}
              color='white'
              title="CREATE"
              underlayColor='#fff'>
              <Text style={styles.createPlayerText}>CREATE PLAYER</Text>
      </TouchableOpacity>
      
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  signInButton: {
    position:'relative',
    alignSelf:'center',
    width: 190,
    height:70,
    paddingTop:15,
    paddingBottom:25,
    backgroundColor:'#A83131',
    borderRadius: 45,
    right: 50,
    bottom: 1100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.1,
    elevation: 13,
  },
  signInButtonText: {
    color:'#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 5,
  },

  createPlayerButton: {
    position:'relative',
    alignSelf:'center',
    width: 190,
    height:70,
    paddingTop:10,
    paddingBottom:25,
    backgroundColor:'#B49A9A',
    borderRadius: 45,
    bottom: 630,
    right:50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.1,
    elevation: 13,
  },
 

  createPlayerText: {
    color:'#250A26',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop: 10
  },
  container: {
    position: 'absolute',
    width:500,
    height:900,
    backgroundColor: '#240a25',
    overflow:'hidden',
  },

  backgroundImage: {
    position: 'relative',
    justifyContent:'center',
    alignSelf:'center',
    right:50,
    bottom: 100,
    overflow:'hidden',
  },

  login:{
    width:200,
    height: 100,
    backgroundColor:'#A83131',
  }
});
