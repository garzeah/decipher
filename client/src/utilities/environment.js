const isDev = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_DEV_URL;
  }
};

const url = isDev();

module.exports = url;
