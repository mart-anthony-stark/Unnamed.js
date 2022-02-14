const queryParser = (queryStr) => {
  try {
    const queries = queryStr.split("&");
    const queryObj = {};
    queries.forEach((query) => {
      const obj = query.split("=");
      queryObj[obj[0]] = obj[1];
    });
    console.log(queryObj);
    return queryObj;
  } catch (error) {
    throw "Invalid query string";
  }
};

module.exports = queryParser;
