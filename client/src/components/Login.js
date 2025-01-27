import React from "react";
import microsoftLogo from "../assets/microsoft logo.jpg";

const Login = () => {
  const apiurl = process.env.REACT_APP_BACKEND_URL; 
  const handleclick = async () => {
    const response = await fetch(
      `${apiurl}/api/v1/auth/signin/microsoft-oauth`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      const microsoft_url = await data.data.redirect_url;
      window.location.href = microsoft_url;
    } else {
      console.log("No redirect url found in the response");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to our Application!
        </h1>
        <button
          className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out ml-20"
          onClick={() => handleclick()}
        >
          <img
            src={microsoftLogo}
            alt="Microsoft Logo"
            className="w-5 h-5 mr-2"
          />
          Signin with microsoft
        </button>
      </div>
    </div>
  );
};

export default Login;
