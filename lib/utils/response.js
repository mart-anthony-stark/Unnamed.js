const response = (res) => {
  let status = 200;

  res.code = (statusCode) => {
    status = statusCode;
    return res;
  };
  res.send = (ctx, contentType) => {
    if (typeof ctx == "string") {
      contentType = "text/html";
    } else {
      try {
        //   Auto converts to JSON if possible
        ctx = JSON.stringify(ctx);
        contentType = "application/json";
      } catch (error) {
        contentType = "text/plain";
      }
    }
    console.log(contentType);
    res.writeHead(status, {
      "Content-Type": contentType,
    });
    res.end(ctx);
  };
  res.goto = (path) => {
    if (typeof path != "string") throw new Error("Path must be a string");

    res.writeHead(302, {
      Location: path,
    });
    res.end();
  };
};

module.exports = response;
