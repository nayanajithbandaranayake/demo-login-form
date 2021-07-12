import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLoginContext } from "../context/LoginContextProvider";
import { useValidationContext } from "../context/ValidationContextProvider";

const ForgotPasswordForm = () => {
  const {
    setIsSigned,
    setForgotPassword,
    forgotEmail,
    setForgotEmail,
    forgotPassword,
  } = useLoginContext()!;
  const { validateEmail, errors } = useValidationContext()!;

  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const { emailError } = errors;

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setClicked(true);
    if (emailError === false && forgotEmail) {
      setSuccess(true);
    } else {
      setForgotPassword(true);
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForgotEmail(e.target.value);
    validateEmail(forgotEmail);
  };
  const handleSuccess = () => {
    setForgotPassword(false);
    setIsSigned(true);
  };

  useEffect(() => {
    setClicked(false);
    setSuccess(false);
  }, [forgotPassword]);

  if (success) {
    return (
      <article className="form success-reset">
        <h3>Success!</h3>
        <p>Password reset infomation sent to the email address.</p>
        <button className="submit" onClick={handleSuccess}>
          Log in
        </button>
      </article>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Enter your email to send password reset information.</h3>
      <label htmlFor="forgot-email">
        email <sup>*</sup>
      </label>
      <input
        type="text"
        id="forgot-email"
        value={forgotEmail}
        onChange={handleChange}
      />
      {clicked && emailError && (
        <h5 className="error">Provide a valid email address.</h5>
      )}
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
