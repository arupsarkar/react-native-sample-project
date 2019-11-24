import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
import NavigationService from '../Service/NavigationService';

export default class SignIn extends Component{
    static navigationOptions = {
        title: 'Please sign in',
    };



    constructor(props) {
        super(props);
        console.log('Google Sign In: ', 'Start');
        this.state = {
            userInfo: null,
            gettingLoginStatus: true,
        };
        console.log('Google Sign In: ', 'End');
    }

    componentDidMount(): void {

        //initial configuration
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: '33552534287-56mhcchgo4b5cjbolu1b6143frpvkkcs.apps.googleusercontent.com',
        });
        //Check if user is already signed in
        this._isSignedIn();

        // this.setState({"userName": ""});
        let navigationParams = this.props.navigation.state;
        console.log('Sign In root params: ', navigationParams);
        if (navigationParams.key != null) {
            this._signOut();
            // console.log('Sign In route name: ', navigationParams.routeName);
            // console.log('Sign In route key: ', navigationParams.key);
            // console.log('Sign In route params: ', navigationParams.params);
            // //check for userName attribute from Logout event
            // if(navigationParams.params) {
            //
            //     const userId = navigationParams.params.userName;
            //     console.log('Sign In route params userId: ', userId);
            //     this.setState({"userName": userId});
            //
            // }
        }

    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            //Get the User details as user is already signed in
            // this._getCurrentUserInfo();
            this.props.navigation.navigate('App');
        } else {
            //alert("Please Login");
            console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('User Info _getCurrentUserInfo() --> ', userInfo);
            this.setState({ userInfo: userInfo });
            if (this.state.userInfo != null) {
                Console.log('Navigating to main app - Start');
                this.props.navigation.navigate('App');
                Console.log('Navigating to main app - End');
            }

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Something went wrong. Unable to get user's info");
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info _signIn() --> ', userInfo);
            this.props.navigation.navigate('App');
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };
    _signOut = async () => {
        //Remove user session from the device.
        try {
            console.log('Sign out : ', 'Started');
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userInfo: null }); // Remove the user from your app's state as well
            console.log('Sign out : ', 'End');
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        if (this.state.gettingLoginStatus) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }else {
            if (this.state.userInfo != null) {
                NavigationService.navigate('Home', {'app': 'Navigate to main app'});
                // //Showing the User detail
                // return (
                //     <View style={styles.container}>
                //         <Image
                //             source={{ uri: this.state.userInfo.user.photo }}
                //             style={styles.imageStyle}
                //         />
                //         <Text style={styles.text}>
                //             Name: {this.state.userInfo.user.name}{' '}
                //         </Text>
                //         <Text style={styles.text}>
                //             Email: {this.state.userInfo.user.email}
                //         </Text>
                //         <TouchableOpacity style={styles.button} onPress={this._signOut}>
                //             <Text>Logout</Text>
                //         </TouchableOpacity>
                //     </View>
                // );
            }else {
                return (
                    <View style={styles.container}>
                        <GoogleSigninButton
                            style={{ width: 312, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this._signIn}
                        />
                    </View>
                );
            }
        }
    }
    // _signInAsync = async () => {
    //     await AsyncStorage.setItem('userToken', 'abc');
    //     this.props.navigation.navigate('App');
    // };
}



const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 30,
    },
});
