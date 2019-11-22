import { COUNTER_CHANGE} from '../constants';
export function changeCount(count) {
    console.log('changeCount action: ', count);
    return {
        type: COUNTER_CHANGE,
        payload: count
    }
}
