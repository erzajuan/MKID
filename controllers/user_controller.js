const {user} = require('../models');
const { successResponse, errorResponse } = require('../seeders/response');

class userController {
    static async getUsers(req, res) {
        try {
            let data = await user.findAll();
            res.status(200).json(successResponse(200, "Successfully fetched", data))
            
        } catch (error) {
            res.status(500).json(errorResponse(500, "Failed fetched"))
        }
    }
}

module.exports = userController;