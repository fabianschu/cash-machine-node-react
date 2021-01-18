import { EXPAND_ACCORDION, FOLD_ACCORDION } from "../types";

const initialState = {
  accordionExpanded: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPAND_ACCORDION:
      return {
        ...state,
        accordionExpanded: true,
      };
    case FOLD_ACCORDION:
      return {
        ...state,
        accordionExpanded: false,
      };
    default:
      return state;
  }
};
