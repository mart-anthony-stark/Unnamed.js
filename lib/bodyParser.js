async function bodyParser(req) {
  //   Listening to data event and attatch to req.body
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (body !== "") {
        req.body = JSON.parse(body);
        resolve();
      } else resolve();
    });
  });
}

module.exports = bodyParser;
