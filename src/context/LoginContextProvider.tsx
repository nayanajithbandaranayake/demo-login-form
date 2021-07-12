import React, { useState, useContext } from "react";

interface Value {
  isSigned: boolean;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
  account: Account;

  setAccount: React.Dispatch<React.SetStateAction<Account>>;
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
  quote: string;
  setQuote: React.Dispatch<React.SetStateAction<string>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  forgotEmail: string;
  setForgotEmail: React.Dispatch<React.SetStateAction<string>>;
  resetAllData: () => void;
}

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface LoginData {
  email: string;
  password: string;
}

const loginContext = React.createContext<Value | null>(null);

const LoginContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [quote, setQuote] = useState("Welcome Back.");
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");

  const [isSigned, setIsSigned] = useState(false);

  const resetAllData = () => {
    setAccount({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setLoginData({
      email: "",
      password: "",
    });
    setForgotEmail("");
  };

  return (
    <loginContext.Provider
      value={{
        account,
        setAccount,
        isSigned,
        setIsSigned,
        loginData,
        setLoginData,
        quote,
        setQuote,
        isLogged,
        setIsLogged,
        forgotPassword,
        setForgotPassword,
        forgotEmail,
        setForgotEmail,
        resetAllData,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(loginContext);
};

export default LoginContextProvider;
