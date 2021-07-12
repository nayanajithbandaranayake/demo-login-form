import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLoginContext } from "../context/LoginContextProvider";
import { useValidationContext } from "../context/ValidationContextProvider";

const LoginForm = () => {
  const { validateEmail, errors, resetErrors } = useValidationContext()!;
  const {
    loginData,
    isSigned,
    isLogged,
    setLoginData,
    setQuote,
    setIsLogged,
    setForgotPassword,
    setIsSigned,
  } = useLoginContext()!;
  const { email, password } = loginData;
  const { emailError } = errors;
  const [clicked, setClicked] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    validateEmail(email);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setClicked(true);

    if (!emailError && email && password) {
      setIsLogged(true);
      setQuote(`Welcome back, ${email.substring(0, 10)}...`);
    } else {
      setIsLogged(false);
      setQuote("Welcome Back.");
    }
  };

  const handleClick = () => {
    resetErrors();
    setIsSigned(false);
  };

  useEffect(() => {
    setClicked(false);
  }, [isSigned, isLogged]);

  return (
    <form onSubmit={handleSubmit} className="login form">
      <div>
        <label htmlFor="login-email">
          email <sup>*</sup>
        </label>
        <input
          type="text"
          name="email"
          id="login-email"
          value={email}
          onChange={handleChange}
        />
        {clicked && emailError && (
          <h4 className="error">Enter a valid email.</h4>
        )}
      </div>
      <div>
        <label htmlFor="login-password">
          password <sup>*</sup>
        </label>
        <input
          type="password"
          name="password"
          id="login-password"
          value={password}
          onChange={handleChange}
        />
        <h5 className="already-signin">
          Forgot your password?
          <span
            onClick={() => {
              resetErrors();
              setForgotPassword(true);
            }}
          >
            Reset
          </span>
        </h5>
      </div>
      {clicked && (!email || !password) && (
        <h4 className="error">Enter the necessary information.</h4>
      )}
      <button type="submit" className="submit">
        Log in
      </button>
      <h5 className="already-signin">
        Don't have a account <span onClick={handleClick}>Sign in</span>
      </h5>
    </form>
  );
};

export default LoginForm;
