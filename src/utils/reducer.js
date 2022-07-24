export const reducer = (state, action) => {
  //console.log(state)
  //console.log(action)

  switch (action.type) {
    case "cleanState": {
      //State goes back to default values
      return {
        chargerList: [],
        loggedInUser: "",
      };
    }

    case "setChargerList": {
      return {
        ...state,
        chargerList: action.data,
      };
    }

    case "setLoggedInUser": {
      //updates the loggedInUser value
      return {
        ...state,
        loggedInUser: action.data,
      };
    }
    case "setToken": {
      //updates the token value
      return {
        ...state,
        token: action.data,
      };
    }
    default:
      return state;
  }
};
