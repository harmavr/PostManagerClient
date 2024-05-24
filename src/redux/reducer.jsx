const initValues = {
  username: "",
  id: 0,
  login: false,
};

const authReducer = (state = initValues, action) => {
  if (action.type === "authenticated") {
    return {
      ...state,
      username: action.payload.username,
      id: action.payload.id,
      login: action.payload.login,
    };
  }
  if (action.type === "notAuthenticated") {
    return {
      ...state,
      username: "",
      id: 0,
      login: false,
    };
  }
  if (action.type === "show") {
    return {
      ...state,
    };
  } else return state;
};

export default authReducer;
