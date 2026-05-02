const jwt = require("jsonwebtoken");
const config = require("./config");

function authenticate(req, res, next) {
  if (config.authDisabled) return next();

  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ success: false, message: "Thieu token xac thuc" });
  }

  try {
    req.user = jwt.verify(token, config.jwt.key, {
      issuer: config.jwt.issuer,
      audience: config.jwt.audience
    });
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Token khong hop le hoac da het han" });
  }
}

function signAccount(account) {
  return jwt.sign(
    {
      name: account.USERNAME,
      MATAIKHOAN: account.MATAIKHOAN,
      QUYEN: String(account.QUYEN)
    },
    config.jwt.key,
    {
      issuer: config.jwt.issuer,
      audience: config.jwt.audience,
      expiresIn: `${config.jwt.expiresInMinutes}m`
    }
  );
}

module.exports = { authenticate, signAccount };
