const { user } = require('../../models');
const { successResponse, errorResponse } = require('../seeders/response');

class UserController {
    static async get(req, res) {
        try {
            let data = await user.findAll();
            res.status(200).json(successResponse(200, "Successfully fetched", data))

        } catch (error) {
            res.status(500).json(errorResponse(500, "Failed fetched"))
        }
    }

    static async getById(req, res) {
        try {
            const id = +req.params.id;
            let data = await user.findByPk(id);
            res.status(200).json(successResponse(200, "Successfully fetched", data))

        } catch (error) {
            res.status(500).json(errorResponse(500, "Failed fetched"))
        }
    }

    static async create(req, res) {
        try {
            const {
                username,
                name,
                email,
                phone_number,
                password,
                role,
                img_profile,
                is_active,
            } = req.body;

            let data = await user.create({
                username,
                name,
                email,
                phone_number,
                password,
                role,
                img_profile,
                is_active,
            });

            res.status(201).json(successResponse(201, "Successfully created user", data))

        } catch (error) {
            res.status(500).json(errorResponse(500, "Failed created user"))
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id;
            const {
                username,
                name,
                email,
                phone_number,
                password,
                role,
                img_profile,
                is_active,
            } = req.body;

            let data = await user.update({
                username,
                name,
                email,
                phone_number,
                password,
                role,
                img_profile,
                is_active,
            }, {
                where: {
                    id
                }
            });

            res.status(200).json(successResponse(200, "Successfully updated user", data))

        } catch (error) {
            res.status(500).json(errorResponse(500, "Failed updated user"))
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id;
            let data = await user.destroy({
                where: {
                    id
                }
            });

            res.status(200).json(successResponse(200, "Successfully deleted user", data))

        } catch (error) {
            res.status(500).json(errorResponse(500, "Failed deleted user"))
        }
    }
}

module.exports = UserController;