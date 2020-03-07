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
      Constants.MAX_HEIGHT / 2.6,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT,
    );

    let player = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT + 460,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );

    let opponent = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 1560,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );

    //needs attention
    Matter.World.add(world, [bird, opponent]);
    Matter.Events.on(engine, 'collisionStart', event => {
      var bird = event.opponent;
      this.gameEngine.dispatch({type: 'game-over'});
      world.gravity.y = 0.0;
    });

    Matter.World.add(world, [bird, player]);
    Matter.Events.on(engine, 'collisionStart', event => {
      var bird = event.player;
      this.gameEngine.dispatch({type: 'win'});
      world.gravity.y = 0.0;
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
    if (e.type === 'game-over') {
      //Alert.alert("GAME OVER");
      this.setState({
        losing: true,
        winning: false,
        start: true,
        oppo_score: this.state.oppo_score + 1,
      });
    } else if (e.type === 'win') {
      this.setState({
        losing: true,
        winning: false,
        start: false,
        player_score: this.state.player_score + 1,
      });
    }
  };

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      start: false,
      losing: true,
      winning: true,
    });
  };

  
  render() {
    return (
      <View style={styles.floor_container}>
        <Text style={styles.score_left}>{this.state.player_score}</Text>
        <Text style={styles.score_right}>{this.state.oppo_score}</Text>
        <Text style={styles.timer}>90</Text>
        <Text style={styles.team_text_left}>P1</Text>
        <Text style={styles.team_text_right}>P2</Text>
        <Text style={styles.team_container_text}>P2</Text>
        <View style={styles.header_container}>
          <View style={styles.scores_left_container} />
          <View style={styles.team_container_top} />
          <View style={styles.timer_container} />
          <View style={styles.scores_right_container} />
          <View style={styles.score_background} />
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
          {!this.state.losing && (
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={this.reset}>
              <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>GAME OVER</Text>
                <Text style={styles.gameOverSubText}>Try Again</Text>
              </View>
            </TouchableOpacity>
          )}
          {!this.state.winning && (
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
  fullScreen: {
    position: 'absolute',
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

  floor_container: {
    height: 840,
    backgroundColor: '#A83131',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },

  header_container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 8888,
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.1,
    elevation: 13,
  },

  bird_cage: {
    position: 'relative',
    zIndex: 5,
    height: 670,
    bottom: 160,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  center_bird: {
    position: 'relative',
    alignSelf: 'center',
    zIndex: 2,
  },

  bird_spot: {
    position: 'relative',
    bottom: 550,
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

  score_background: {
    position: 'absolute',
    width: 400,
    height: 60,
    backgroundColor: '#FFB100',
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderBottomColor: '#250A26',
    borderTopColor: '#250A26',
    justifyContent: 'center',
    paddingTop: 20,
  },

  timer_container: {
    position: 'relative',
    right: 17,
    width: 65,
    height: 65,
    borderWidth: 8,
    borderRadius: 100,
    paddingBottom: 10,
    zIndex: 7,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderColor: '#250A26',
  },

  timer: {
    position: 'relative',
    alignContent:'center',
    color: 'black',
    fontSize: 35,
    bottom: 95,
    right: 3,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  scores_left_container: {
    position: 'relative',
    height: 88,
    width: 88,
    backgroundColor: '#250A26',
    zIndex: 1,
    borderBottomRightRadius: 80,
    overflow: 'hidden',
  },

  score_left: {
    position: 'relative',
    color: 'white',
    top: 5,
    right: 170,
    fontSize: 44,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  team_text_left: {
    position: 'relative',
    color: 'black',
    paddingTop: 16,
    alignContent:'center',
    right: 75,
    bottom: 146,
    fontSize: 23,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Medium',
  },

  team_text_right: {
    position: 'relative',
    color: 'black',
    paddingTop: 16,
    alignContent: 'center',
    left: 75,
    bottom: 190,
    fontSize: 23,
    textAlign: 'center',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Medium',
  },

  scores_right_container: {
    position: 'relative',
    height: 88,
    width: 88,
    backgroundColor: '#250A26',
    zIndex: 1,
    left: 74,
    borderBottomLeftRadius: 80,
    overflow: 'hidden',
  },

  score_right: {
    color: 'white',
    bottom: 50,
    alignContent: 'center',
    left: 370,
    fontSize: 44,
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  team_container_top: {
    position: 'relative',
    top: 10,
    left: 65,
    width: 100,
    height: 100,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#250A26',
    zIndex: 0,
  },

  team_container_text: {
    position: 'relative',
    bottom: 165,
    left: 188,
    fontSize: 20,
    color: 'white',
    zIndex: 9999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },
  team_container_text_bot: {
    position: 'relative',
    bottom: 480,
    alignSelf: 'center',
    fontSize: 40,
    color: 'white',
    zIndex: 999,
    fontFamily: 'FiraSansExtraCondensed-Bold',
  },

  team_container_bottom: {
    position: 'relative',
    bottom: 280,
    left: 118,
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

  stroke_bottom: {
    position: 'relative',
    borderColor: 'rgba(255, 255, 255, .5)',
    borderStyle: 'dotted',
    borderWidth: 3,
    bottom: 355,
    width: 250,
    alignSelf: 'center',
    zIndex: 0,
  },

  stroke_top: {
    position: 'relative',
    borderColor: 'rgba(255, 255, 255, .5)',
    borderStyle: 'dotted',
    borderWidth: 3,
    bottom: 840,
    width: 250,
    alignSelf: 'center',
    zIndex: 0,
  },
});
