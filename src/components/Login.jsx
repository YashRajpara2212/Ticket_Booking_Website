import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login_page.css";
import { api } from "../Central";

//axios api-client
//useNavigate
//authcontext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("both email and password require");
      return;
    }

    try {
      const request = await fetch(api + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response, "login successfully");
        alert("login Successful");
        if (response.data.accessToken) {
          localStorage.setItem("authToken", response.data.accessToken);
        }
        navigate("/movie");
      } else {
        const response = await request.json();
        setError(response || "error occurred  , Please try again");
      }
    } catch (error) {
      setError(error.message);
      console.log("error in login ", error);
    }
  };

  const handleSignUp = () => {
    navigate("/signuppage");
  };

  return (
    <>
      <div class=" d-flex  main_login_create">
        <div class="min-vh-100 d-flex  left_login_create">
          <div>
            Welcome. <br />
            Begin your cinematic <br />
            adventure now with
            <br />
            platform!
          </div>
        </div>

        <div class="min-vh-100 d-flex flex-column right_login_create">
          <form>
            <div class="heading_black"> Login to your account</div>

            <div class="mb-2 size_2">
              <label htmlFor="email">Email</label>
            </div>

            <div class="mb-2 ">
              <input
                type="gmail"
                placeholder="yashrajpara3046@gmail.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class="mb-2 size_2">
              <label htmlFor="email">Password</label>
            </div>

            <div class="mb-3">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              class="size_2 login_sign_up_button w-100"
              onClick={handleLogIn}
            >
              Login
            </button>

            <div class="size_9">
              Don't Have An Account?
              <a onClick={handleSignUp} class="register_log_in_link">
                Register Here
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
