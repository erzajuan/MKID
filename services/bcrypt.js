const bcrypt = require("bcrypt");
const saltRound = +process.env.SALT_ROUND || 5;

const encrypt = (data) => {
  return bcrypt.hashSync(String(data), saltRound);
};

const decrypt = (data, password) => {
  return bcrypt.compareSync(data, password);
};


module.exports = { encrypt, decrypt }
