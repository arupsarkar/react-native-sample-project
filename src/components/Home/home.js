import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {Icon} from 'react-navigation'
import ProductData from '../../utils/ProductData.json';
import {connect} from 'react-redux';
import {getProductData} from '../../actions/productAction';
import {addToCart} from '../../actions/cartAction';
import Cart from '../Cart/cart';
import LogoTitle from '../Header/LogoTitle';
import NavigationService from '../Service/NavigationService';

class Home extends Component {

    static navigationOptions = {
            title : 'Welcome',
            headerStyle: {
                backgroundColor: '#4a6dff',
                shadowColor: 'transparent',
                elevation: 0
            },
            headerTitle: () => <LogoTitle />,
            headerTintColor:'blue',
            headerRight: () => (
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () =>
                    {
                        await AsyncStorage.clear();
                        NavigationService.navigate('SignIn', {userName: 'Lucy'})
                    }
                    } >
                    <Text
                        style={{
                            fontSize: 10,
                        }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            ),
    };



    constructor(props) {
        super(props);
        console.log('Home Component - Start');


        this.state = {
        };
        this.logOut = this.logOut.bind(this);
        this.renderItem = this.renderItem.bind(this);
        console.log('Home Component - End');
    }

    addItemToShoppingCart = (item) => {
        console.log('Item added to shopping cart, Id ', item);
        this.props.addToCart(item);
    }

    componentDidMount(): void {
        console.log('Home componentDidMount - Start');
        this.props.getProductData();
        console.log('Home componentDidMount - End');
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let products = this.props.items;
        let take = this.logOut();
        return (
            <View>
                <FlatList
                    ref='listRef'
                    data={products}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
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
                <Button title="Add To Cart" onPress={() => this.addItemToShoppingCart(item)} />
            </View>
        )
    };

    logOut() {
        console.log('Logging out', 'Log out pressed from header button');
    }
}


const mapStateToProps = (state)=>{
    console.log('Home: mapStateToProps state', state);
    return {
        items: state.products.products
    }
}

const mapDispatchToProps = dispatch => {
    console.log('Home: mapDispatchToProps dispatch');
    return {
        getProductData: () => {
            dispatch(getProductData());
        },
        addToCart: (item) => {
            dispatch(addToCart(item));
        }
    }
};

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

        backgroundColor: '#DDDDDD',
        paddingRight: 10,
        padding: 10,
        marginRight: 10
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Home)
