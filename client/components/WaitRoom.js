import React, {Component} from "react";
import { StyleSheet, TextInput, Text, View} from 'react-native';
import io from "socket.io-client";


export default class WaitRoom extends Component {

    constructor(props){
      super(props);
      this.state ={
        chatMessage:"",
        chatMessages:[]
      }
        
    }

    componentDidMount(){
        this.socket = io("https://tap4tap.herokuapp.com/");
        this.socket.on("chat message" ,msg =>{
          this.setState({chatMessages: [...this.state.chatMessages, msg]});
        })
    }

    submitChatMessage(){
      this.socket.emit("chat message", this.state.chatMessage);
      this.setState({ chatMessage: "" });
    }

    render(){
      const chatMessages= this.state.chatMessages.map(chatMessage =>(
        <Text key={chatMessage}>{chatMessage}</Text>
      ));
        return(
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, borderWidth: 2, color:'white'}}
                    autoCorrect={false}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText = {chatMessage => {
                        this.setState({chatMessage});
                    }}
                    />
                    {chatMessages}
            </View>
        )
    }
}

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
      backgroundColor: '#A83131',
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
