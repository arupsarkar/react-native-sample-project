/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import NavigationService from './src/components/Service/NavigationService';
import {customAppContainer} from './src/components/Navigators/navigators'

const AppContainer = customAppContainer;


export default class App extends Component {
  render() {
    return (
        <AppContainer
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
        />
    );
  }
}

