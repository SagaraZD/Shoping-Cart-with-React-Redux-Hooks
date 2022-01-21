export const ADD_TO_CART = "ADD_TO_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (data) => ({
  type: ADD_TO_CART,
  data,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

const initialState = {
  cart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.data],
      };

    case CLEAR_CART:
      return {
        cart: [],
      };

    default:
      return state;
  }
};
