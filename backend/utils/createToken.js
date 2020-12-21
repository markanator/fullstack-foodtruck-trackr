const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const token = jwt.sign(
    { id: user.id, user_role: user.user_role },
    process.env.SECRET_JWT
  );
  return token;
};
module.exports = createToken;
