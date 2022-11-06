import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/style.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    if (name === "foo" && pass === "bar") {
      localStorage.setItem("auth", "true");
      navigate("/home");
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container2}
    >
      <form onSubmit={formSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="pass"
          placeholder="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {error && <p className={styles.error}>Invalid name or password</p>}
        <button type="submit">Login</button>
      </form>
    </motion.div>
  );
};

export default Login;
