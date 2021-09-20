import { login } from "../../api/users";
import { CHECK_USER, USER_LOGIN } from "./types";

// Authentication Actions
// Checks if a user is signed in
export const checkUser = () => async (dispatch) => {
  const res = await fetch(`${process.env.REACT_APP_DEV_URL}/users/me`);

  dispatch({ type: CHECK_USER, payload: res.status });
};

// Attempts to log a user in
export const userLogin = (formValues, history) => async (dispatch) => {
  const response = await login(formValues);

  // Checking to see if we get any errors
  if (response.ok) {
    history.push("/messenger");

    // Send our success status and clean snackbar messages
    dispatch({ type: CHECK_USER, payload: response.status });
    dispatch({ type: USER_LOGIN, payload: "" });
  } else {
    const data = await response.json();

    dispatch({
      type: USER_LOGIN,
      payload: data.error
    });
  }
};
