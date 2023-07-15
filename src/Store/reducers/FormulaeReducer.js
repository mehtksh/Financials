import { FORMULAE } from "../actions/constants";

let initialState = {
  tags: [],
  suggestions: [],
  selectedGroup: undefined,
  selectedGroupIndex: undefined,
  isReadOnly: true,
};

let FormulaeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FORMULAE.FORMULAE_SET_STATE: {
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
};

export default FormulaeReducer;
