import { GROUPS } from "../actions/constants";

let initialState = {
  openGroupsPopUp: false,
  groupList: [],
  lineItems: [],
  selectedLineItems: [],
  hideLineItemTab: false,
  allLineItems: [],
  isGroupNameDuplicate: false,
  activeTab: "",
};

let GroupsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS.CREATE_GROUPS: {
      return Object.assign({}, state, {
        groupList: [...state.groupList, payload],
      });
    }

    case GROUPS.GROUPS_SET_STATE: {
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
};

export default GroupsReducer;
