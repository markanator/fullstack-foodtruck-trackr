const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const token = jwt.sign(
    { sub: user.id, aud: user.email },
    process.env.SECRET_JWT,
  );
  return token;
};
module.exports = createToken;
