import React, {Component} from 'react';
import {
    View,
    Text, StyleSheet, Button, FlatList, TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import LogoTitle from '../Header/LogoTitle';

class Cart extends Component{


    static navigationOptions = {
        title : 'Cart',
        headerStyle: {
            backgroundColor: '#4a6dff',
            shadowColor: 'transparent',
            elevation: 0
        },
        headerTitle: () => <LogoTitle />,
        headerTintColor:'blue',
    };


    constructor(props) {
        super(props);
        console.log('Cart Component - Start');


        this.state = {
        };

        this.renderItem = this.renderItem.bind(this);
        console.log('Cart Component - End');
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let cartItems = this.props.items.addedItems;
        let total = this.props.items.total;
        console.log('Cart Componnent Items : ', cartItems);
        console.log('Cart Componnent total : ', total);
        return (




            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    ref='listRef'
                    data={cartItems}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
                    <Text> Total: ${total}</Text>
            </View>
        );
    }
    renderItem({item, index}){
        console.log('renderItem: ', item.title);
        return (
            <View style={styles.row}>
                <Text style={styles.title}>
                    {item.id}{". "}{item.title}
                </Text>
                <Text style={styles.description}>
                    {item.description}
                </Text>
                <Text style={styles.title}>
                    ${item.price}
                </Text>
                <Text style={styles.title}>
                    There are {item.quantity} in your cart.
                </Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        )
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
    }
});


const mapStateToProps = (state)=>{
    console.log('Cart: mapStateToProps items ', state.cartItems);
    return{
        items: state.cartItems
    }
}
export default connect(mapStateToProps)(Cart)
