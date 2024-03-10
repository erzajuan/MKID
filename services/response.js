function successResponse(statusCode, message, data) {
  return {
    meta: {
      code: statusCode,
      status: "Success",
      message: message,
    },
    data,
  };
}

function errorResponse(message) {
  return {
    meta: {
      code: 500,
      status: "Error",
      message: message,
    },
    data: null,
  };
}

function createResponse(message, data) {
  return {
    meta: {
      code: 201,
      status: "Success",
      message: message,
    },
    data: data,
  };
}

function conflictResponse(message) {
  return {
    meta: {
      code: 409,
      status: "Conflict",
      message: message,
    },
    data: null,
  };
}

function invalidResponse(message) {
  return {
    meta: {
      code: 400,
      status: "Invalid",
      message: message,
    },
    data: null,
  };
}

module.exports = {
  successResponse,
  errorResponse,
  conflictResponse,
  invalidResponse,
  createResponse
};
