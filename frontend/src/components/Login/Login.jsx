import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token, backendUrl, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/signup`, {
          name,
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("User created successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/login`, {
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={onSubmitForm} className="form-box">
        <h1 className="heading">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h1>
        <p className="login-paragraph">
          Please {state === "Sign Up" ? "Create an Account" : "Login"} to
          continue
        </p>

        {state === "Sign Up" && (
          <div className="form-group">
            <p>Full Name</p>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span className="toggle-text" onClick={() => setState("Login")}>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span className="toggle-text" onClick={() => setState("Sign Up")}>
              Sign up here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
