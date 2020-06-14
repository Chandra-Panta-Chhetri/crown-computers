const INITIALSTATE = {
  currentUser: null
};

const userReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...prevState,
        currentUser: action.payload
      };
    default:
      return prevState;
  }
};

export default userReducer;
