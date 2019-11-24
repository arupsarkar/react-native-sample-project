import React, {Component} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';


import { withNavigation, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import SignIn from '../Auth/SignIn';
import Home from '../Home/home';
import Details from '../Details';
import Cart from '../Cart/cart';
import AuthLoading from '../Auth/AuthLoading';
import About from '../About/About';

class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        console.log('navigation props toggleDrawer(): ', this.props.navigation);
    };
    render() {
        console.log('navigation props render(): ', this.props.navigation);
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require('../../assets/images/drawer-icon.png')}
                        style={{ width: 25, height: 25, marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


const FirstActivity_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => ({

            title: 'About',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
        }),
    },
});


export const DrawerNavigator = createDrawerNavigator({
    About: {
        screen: FirstActivity_StackNavigator,
    }
});

export const AuthStack = createStackNavigator({
    SignIn: SignIn
})

export const HomeStack = createStackNavigator(
    {
        Home: Home,
        Details: Details,
    }
);

export const CartStack = createStackNavigator({
    Cart: Cart,
    Details: Details,
});

export const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Cart: CartStack,
});



export  const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: TabNavigator,
    Auth: AuthStack
},{
    initialRouteName: 'AuthLoading'
})


export const customAppContainer = createAppContainer(SwitchNavigator);
// export const customAppContainer = createAppContainer(DrawerNavigator);
