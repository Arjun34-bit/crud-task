const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500),
    json({
      status: err.status || 500,
      error: err.message || "Internal Server Error",
    });
};

export default errorHandling;
