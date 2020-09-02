import ShopActionsTypes from "./shop.types";

const INITIAL_STATES = {
  collections: null,
};

const shopReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ShopActionsTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
