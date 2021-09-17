module.exports = (rows) => {
  // Fixing casing issues
  const parsedRows = rows.map((row) => {
    const replaced = {};

    for (let key in row) {
      // Gives us the camel case version for our key
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace("_", "")
      );

      replaced[camelCase] = row[key];
    }

    return replaced;
  });

  return parsedRows;
};
