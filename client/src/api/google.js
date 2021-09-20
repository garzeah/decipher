const url = require("../utilities/environment");

const fetchLanguages = async (setLanguageList) => {
  const response = await fetch(`${url}/google/languages`);
  let languages = await response.json();
  setLanguageList(languages);
};

module.exports = { fetchLanguages };
