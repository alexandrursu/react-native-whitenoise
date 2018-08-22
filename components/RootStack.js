const RootStack = createStackNavigator({
  Home: {
    screen: App
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
