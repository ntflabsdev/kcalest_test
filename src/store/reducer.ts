import * as actionTypes from "./actions";

type Action = actionTypes.AddUserAction | actionTypes.RemoveUserAction;

interface UserState {
  userId: String,
  userEmail: String
}

const initialState: UserState = {
  userId: "",
  userEmail: "",
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
          ...state,
          userId: action.payload.userId,
          userEmail: action.payload.userEmail
      };
    case actionTypes.REMOVE_USER:
      return {
          ...state,
          userId: "",
          userEmail: ""
      };
    default:
      return state;
  }
};

export default reducer;
