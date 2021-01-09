import { FETCH_FOODS} from "../types";
import { FILTER_FOODS_BY_TYPES, ORDER_FOODS_BY_PRICE } from "../types";


export const fetchfoods = () => async (dispatch) => {
  const res = await fetch("/api/foods");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_FOODS,
    payload: data,
  });
};

export const filterFoods = (foods, type) => (dispatch) => {
  dispatch({
    type: FILTER_FOODS_BY_TYPES,
    payload: {
      type: type,
      items:
        type === ""
          ? foods
          : foods.filter((x) => x.availabletypes.indexOf(type) >= 0),
    },
  });
};
export const sortFoods = (filteredfoods, sort) => (dispatch) => {
  const sortedfoods = filteredfoods.slice();
 sortedfoods.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
   dispatch({
    type: ORDER_FOODS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedfoods,
    },
  });
}