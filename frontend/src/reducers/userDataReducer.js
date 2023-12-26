import { commonHelper } from "../common/commonHelper";
const initialState = {
  logged_user: commonHelper.getItem("user") ? JSON.parse(commonHelper.getItem("user")) : null,
  auth_token: commonHelper.getItem("auth_token") ? commonHelper.getItem("auth_token") : null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_USER":
      return {
        ...state,
        logged_user: action.payload,
      };
    case "AUTH_TOKEN":
      return {
        ...state,
        auth_token: action.payload,
      };
    default:
      return state;
  }
};
export default userDataReducer;
