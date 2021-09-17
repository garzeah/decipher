const { Translate } = require("@google-cloud/translate").v2;

// Fetches possible languages that can be used for translating
const fetchLanguages = async (req, res) => {
  try {
    const GOOGLE_CREDENTIALS = await JSON.parse(process.env.GOOGLE_CREDENTIALS);

    // Creates a client
    const translate = new Translate({
      credentials: GOOGLE_CREDENTIALS,
      projectId: GOOGLE_CREDENTIALS.project_id
    });

    // Lists available translation language with their names in English (the default).
    const [languages] = await translate.getLanguages();

    return res.status(200).send(languages);
  } catch (error) {
    return res.sendStatus(404);
  }
};

module.exports = { fetchLanguages };
