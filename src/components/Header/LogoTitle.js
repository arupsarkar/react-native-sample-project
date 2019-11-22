import React, {Component} from 'react';
import {Image} from 'react-native'

export default class LogoTitle extends Component{
    render() {
        return (
            <Image
                source={require('../../assets/images/icons8-shop-50.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}
