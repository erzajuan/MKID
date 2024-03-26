const { keyboard, brand } = require("../models");
const { generateTokenUser, verifToken } = require("../services/auth");
const { successResponse, errorResponse } = require("../services/response");

class keyboardController {
  static async getKeyboard(req, res) {
    try {
      let data = await keyboard.findAll({ include: [brand] });
      data == null
        ? res.status(204).json(successResponse("Data is empty", data))
        : res.status(200).json(successResponse("Successfully fetched", data));      
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }
}

module.exports = keyboardController;
