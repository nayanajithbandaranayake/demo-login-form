import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLoginContext } from "../context/LoginContextProvider";
import { useValidationContext } from "../context/ValidationContextProvider";

const SignupForm = () => {
  const [clicked, setClicked] = useState(false);
  const [empty, setEmpty] = useState(false);

  const { account, setAccount, setIsSigned, isSigned } = useLoginContext()!;
  const {
    errors,
    validateLastName,
    validateFirstName,
    validateEmail,
    validateConfirm,
    validatePassword,
    resetErrors,
  } = useValidationContext()!;
  const { firstName, lastName, email, password, confirmPassword } = account;
  const {
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    confirmError,
  } = errors;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName") {
      validateFirstName(value);
    }

    if (name === "lastName") {
      validateLastName(value);
    }

    if (name === "email") {
      validateEmail(value);
    }

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "confirmPassword") {
      validateConfirm(value, password);
    }
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setClicked(true);
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmError
    ) {
      setIsSigned(false);
    } else {
      if (email && firstName && lastName && password && confirmPassword) {
        setIsSigned(true);
      } else {
        setEmpty(true);
        setIsSigned(false);
      }
    }
    if (clicked) {
      if (email && firstName && lastName && password && confirmPassword) {
        setEmpty(false);
      } else {
        setEmpty(true);
      }
    }
  };

  useEffect(() => {
    setClicked(false);
  }, [isSigned]);

  return (
    <form className="signup form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first-name">
          first name <sup>*</sup>
        </label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          value={firstName}
          onChange={handleChange}
        />
        {clicked && firstNameError && (
          <h4 className="error">
            First name length should be between 5 and 20.
          </h4>
        )}
      </div>
      <div>
        <label htmlFor="last-name">
          last name <sup>*</sup>
        </label>
        <input
          type="text"
          name="lastName"
          id="last-name"
          value={lastName}
          onChange={handleChange}
        />
        {clicked && lastNameError && (
          <h4 className="error">
            Last name length should be between 5 and 20.
          </h4>
        )}
      </div>

      <div>
        <label htmlFor="email">
          email <sup>*</sup>
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        {clicked && emailError && (
          <h4 className="error">Enter a valid email.</h4>
        )}
      </div>
      <div>
        <label htmlFor="password">
          password <sup>*</sup>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        {clicked && passwordError && (
          <ul className="error">
            <h4>Password must contain, </h4>
            <li>at least 8 characters</li>
            <li>a capital letter</li>
            <li>a number</li>
            <li>a symbol</li>
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="confirm-password">
          confirm password <sup>*</sup>
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleChange}
        />
        {clicked && confirmError && (
          <h4 className="error">Password confirmation does not match.</h4>
        )}
      </div>
      {empty ? (
        <div>
          <h4 className="error empty-error">
            Please provide the necessary information.
          </h4>
        </div>
      ) : null}
      <button type="submit" className="submit">
        Sign in
      </button>
      <h5 className="already-signin">
        Already have an account?
        <span
          onClick={() => {
            resetErrors();
            setIsSigned(true);
          }}
        >
          Log in
        </span>
      </h5>
    </form>
  );
};

export default SignupForm;
