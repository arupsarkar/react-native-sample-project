import {createStore, combineReducers} from 'redux';
import placeReducer from '../reducers/PlaceReducer';
import countReducer from '../reducers/CountReducer';
import productReducer from '../reducers/ProductReducer';
import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
  places: placeReducer,
  count: countReducer,
  products: productReducer,
  cartItems: cartReducer
});
const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
