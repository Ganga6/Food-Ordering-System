import {
  FETCH_FOODS,
  FILTER_FOODS_BY_TYPES,
  ORDER_FOODS_BY_PRICE,
} from "../types";

export const foodsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FOODS:
      return { items: action.payload ,filteredItems:action.payload };
    default:
      return state;

      
    case FILTER_FOODS_BY_TYPES:
      return {
        ...state,
        type: action.payload.type,
        filteredItems: action.payload.items,
      };
    case ORDER_FOODS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    
  }
};