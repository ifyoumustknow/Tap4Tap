import React, {Component} from "react";
import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import io from "socket.io-client";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
            <KeyboardAvoidingView style={styles.container}>
              <ScrollView>
                <Text style={styles.Title}>PLEASE WAIT...</Text>
                <TextInput
                    style={styles.chatInput}
                    autoCorrect={false}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText = {chatMessage => {
                        this.setState({chatMessage});
                    }}
                    />
                    <View>
                      {chatMessages.map((currentMessage)=>{
                        return <Text style={styles.messages}>{currentMessage}</Text>
                      })}
                    </View>
                  
                    <TouchableOpacity style={styles.StartButton}
              onPress={() => this.props.navigation.navigate('GameArea')}>
              <Text style={styles.StartButtonText}>START GAME</Text>
      </TouchableOpacity>
                    </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingBottom: 35,
    backgroundColor: '#250A26',
  },

  Title: {
    position: 'relative',
    color: 'white',
    top: 0,
    alignSelf:"center",
    fontSize: 32,
    zIndex: 99,
    fontFamily: 'FiraSansExtraCondensed-Bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 2,
    alignSelf:'center',
    marginBottom:20,
    marginTop:20,
  },

  StartButton: {
    position:'absolute',
    alignSelf:'center',
    top:hp("83%"),
    width: 250,
    height: 9,
    paddingTop:25,
    paddingBottom:25,
    backgroundColor:'#A83131',
    borderRadius: 45,
    marginTop: 30,
    shadowColor: '#000',
  },

  StartButtonText: {
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
    fontFamily: 'FiraSansExtraCondensed-Bold',

  },
  messages:{
    flex:1,
    flexDirection:'row',
    color:'white',
    fontSize: 20,
    width:"auto",
    paddingLeft:30,
    height:25,
    marginTop:10,
},

  chatInput:{
    flex:1,
    flexDirection:'column',
    width:wp("90%"),
    height:40,
    borderWidth: 2,
    color:'white',
    borderColor: 'white',
    borderRadius: 20,
    alignSelf:'center',
    paddingLeft:20,
    marginBottom:20,
  },

 

  
});
