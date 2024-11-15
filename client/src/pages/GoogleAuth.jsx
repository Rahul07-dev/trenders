import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const GoogleAuth = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    if (response.credential) {
      const idToken = response.credential;
 
      try {
        // Send the idToken to your backend for validation
        const res = await axios.post(`${backendUrl}/auth/google`, {
          idToken,        
        },{withCredentials:true});
        if (res.status === 200) {
          // Print the response to the console
          console.log("Backend Response:", res.data);

          // Successful response, user data is validated
          setUserData(res.data.user);
          console.log("regesterd");
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error verifying the token:", error);
      }
      
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {!userData ? (
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => console.log("Login Failed")}
        />
      ) : (
        <div>
          <h3>Welcome, {userData.name}!</h3>
          <img src={userData.picture} alt="User Avatar" />
          <p>Email: {userData.email}</p>
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
