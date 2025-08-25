class MissingProductError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingProductError";
  }
}

class MalformedQueryError extends Error {
  constructor(message) {
    super(message);
    this.name = "MalformedQueryError";
  }
}

module.exports = { MissingProductError, MalformedQueryError };
