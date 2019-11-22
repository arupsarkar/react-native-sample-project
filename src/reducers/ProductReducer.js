import {DATA_AVAILABLE} from '../constants';

let initialState = { products: []};

const productReducer = (state = initialState, action) => {
    console.log('productReducer state', state);
    console.log('productReducer action', action);
    switch (action.type) {
        case DATA_AVAILABLE:
            return {
                ...state,
                products:action.payload
            };
        default:
            return state;
    }
}

export default productReducer;
