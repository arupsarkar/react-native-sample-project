import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

class ShowCounter extends Component {
    render() {
        let counterValue = this.props.count;
        console.log('counter value : ', counterValue)
            return (
                <View>
                    <Text> Current counter: {counterValue.count} </Text>
                </View>

            );

    }
}

const mapStateToProps = (state)=>{
    return {
        count: state.count
    }
}


export default connect(mapStateToProps)(ShowCounter)
