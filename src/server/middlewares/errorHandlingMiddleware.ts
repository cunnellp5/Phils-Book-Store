export function errorHandlingMiddleware(err, req, res, next) {
  const statusCode = err.status || 500; // Use the status code of the error, or default to 500
  res.status(statusCode).send(err.message || "Internal Server Error");
}
