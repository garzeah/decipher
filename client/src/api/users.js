const url = require("../utilities/environment");

const retrieveMyProfile = async (setUser) => {
  const response = await fetch(`${url}/users/me`, {
    method: "GET",
    credentials: "include"
  });
  console.log(response);
  const user = await response.json();

  setUser(user);
};

const register = async (inputValues, history, setSnackbar) => {
  const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(inputValues),
    headers: { "Content-Type": "application/json" }
  });

  // Redirect them to messenger page
  if (response.ok) history.push("/messenger");
  else {
    // In the event we get an error
    const data = await response.json();

    setSnackbar({
      open: true,
      severity: "error",
      message: data.error
    });
  }
};

const login = async (formValues) => {
  const response = await fetch(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

module.exports = { retrieveMyProfile, register, login };
