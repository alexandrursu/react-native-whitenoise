import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { constants } from '../../helpers/const';
import { Icon } from 'react-native-elements';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={styles.containerTransparent}>
        <ScrollView>
          <View style={styles.infoPlaceholder}>
            <View style={styles.iconPlaceholder}>
              <View>
                <Icon name="wifi" type="FontAwesome5" iconStyle={styles.iconSignal} underlayColor={'rgba(0,0,0,0)'} />
                <Icon
                  name="baby-buggy"
                  type="material-community"
                  iconStyle={styles.icon}
                  underlayColor={'rgba(0,0,0,0)'}
                />
              </View>
              <View>
                <Icon
                  name="wifi"
                  type="FontAwesome5"
                  iconStyle={styles.iconSignalActive}
                  underlayColor={'rgba(0,0,0,0)'}
                />
                <Icon
                  name="baby-buggy"
                  type="material-community"
                  iconStyle={styles.iconActive}
                  underlayColor={'rgba(0,0,0,0)'}
                />
              </View>
            </View>
            <Text style={styles.textStyle}>
              When active it will listen in background for 'baby cry', eventually for noise, and will automatically
              start playing your favorite song. Let's try it!
            </Text>
          </View>
          <View style={styles.infoPlaceholder}>
            <View style={styles.iconPlaceholder}>
              <Icon name="stopwatch" type="entypo" iconStyle={styles.icon} underlayColor={'rgba(0,0,0,0)'} />
              <Icon name="stopwatch" type="entypo" iconStyle={styles.iconActive} underlayColor={'rgba(0,0,0,0)'} />
            </View>
            <Text style={styles.textStyle}>
              If active it will trigger stop playing the sound in after selected interval of time.
            </Text>
          </View>
          <View style={styles.infoPlaceholder}>
            <View style={styles.iconPlaceholder}>
              <Icon name="playlist-play" type="material" iconStyle={styles.icon} underlayColor={'rgba(0,0,0,0)'} />
              <Icon
                name="playlist-play"
                type="material"
                iconStyle={styles.iconActive}
                underlayColor={'rgba(0,0,0,0)'}
              />
            </View>
            <Text style={styles.textStyle}>
              If active on application start it will automatically start playing your favorite song.
            </Text>
          </View>
          <View style={styles.infoPlaceholder}>
            <View style={styles.iconPlaceholder}>
              <Icon name="md-infinite" type="ionicon" iconStyle={styles.icon} underlayColor={'rgba(0,0,0,0)'} />
              <Icon name="md-infinite" type="ionicon" iconStyle={styles.iconActive} underlayColor={'rgba(0,0,0,0)'} />
            </View>

            <Text style={styles.textStyle}>
              This feature activates infinite playing, sound will play until you stop it mannually or application is
              closed.
            </Text>
          </View>
          <View style={styles.infoPlaceholder}>
            <View style={styles.iconPlaceholder}>
              <Icon name="heart" type="evilicon" iconStyle={styles.icon} underlayColor={'rgba(0,0,0,0)'} />
              <Icon name="heart" type="evilicon" iconStyle={styles.iconActive} underlayColor={'rgba(0,0,0,0)'} />
            </View>

            <Text style={styles.textStyle}>
              When pressed selected song will be set as your favorite song. Thiss will be default song when application
              is launched.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'rgba(0,0,0,0)',
    borderBottomColor: '#fff',
    borderWidth: 0.5,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    color: '#fff'
  },
  icon: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 5
  },
  iconActive: {
    color: constants.mainColor,
    fontSize: 28,
    marginBottom: 5,
    marginLeft: 10
  },
  iconSignal: {
    fontSize: 11,
    height: 11,
    position: 'absolute',
    top: 0,
    left: 4,
    transform: [{ rotate: '-45deg' }],
    color: 'rgba(255,255,255,0.7)'
  },
  iconSignalActive: {
    fontSize: 11,
    height: 11,
    position: 'absolute',
    top: 0,
    left: 14,
    transform: [{ rotate: '-45deg' }],
    color: 'rgba(255,255,255,0.7)'
  },
  textStyle: {
    color: '#fff',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
    // textAlign: "justify"
  },
  containerWhite: {
    display: 'flex',
    flex: 1,
    width: '84%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'flex-start'
  },
  containerTransparent: {
    display: 'flex',
    flex: 1,
    width: '84%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0)',
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  infoPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 5,
    padding: 15
  },
  iconPlaceholder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});
