import {ADD_PLACE} from './Types';

export const addPlace = placename => {
  return {
    type: ADD_PLACE,
    payload: placename,
  };
};
