import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, backendUrl } = useContext(AuthContext);

  const [state, setState] = useState("Login"); // Toggle between "Login" and "Sign Up"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/sign-up");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <form onSubmit={handleOnSubmit} style={styles.formContainer}>
      <div style={styles.formBox}>
        <h1 style={styles.heading}>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h1>
        <p>
          Please {state === "Sign Up" ? "Create Account" : "Login"} to access
          your dashboard
        </p>
        {state === "Sign Up" && (
          <div style={styles.inputGroup}>
            <p>Full Name</p>
            <input
              type="text"
              placeholder="Please enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}
        <div style={styles.inputGroup}>
          <p>Email</p>
          <input
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <p>Password</p>
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} style={styles.toggleLink}>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")} style={styles.toggleLink}>
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

const styles = {
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    backgroundColor: "#f9f9f9",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    width: "350px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  inputGroup: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  toggleLink: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
