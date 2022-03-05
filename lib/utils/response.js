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
};

module.exports = response;
