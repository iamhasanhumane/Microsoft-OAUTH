const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const { OAUTH } = require("../config/constants");

//Routes
router.get("/signin/microsoft-oauth", async (req, res) => {
  const encodedscopes = encodeURIComponent(
    OAUTH.MICROSOFT_OAUTH_SCOPES.join(" ")
  );
  console.log(encodedscopes);
  const MICROSOFT_OAUTH_URL = `${OAUTH.MICROSOFT_OAUTH_URL}client_id=${OAUTH.MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${OAUTH.MICROSOFT_CALLBACK_URL}&response_mode=query&scope=${encodedscopes}`;
  console.log(MICROSOFT_OAUTH_URL);
  return res.status(200).send({
    message: "success",
    data: {
      redirect_url: MICROSOFT_OAUTH_URL,
    },
  });
});

router.post("/microsoft-token", async (req, res) => {
  const { code } = req.body;
  try {
    const response = await fetch(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: OAUTH.MICROSOFT_CLIENT_ID,
          scope: OAUTH.MICROSOFT_OAUTH_SCOPES,
          code,
          redirect_uri: OAUTH.MICROSOFT_CALLBACK_URL,
          grant_type: "authorization_code",
        }),
      }
    );

    const token_data = await response.json();
    if (token_data.access_token) {
      res.cookie("access_token", token_data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expiresIn: "24h",
        sameSite: "Lax",
      });
      res.status(200).send({
        success: true,
        message: "token fetched successfully",
        data: {
          token_data,
        },
      });
    } else {
      res.status(400).send({
        success: false,
        message: "failed to retrieve token",
        token_data,
      });
    }
  } catch (error) {
    console.error("Error during token exchange", error);
    return res.status(500).send({
      success: false,
      message: "Error during Token Exchange Api",
      error,
    });
  }
});
module.exports = router;
