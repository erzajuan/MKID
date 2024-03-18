const { decrypt, encrypt } = require("../services/bcrypt");
const { user } = require("../models");
const {
  successResponse,
  errorResponse,
  conflictResponse,
  invalidResponse,
  createResponse,
  tokenResponse,
  invalidTokenResponse,
  notFoundResponse,
} = require("../services/response");
const { generateToken } = require("../services/auth");
const { userResource } = require("../resources/users_resources");

class userController {
  static async getUsers(req, res) {
    try {
      let data = await user.findAll({
        attributes: { exclude: ["password"] },
      });
      data == null
        ? res.status(204).json(successResponse("Data is empty", data))
        : res.status(200).json(successResponse("Successfully fetched", data));
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
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
          res
            .status(201)
            .json(createResponse("Registrasi Berhasil", userResource(data)));
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
          console.log("Create Token");
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
          if (decrypt(password, checkUsername.password)) {
            console.log("Create Token");
            let access_token = generateToken(checkEmail);
            res
              .status(200)
              .json(tokenResponse("Login Successful", access_token));
          } else {
            res.status(400).json(invalidTokenResponse("Invalid Password"));
          }
        } else {
          res.status(400).json(invalidResponse("Username/Email Tidak Sesuai!"));
        }
      }
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }

  static async check(req, res) {
    try {
      res.status(200).json(tokenResponse("Successful Token", req.userData));
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.userData;
      const { name, username, email, phone_number } = req.body;

      let checkUsername = await user.findOne({
        where: { username },
      });

      let checkEmail = await user.findOne({
        where: { email },
      });

      let checkPhoneNumber = await user.findOne({
        where: { phone_number },
      });

      let checkId = await user.findByPk(id);

      if (checkUsername && checkUsername.username != checkId.username) {
        res.status(409).json(conflictResponse("Username sudah digunakan"));
      } else if (checkEmail && checkEmail.email != checkId.email) {
        res.status(409).json(conflictResponse("E-mail sudah digunakan"));
      } else if (
        checkPhoneNumber &&
        checkPhoneNumber.phone_number != checkId.phone_number
      ) {
        res.status(409).json(conflictResponse("Phone number sudah digunakan"));
      } else {
        let isnum = /^\d+$/.test(phone_number);

        if (isnum) {
          let img_profile = "";
          if (checkId.img_profile == "https://via.placeholder.com/150") {
            if (typeof req.file == "undefined") {
              img_profile = "https://via.placeholder.com/150";
            } else {
              img_profile = req.file.path;
            }
          } else {
            if (typeof req.file == "undefined") {
              img_profile = checkId.img_profile;
            } else {
              img_profile = req.file.path;
            }
          }

          let update = await user.update(
            {
              username,
              name,
              email,
              phone_number,
              img_profile,
            },
            {
              where: { id },
            }
          );

          let data = await user.findByPk(id);

          update == 1
            ? res
                .status(200)
                .json(
                  successResponse(
                    `Successfuly updated user with id : ${id}`,
                    data
                  )
                )
            : res
                .status(404)
                .json(notFoundResponse(`Failed update user with id : ${id}`));
        } else {
          res.status(400).json(invalidResponse("Invalid phone number"));
        }
      }
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }

  static async detailUser(req, res) {
    try {
      const { id } = req.userData;
      let data = await user.findByPk(id);
      data == null
        ? res.status(404).json(notFoundResponse("Data not found"))
        : res
            .status(200)
            .json(
              successResponse("Successfully get profile", userResource(data))
            );
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }

  static async changePassword(req, res) {
    try {
      const id = +req.userData.id;
      const { old_password, new_password, confirm_password } = req.body;
      const data = await user.findByPk(id);

      if (decrypt(old_password, data.password)) {
        if (new_password == confirm_password) {
          if (new_password == old_password) {
            res
              .status(400)
              .json(
                invalidResponse(
                  "New password must be different from old password"
                )
              );
          } else {
            await user.update(
              {
                password: encrypt(new_password),
              },
              { where: { id } }
            );
            res
              .status(200)
              .json(
                successResponse(
                  "Successfully change password",
                  userResource(data)
                )
              );
          }
        } else {
          res.status(400).json(invalidResponse("New Password does not match"));
        }
      } else {
        res.status(400).json(invalidResponse("Invalid Password"));
      }
    } catch (error) {
      res.status(500).json(errorResponse("Internal Server Error : " + error));
    }
  }
}

module.exports = userController;
