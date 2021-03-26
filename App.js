// import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home/home';
import Eventvisitors from './screens/eventvisitors/eventvisitors';
import multipletickets from './screens/multipletickets/multipletickets';
import Createevent from './screens/createevent/createevent';
import AssignEvent from './screens/assignEvent/assignEvent';
import MyEvent from './screens/myevent/myevent';
import Addbanner from './screens/addbanner/addbanner';
import Userticketlimit from './screens/userticketlimit/userticketlimit';
import Notification from './screens/notification/notification';
import Singlenotification from './screens/singlenotification/singlenotification';
import singleNotificationAddress from './screens/singleNotificationAddress/singleNotificationAddress';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DarkTheme as paperDarkTheme,
  DefaultTheme as paperDefaultTheme
} from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { BackdropProvider } from 'react-native-propel-kit'

import { themeSubject } from './shared/themeService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapComponent from './screens/createEventLanguageTabs/map'
import  ScanQr from './screens/scanQr/ScanQr'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

const customDarkTheme = {
  ...NavigationDarkTheme,
  ...paperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...paperDarkTheme.colors
  }
}

const customDefaultTheme = {
  ...NavigationDefaultTheme,
  ...paperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...paperDefaultTheme.colors
  }
}

let themeSubscriber

export default class App extends React.Component {

  constructor(props) {
    super()
    this.state = {
      isDarkTheme: ""
    }
    themeSubscriber = themeSubject.subscribe((val) => {
      this.getTheme()
    })
  }


  async getTheme(){
    let theme =  await AsyncStorage.getItem('theme')
    this.setState({isDarkTheme:theme})
  }

  // componentDidMount() {
  //   themeSubscriber.unsubscribe();

  // }

  render() {
    return (
      <BackdropProvider>
        <PaperProvider theme={this.state.isDarkTheme == "true" ? customDarkTheme : customDefaultTheme}>
          <NavigationContainer theme={this.state.isDarkTheme == "true" ? customDarkTheme : customDefaultTheme}>
            <Drawer.Navigator>

              <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Drawer.Screen name="Banner" component={MyEvent} options={{ headerShown: false }} />
              <Drawer.Screen name="Create Event" component={Createevent} options={{ headerShown: false }} />
              {/* <Drawer.Screen name="Eventvisitors" component={Eventvisitors} options={{ headerShown: false }} /> */}
              {/* <Drawer.Screen name="Multiple Tickets" component={multipletickets} options={{ headerShown: false }} /> */}
              <Drawer.Screen name="Userticket Limit" component={Userticketlimit} options={{ headerShown: false }} />
              <Drawer.Screen name="Add Banner" component={Addbanner} options={{ headerShown: false }} style={{display:'none'}}/>
              <Drawer.Screen name="Assign Event" component={AssignEvent} options={{ headerShown: false }} />
              <Drawer.Screen name="Notification" component={Notification} options={{ headerShown: false }} />

              <Drawer.Screen name="Single Notification Address" component={singleNotificationAddress} options={{ headerShown: false }} />
              <Drawer.Screen name="Single Notification" component={Singlenotification} options={{ headerShown: false }} />
              <Drawer.Screen name="Map" component={MapComponent} options={{ headerShown: false }} />
              {/* <Drawer.Screen name="ScanQr" component={ScanQr} options={{ headerShown: false }} /> */}
            </Drawer.Navigator>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </PaperProvider>
      </BackdropProvider>
    );
  }
}