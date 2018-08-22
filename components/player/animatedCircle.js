import React from 'react';
import {Animated, Easing, Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {COLOR, ThemeProvider} from 'react-native-material-ui';
import {ActionButton} from 'react-native-material-ui';
import {Subheader} from 'react-native-material-ui';
import {BottomNavigation} from 'react-native-material-ui';
import Mountain from './assets/images/mountain.jpeg'
import Sound from 'react-native-sound'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            bounceCircle: new Animated.Value(0),  // Initial value for opacity: 0
        }
    }

    // Method which triggers play action
    playSound() {
        var sound = new Sound('white-noise.mp3', Sound.MAIN_BUNDLE, (error) => {
            console.log(error)
        });

        if (!this.state.playing) {
            setTimeout(() => {
                sound.play((success) => {
                    console.log(success);
                });
            }, 100);
            this.state.playing = true;
            this.spin()
        } else {
            sound.stop((success) => {
                console.log('stopped')
            });
            this.state.playing = false;
        }
    }

    spin () {
        this.state.bounceCircle.setValue(0)
        Animated.timing(
            this.state.bounceCircle,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    render() {
        const bounce = this.state.bounceCircle.interpolate({
            inputRange: [0, 1],
            outputRange: [0.25, 0.75]
        })
        return (
            <Animated.View
                style={{
                    width: 110,
                    height: 110,
                    borderRadius: 100,
                    opacity: 0.3,
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: 3,
                    position:'absolute',
                    transform: [{scaleX: bounce}, {scaleY:bounce}] }}
            >
            </Animated.View>
        );
    }
}

