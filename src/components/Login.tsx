import React from "react";
import { useEffect } from "react";
import { useLoginContext } from "../context/LoginContextProvider";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Login = () => {
  const { isSigned, quote, forgotPassword, resetAllData } = useLoginContext()!;

  useEffect(() => {
    resetAllData();
  }, [isSigned, forgotPassword]);

  return (
    <main>
      <section className="caption">
        {!forgotPassword ? (
          isSigned ? (
            <h1>{quote}</h1>
          ) : (
            <h1>
              Hello there,
              <br />
              Looks like you are new here.
            </h1>
          )
        ) : (
          <h1>Remember the password next time. {":)"}</h1>
        )}
      </section>
      <section
        className={
          forgotPassword === false ? (isSigned ? "show" : "hide") : "hide"
        }
      >
        <LoginForm />
      </section>
      <section
        className={
          forgotPassword === false ? (isSigned ? "hide" : "show") : "hide"
        }
      >
        <SignupForm />
      </section>
      <section
        className={forgotPassword ? (isSigned ? "show" : "hide") : "hide"}
      >
        <ForgotPasswordForm />
      </section>
    </main>
  );
};

export default Login;
