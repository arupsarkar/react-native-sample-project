import {ADD_TO_CART} from '../constants';

const initialState = {
    items: [],
    addedItems:[],
    total: 0
}

const cartReducer = (state = initialState, action) => {
    console.log('cartReducer state', state);
    console.log('cartReducer action', action);
    let addedItem = action.payload;
    console.log('cartReducer addedItems', addedItem);
    let existed_item= state.addedItems.find(item=> action.payload.id === item.id)
    console.log('cartReducer state.addedItems', state.addedItems);
    console.log('cartReducer existed_item', existed_item);
    switch (action.type) {
        case ADD_TO_CART:

            if(existed_item) {
                console.log('Existed item added to cart');
                addedItem.quantity += 1;
                return{
                    ...state,
                    total: state.total + addedItem.price
                }
            }else {
                console.log('New item added to cart');
                addedItem.quantity = 1;
                //calculating the total
                let newTotal = state.total + addedItem.price;
                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal
                }
            }
        default:
            return state;
    }
}

export default cartReducer;
