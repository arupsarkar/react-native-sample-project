import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'

export default class About extends Component {

    static navigationOptions = {
            title : 'About',
            headerStyle: {
                backgroundColor: '#2196f3',
                shadowColor: 'transparent',
                elevation: 0
            },
            headerTitle: 'About'
    };


    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }

    onPress = () => {
        this.setState({
            count: this.state.count+1
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={this.onPress}
                    >
                        <Text> About </Text>
                    </TouchableOpacity>

                </View>


                <View style={[styles.countContainer]}>
                    <Text style={[styles.countText]}>
                        { this.state.count !== 0 ? this.state.count: null}
                    </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196f3',
        padding: 10,

    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
})
