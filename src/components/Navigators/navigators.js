import React, {Component} from 'react'
import {View, Text} from 'react-native'


import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {compose} from 'redux';
import SignIn from '../Auth/SignIn';
import Home from '../Home/home';
import Details from '../Details';
import Cart from '../Cart/cart';
import AuthLoading from '../Auth/AuthLoading';

export const AuthStack = createStackNavigator({
    SignIn: SignIn
})

export const HomeStack = createStackNavigator({
    Home: Home,
    Details: Details,
});

export const CartStack = createStackNavigator({
    Cart: Cart,
    Details: Details,
});

export const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Cart: CartStack
});

export  const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: TabNavigator,
    Auth: AuthStack
},{
    initialRouteName: 'AuthLoading'
})


export const customAppContainer = createAppContainer(SwitchNavigator);
