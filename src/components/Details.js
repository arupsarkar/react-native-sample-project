import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

export default class Details extends Component{
    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View>
                <Text>Details Component</Text>
            </View>
        );
    }
}
