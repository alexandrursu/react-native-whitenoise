import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import { constants } from '../../helpers/const';
import { debounce } from 'lodash';

export default class SettingsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopTimerValue: this.props.item.duration
    };
    this.setSliderValue = debounce(this.debounceUpdate, 20);
  }

  debounceUpdate(value) {
    this.setState({ stopTimerValue: value });
    this.props.storeSliderSettings(this.state.stopTimerValue);
  }

  render() {
    return (
      <View style={styles.placeholder}>
        <TouchableOpacity style={styles.touch} onPress={(data) => this.props.storeSettings(this.props.setting)}>
          <View style={styles.layerTop}>
            {this.props.setting === 'smartFeature' ? (
              <Icon name="wifi" type="FontAwesome5" iconStyle={styles.iconSignal} />
            ) : (
              <Text />
            )}
            <Icon name={this.props.iconName} type={this.props.type} color="#fff" iconStyle={styles.icon} />
          </View>
          <View style={styles.layerMiddle}>
            <Text style={styles.errorText}>{this.props.name}</Text>
          </View>
          <View style={styles.layerBottom}>
            <Text
              style={{
                color: this.props.value ? constants.mainColor : '#fff',
                fontWeight: this.props.value ? '900' : '500'
              }}
            >
              {this.props.setting === 'autoStop' && this.props.value && this.props.showSlider
                ? this.props.value
                  ? `${Math.floor(this.state.stopTimerValue)} min`
                  : 'Off'
                : this.props.value
                ? 'On'
                : 'Off'}
            </Text>
          </View>
        </TouchableOpacity>
        {this.props.setting === 'autoStop' && this.props.value && this.props.showSlider ? (
          <View style={styles.slider}>
            <Slider
              minimumValue={3}
              maximumValue={60}
              minimumTrackTintColor={constants.mainColor}
              thumbStyle={{ top: 2 }}
              thumbTintColor={constants.mainColor}
              value={this.state.stopTimerValue}
              onSlidingComplete={(value) => this.setSliderValue(value)}
              style={styles.slider}
              step={1}
            />
          </View>
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',

    margin: '5%',
    width: '40%',
    height: 150,
    position: 'relative'
  },
  //Clone of placeholder but handles real touch
  touch: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  slider: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%'
  },
  icon: {
    fontSize: 40,
    width: '100%',
    marginTop: 10
  },

  textStyle: {},
  layerTop: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60
  },
  layerMiddle: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60
  },
  errorText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  layerBottom: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 20
  },
  iconSignal: {
    fontSize: 15,
    height: 15,
    position: 'absolute',
    top: 13,
    right: -2,
    transform: [{ rotate: '-45deg' }],
    color: 'rgba(255,255,255,0.7)'
  }
});
