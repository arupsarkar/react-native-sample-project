import {DATA_AVAILABLE} from '../constants';
import ProductData from '../utils/ProductData.json';

export function getProductData() {

    console.log('getProductData action: ', ProductData.items);
    return {
        type: DATA_AVAILABLE,
        payload: ProductData.items
    }

}
