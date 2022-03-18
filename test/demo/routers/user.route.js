const router = ({ GET, POST, PUT, PATCH, DELETE }) => {
  GET("/", (request, response) => {
    response.send("User route");
  });
};
module.exports = router;
