export const reducer = (state, action) => {
  switch (action.type) {
    case "setUserBookings": {
      return {
        ...state,
        bookings: action.data,
      };
    }
    case "setUserRequests": {
      return {
        ...state,
        bookingRequests: action.data,
      };
    }
    case "setHostStatus": {
      return {
        ...state,
        hostStatus: action.data,
      };
    }
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
      return {
        ...state,
        errorMessage: action.data,
      };
    }
    case "setChargerStatus": {
      return {
        ...state,
        chargerStatus: action.data,
      };
    }
    case "setEditFormData": {
      return {
        ...state,
        editFormData: action.data,
      };
    }
    default:
      return state;
  }
};
