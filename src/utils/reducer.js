export const reducer = (state, action) => {
  switch (action.type) {
    // case "cleanState": {
    //   //State goes back to default values
    //   return {
    //     chargerList: [],
    //     loggedInUser: "",
    //   };
    // }

    case "setBookingDates": {
      return {
        ...state,
        bookingDates: action.data,
      };
    }

    case "setChargerList": {
      return {
        ...state,
        chargerList: action.data,
      };
    }

    case "setLocation": {
      return {
        ...state,
        location: action.data,
      };
    }

    case "setLoggedInUser": {
      //updates the loggedInUser value
      return {
        ...state,
        loggedInUser: action.data,
      };
    }

    case "setUserDetails": {
      return {
        ...state,
        currentUser: {
          firstName: action.data.firstName,
          lastName: action.data.lastName,
        },
      };
    }

    case "setToken": {
      //updates the token value
      return {
        ...state,
        token: action.data,
      };
    }

    case "setErrorMessage": {
      //updates the token value
      return {
        ...state,
        errorMessage: action.data,
      };
    }
    case "setEditFormData": {
      //updates the token value
      return {
        ...state,
        editFormData: action.data,
      };
    }

    case "setSuccessMessage": {
      //updates the token value
      return {
        ...state,
        successMessage: action.data,
      };
    }
    
    
    default:
      return state;
  }
};
