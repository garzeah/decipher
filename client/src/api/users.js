const url = require("../utilities/environment");

const register = async (inputValues, history, setSnackbar) => {
  const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(inputValues),
    headers: { "Content-Type": "application/json" }
  });

  // Redirect them to messenger page
  if (response.status === 201) history.push("/messenger");

  // In the event we get an error
  const data = await response.json();

  if (response.status !== 201) {
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

module.exports = { register, login };
