const jwt = require("jsonwebtoken");
const { invalidTokenResponse } = require("./response");
const secretKey = process.env.SECRET_KEY || "mkid";

const generateToken = (data) => {
  const { id, name, username, email, phone_number, profilePicture, role }= data;

  return jwt.sign({ id, name, username, email, phone_number, profilePicture, role }, secretKey, {expiresIn: `1h`});
};

const verifToken = (data) => {
  return jwt.verify(data, secretKey);
};

const checkToken = (req, res, next) => {
    const access_token = req.headers.access_token;  
    if (access_token) {
      try {
        let token = verifToken(access_token);
        req.userData = token;
        next();
      } catch (error) {
        res.status(401).json(invalidTokenResponse("Token expired"));
      }
      
    } else {
      res.status(401).json(invalidTokenResponse("Token Invalid"));
    }
  };

module.exports = { generateToken, verifToken, checkToken };
