import { EXPAND_ACCORDION, FOLD_ACCORDION } from "../types";

export const setAccordion = (bool) => {
  return {
    type: bool ? EXPAND_ACCORDION : FOLD_ACCORDION,
  };
};
