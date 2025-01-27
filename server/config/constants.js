const dotenv = require("dotenv");
// dotnev configuration
dotenv.config();

module.exports = {
  OAUTH: {
    MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
    MICROSOFT_OAUTH_URL:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?",
    MICROSOFT_CALLBACK_URL: process.env.MICROSOFT_CALLBACK_URL,
    MICROSOFT_OAUTH_SCOPES: [
      "openid",
      "profile",
      "email",
      "offline_access",
      "Mail.Read",
      "Mail.ReadWrite",
      "Mail.Send",
      "User.Read",
    ],
  },
};
