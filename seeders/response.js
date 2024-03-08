function successResponse(statusCode, message, data) {
    return {
        meta: {
            code: statusCode,
            status: "Success",
            message: message
        },
        data
      }
  }
  
  function errorResponse(statusCode, message) {
    return {
        meta: {
            code: statusCode,
            status: "Error",
            message: message
        },
        data: null
    }
  }

  module.exports = { successResponse, errorResponse }
