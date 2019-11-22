import React, {Component} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {changeCount} from '../actions/counts';

class Counter extends Component {

    state = {
        count: 0,
    };
    decrementCount() {
        console.log('before decrement', this.state.count);
        this.state.count--;
        this.props.counterMeter(this.state.count);
        console.log('after decrement', this.state.count);
    }
    incrementCount() {
        console.log('before increment', this.state.count);
        this.state.count++;
        this.props.counterMeter(this.state.count);
        console.log('after increment', this.state.count);
    }


    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <View styles={styles.container}>
                <Button title="Increment" onPress={() => this.incrementCount()}/>
                <Text>{this.state.count}</Text>
                <Button title="Decrement" onPress={() => this.decrementCount()}/>
            </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});


const mapStateToProps = state => ({
    count: state.count,
});


const mapDispatchToProps = dispatch => {
    console.log('mapDispatchToProps', 'from component');
  return {
    counterMeter: count => {
      dispatch(changeCount(count));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

