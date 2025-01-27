import React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchToken() {
      //Extracting the code from the url parameters
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");

      //check if the code is present or not
      if (code) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/microsoft-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        const data = await response.json();
        if (data.data.token_data.id_token) {
          const access_token = data.data.token_data.access_token;
          const response = await fetch("https://graph.microsoft.com/v1.0/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          const user_data = await response.json();
          if (user_data.ok) {
            alert("Fetched");
            navigate("/home");
          } else {
            alert("Error");
          }
        } else {
          console.error("error", data);
        }
      } else {
        console.error("Authorization code not found in the url");
      }
    }
    fetchToken();
  }, [location.search, navigate]);
  return <div>This is callback function</div>;
};

export default AuthCallback;
