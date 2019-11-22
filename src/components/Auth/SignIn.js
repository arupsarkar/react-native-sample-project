import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Button,
    Text,
    TouchableOpacity
} from 'react-native';

export default class SignIn extends Component{
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor(props) {
        super(props)
        console.log('Sign In constructor - Start');
        this.state = {
            userName: ''
        }
        console.log('Sign In constructor - End')
    }

    componentDidMount(): void {
        this.setState({"userName": ""});
        let navigationParams = this.props.navigation.state;
        console.log('Sign In root params: ', navigationParams);
        if (navigationParams.key != null) {
            console.log('Sign In route name: ', navigationParams.routeName);
            console.log('Sign In route key: ', navigationParams.key);
            console.log('Sign In route params: ', navigationParams.params);
            //check for userName attribute from Logout event
            if(navigationParams.params) {

                const userId = navigationParams.params.userName;
                console.log('Sign In route params userId: ', userId);
                this.setState({"userName": userId});
            }
        }

    }

    render() {

        return (
            <View>
                <Text style={styles.row}>Welcome back {this.state.userName} !!!</Text>
                <TouchableOpacity style={styles.button}
                    title="Sign in!"
                    onPress={this._signInAsync}>
                    <Text> Sign In </Text>

                </TouchableOpacity>
                {/*<Button title="Sign in!" onPress={this._signInAsync} />*/}

            </View>
        );
    }
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}



const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title:{
        fontSize: 15,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        fontSize: 14,
    },
    button: {

        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});
