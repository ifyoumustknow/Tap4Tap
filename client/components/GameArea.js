import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from './Constants';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import Bird from './Bird';
import Player from './Player';
import Opponent from './Opponent';
import Physics from './Physics';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




export default class App extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      losing: true,
      winning: true,
      //needs attention
      start: true,
      player_score: 0,
      oppo_score: 0,
      oppo_name: '',
      play_name: '',
      scoreboard: false,
    };

    this.gameEngine = null;
    this.entities = this.setupWorld();
    }

   
  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;

    world.gravity.y = 0.0;

    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2.8,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT,
    );

    let player = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT + hp("46%"),
      Constants.MAX_WIDTH,
      10,
      {isStatic: true},
    );

    let opponent = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 1550,
      Constants.MAX_WIDTH,
      10,
      {isStatic: true},
    );

    //needs attention
    Matter.World.add(world, [bird, opponent, player]);
    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs= event.pairs;
      console.log(bird.position)
      if (bird.position.y < Constants.MAX_HEIGHT / 2){
        this.gameEngine.dispatch({type: 'game-over'});
        world.gravity.y = 0.0;
      }else{
        this.gameEngine.dispatch({type: 'win'});
              world.gravity.y = 0.0;
      }
    });


    return {
      physics: {engine: engine, world: world},
      bird: {body: bird, pose: 1, renderer: Bird},
      player: {body: player, renderer: Player},
      opponent: {body: opponent, renderer: Opponent},
    };
  };


  // needs attention!!!!!//
  onEvent = e => {
    console.log(e.type)
    if (e.type === 'game-over') {
      this.setState({
        losing: true,
        winning: false,
        start: false,
        scoreboard: true,
        oppo_score: this.state.oppo_score + 1,
      });
    } else if (e.type === 'win') {
      this.setState({
        losing: false,
        winning: true,
        start: false,
        scoreboard: true,
        player_score: this.state.player_score + 1,
      });
    }
  };

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      start: false,
      losing: false,
      winning: false,
      scoreboard:false,
    });
  };

  render() {
    return (
      <View style={styles.floor_container}>
         <View style={styles.header_container}>
          <View style={styles.scores_left_container} />
          <Text style={styles.score_left}>{this.state.player_score}</Text>
          <Text style={styles.score_right}>{this.state.oppo_score}</Text>
          <Text style={styles.timer}>90</Text>
          <View style={styles.timer_container} />
          <View style={styles.scores_right_container} />
          <View style={styles.score_background} />
          <View style={styles.team_container_top} />
        </View>
        <View style={styles.bird_cage}>
          <GameEngine
            ref={ref => {
              this.gameEngine = ref;
            }}
            style={styles.gameContainer}
            systems={[Physics]}
            losing={this.state.losing}
            winning={this.state.winning}
            start={this.state.start}
            onEvent={this.onEvent}
            entities={this.entities}>
            <StatusBar hidden={true} />
          </GameEngine>
          {this.state.scoreboard && this.state.losing && (
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={this.reset}>
              <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>GAME OVER</Text>
                <Text style={styles.gameOverSubText}>Try Again</Text>
              </View>
            </TouchableOpacity>
          )}
          {this.state.scoreboard && this.state.winning && (
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={this.reset}>
              <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>YOU WIN</Text>
                <Text style={styles.gameOverSubText}>Try Again</Text>
              </View>
            </TouchableOpacity>
          )}
          {this.state.start && (
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={this.reset}>
              <View style={styles.fullScreen}>
                <Text style={styles.gameStartText}>TAP 2 START</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.timer}>90</Text>
        <Text style={styles.team_text_left}>P1</Text>
        <Text style={styles.team_text_right}>P2</Text>
        <Text style={styles.team_container_text}>P2</Text>
      
        <View style={styles.bird_spot} />
        <View style={styles.stroke_bottom} />
        <View style={styles.stroke_top} />
        <View style={styles.team_container_bottom} />
        <Text style={styles.team_container_text_bot}>P1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bird_spot: {
    position: 'relative',
    bottom: hp("44%"),
    alignSelf: 'center',
    width: 100,
    height: 100,
    right: 3,
    borderWidth: 8,
    borderRadius: 100,
    paddingBottom: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderColor: '#250A26',
  },

 
  stroke_bottom: {
    position: 'relative',
    borderColor: 'rgba(255, 255, 255, .5)',
    borderStyle: 'dotted',
    borderWidth: 3,
    bottom: hp("24%"),
    width: 250,
    alignSelf: 'center',
    zIndex: 0,
  },

  stroke_top: {
    position: 'relative',
    borderColor: 'rgba(255, 255, 255, .5)',
    borderStyle: 'dotted',
    borderWidth: 3,
    bottom: hp("75%"),
    width: 250,
    alignSelf: 'center',
    zIndex: 2,
  },

  bird_cage: {    
    position:'relative',
    zIndex: 5,
    top:hp("2%"),
    height:hp("75%"),
  },

  team_container_text: {
    position: 'absolute',
    top: hp(8),
    left: wp(47),
    fontSize: 20,
    color: 'white',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  team_text_left: {
    position:'absolute',
    color: 'black',
    alignContent:'center',
    top: hp(2),
    left: wp("30%"),
    fontSize: 23,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Medium',
  },

  team_text_right: {
    position:'absolute',
    color: 'black',
    alignContent: 'center',
    top: hp(2),
    right: wp(30),
    fontSize: 23,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Medium',
  },

  header_container: {
    alignItems:'flex-start',
    flexDirection: 'row',
    justifyContent:'space-between',
    zIndex: 8888,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.1,
    elevation: 13,
  },

  timer_container: {
    width: 65,
    height: 65,
    borderWidth: 8,
    borderRadius: 100,
    zIndex: 99,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderColor: '#250A26',
  },

  timer: {
    position:'absolute',
    color: 'black',
    fontSize: 35,
    top:10,
    left:wp("45.6%"),
    textAlign: 'center',
    zIndex: 999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

   floor_container: {
    height: hp("93%"),
    paddingBottom: 100,
    backgroundColor: '#A83131',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',

    flexDirection:'column',
  },

  score_background: {
    position: 'absolute',
    width: wp("100%"),
    height: 60,
    backgroundColor: '#FFB100',
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderBottomColor: '#250A26',
    borderTopColor: '#250A26',
    zIndex: 2,
  },


  scores_left_container: {
    height: 88,
    width: 88,
    backgroundColor: '#250A26',
    zIndex: 99,
    borderBottomRightRadius: 80,
    overflow: 'hidden',
  },

  score_left: {
    position:"absolute",
    color: 'white',
    top: 5,
    left:wp("6%"),
    fontSize: 44,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  scores_right_container: {
    height: 88,
    width: 88,
    backgroundColor: '#250A26',
    zIndex: 1,
    borderBottomLeftRadius: 80,
    zIndex: 99,
    overflow: 'hidden',
  },

  score_right: {
    position:"absolute",
    color: 'white',
    top: 5,
    left:wp("88%"),
    fontSize: 44,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  team_container_top: {
    position:'absolute',
    alignSelf:'center',
    top:hp("1%"),
    right:hp("17.6%"),
    width: 100,
    height: 100,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#250A26',
    zIndex: 0,
    overflow:'hidden',
  },


  center_bird: {
    alignSelf: 'center',
    zIndex: 999,
  },


  
  fullScreen: {
    position: 'absolute',
    flex:1,
    top: 150,
    left: 0,
    right: 0,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',

  },

  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 10,

  },

  gameStartText: {
    position: 'relative',
    color: 'white',
    top: 20,
    fontSize: 55,
    zIndex: 99,
    fontFamily: 'FiraSansExtraCondensed-Bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 2,
  },

  gameOverText: {
    position: 'relative',
    color: 'white',
    top: 0,
    fontSize: 48,
    zIndex: 99,
    fontFamily: 'FiraSansExtraCondensed-Bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 2,
  },

  gameOverSubText: {
    color: 'white',
    top: 0,
    fontSize: 24,
    zIndex: 99,
    fontFamily: 'FiraSansExtraCondensed-Bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 2,
  },

 
 


  
 


  team_container_text_bot: {
    position: 'absolute',
    bottom: hp("2%"),
    alignSelf: 'center',
    fontSize: 40,
    color: 'white',
    zIndex: 999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  team_container_bottom: {
    position:'absolute',
    alignSelf:'center',
    position:'relative',
    bottom:hp("14%"),
    width: 180,
    height: 220,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    backgroundColor: '#250A26',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.1,
    elevation: 13,
  },

  


});
