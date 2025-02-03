import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/sign_up_page.css";
import { api } from "../Central";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState("");
  const [password, setPassword] = useState();
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("All input fields require");
      return;
    }

    try {
      const request = await fetch(api + "auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, password, email }),
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response);
        alert("SignUp Successful");
        navigate("/");
      } else {
        const response = await request.json();
        setError(response || "error occurred  , Please try again");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleLogIn = () => {
    navigate("/");
  };

  return (
    <>
      <div class="main_login_create">
        <div class="left_login_create">
          <div>
            Welcome. <br />
            Begin your cinematic <br />
            adventure now with
            <br />
            platform!{" "}
          </div>
        </div>

        <div class="right_login_create">
          <form onSubmit={handleSubmit}>
            <div class="size_4"> Create an account</div>

            <div class="mb-2 size_2">
              <label htmlFor="fisrt_name">First Name</label>
            </div>

            <div class="mb-3">
              <input
                type="text"
                placeholder="Yash"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div class="mb-2 size_2">
              <label htmlFor="last_name">Last Name</label>
            </div>

            <div class="mb-3">
              <input
                type="text"
                placeholder="Rajpara"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div class="mb-2 size_2">
              <label htmlFor="email">Email</label>
            </div>

            <div class="mb-2 ">
              <input
                type="email"
                placeholder="yashrajpara3046@gmail.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class="mb-2 size_2">
              <label htmlFor="email">Password</label>
            </div>

            <div class="mb-2">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

           

            <button
              type="submit"
              class="size_2 mt-2 mb-4 login_sign_up_button w-100"
            >
              {" "}
              Sign Up
            </button>

            {error && error}

            <div class="size_9">
              Don't Have An Account?{" "}
              <a onClick={handleLogIn} class="register_log_in_link">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
