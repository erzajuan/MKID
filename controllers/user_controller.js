const { decrypt } = require("../services/bcrypt");
const { user } = require("../models");
const {
  successResponse,
  errorResponse,
  conflictResponse,
  invalidResponse,
  createResponse,
  tokenResponse,
  invalidTokenResponse,
} = require("../services/response");
const { generateToken } = require("../services/auth");

class userController {
  static async getUsers(req, res) {
    try {
      let data = await user.findAll();
      res.status(200).json(successResponse("Successfully fetched", data));
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : "+error));
    }
  }

  static async register(req, res) {
    try {
      const { username, name, email, phone_number, password } = req.body;

      let img_profile = "";
      typeof req.file == "undefined"
        ? (img_profile = "https://via.placeholder.com/150")
        : (img_profile = req.file.path);

      let checkUsername = await user.findOne({
        where: { username },
      });

      let checkEmail = await user.findOne({
        where: { email },
      });

      let checkPhoneNumber = await user.findOne({
        where: { phone_number },
      });

      if (checkUsername) {
        res.status(409).json(conflictResponse("Username sudah digunakan"));
      } else if (checkEmail) {
        res.status(409).json(conflictResponse("E-mail sudah digunakan"));
      } else if (checkPhoneNumber) {
        res.status(409).json(conflictResponse("Phone number sudah digunakan"));
      } else {
        let isnum = /^\d+$/.test(phone_number);

        if (isnum) {
          let data = await user.create({
            username,
            name,
            email,
            phone_number,
            password,
            img_profile,
          });
          res.status(201).json(createResponse("Registrasi Berhasil", data));
        } else {
          res.status(400).json(invalidResponse("Phone number tidak valid!"));
        }
      }
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : ", error));
    }
  }

  static async login(req, res) {
    try {
      const { login, password } = req.body;

      let checkUsername = await user.findOne({
        where: { username: login },
      });
      if (checkUsername) {
        if (decrypt(password, checkUsername.password)) {
          let access_token = generateToken(checkUsername);
          res.status(200).json(tokenResponse("Login Successful", access_token));
        } else {
          res.status(400).json(invalidResponse("Invalid Password"));
        }
      } else {
        let checkEmail = await user.findOne({
          where: { email: login },
        });

        if (checkEmail) {
          if (checkEmail) {
            if (decrypt(password, checkUsername.password)) {
              let access_token = generateToken(checkEmail);
              res
                .status(200)
                .json(tokenResponse("Login Successful", access_token));
            } else {
              res.status(400).json(invalidResponse("Invalid Password"));
            }
          }
        } else {
          res.status(400).json(invalidResponse("Username/Email Tidak Sesuai!"));
        }
        res.status(400).json(invalidResponse("Username/Email Tidak Sesuai!"));
      }
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }

  static async check(req, res) {
    try {
      res.status(200).json(tokenResponse("Berhasil", req.userData));
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : "+error));
    }
  }
}



module.exports = userController;
