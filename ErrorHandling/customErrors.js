class MissingProductsError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingProductError";
  }
}

class MalformedSortError extends Error {
  constructor(message) {
    super(message);
    this.name = "MalformedQueryError";
  }
}

module.exports = { MissingProductsError, MalformedSortError };
