import React, { useState, useContext } from "react";

interface Errors {
  firstNameError: boolean;
  lastNameError: boolean;
  emailError: boolean;
  passwordError: boolean;
  confirmError: boolean;
}

interface Value {
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  errors: Errors;
  resetErrors: () => void;
  validateFirstName: (name: string) => void;
  validateLastName: (name: string) => void;
  validateEmail: (email: string) => void;
  validatePassword: (password: string) => void;
  validateConfirm: (confirmation: string, password: string) => void;
}

const validationContext = React.createContext<Value | null>(null);

const ValidationContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [errors, setErrors] = useState<Errors>({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    confirmError: false,
  });

  const resetErrors = () => {
    setErrors({
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmError: false,
    });
  };

  const validateFirstName = (name: string) => {
    if (name.length > 20 || name.length < 5) {
      setErrors((currentErrors) => {
        return { ...currentErrors, firstNameError: true };
      });
    } else {
      setErrors((currentErrors) => {
        return { ...currentErrors, firstNameError: false };
      });
    }
  };

  const validateLastName = (name: string) => {
    if (name.length > 20 || name.length < 5) {
      setErrors({ ...errors, lastNameError: true });
    } else {
      setErrors({ ...errors, lastNameError: false });
    }
  };

  const validateEmail = (email: string) => {
    console.log("mailed");

    let signs = 0;
    for (let i = 0; i < email.length; i++) {
      if (email[i] === "@") {
        signs++;
      }
    }
    if (signs === 1) {
      setErrors({ ...errors, emailError: false });
    }
    if (signs !== 1) {
      setErrors({ ...errors, emailError: true });
    }
  };
  const validateConfirm = (confirmation: string, password: string) => {
    if (confirmation === password) {
      setErrors({ ...errors, confirmError: false });
    } else {
      setErrors({ ...errors, confirmError: true });
    }
  };

  const validatePassword = (password: string) => {
    if (password.length >= 8) {
      const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      let numberCount = 0;
      const caps = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let capsCount = 0;
      const symbols = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "=",
        "+",
        "[",
        "]",
        "{",
        "}",
        "|",
        '"',
        "'",
        ":",
        ";",
        "/",
        "?",
        ">",
        "<",
        ".",
        ",",
      ];
      let symbolsCount = 0;

      for (let i = 0; i < password.length; i++) {
        for (let number of numbers) {
          password[i] === number && numberCount++;
        }
        for (let cap of caps) {
          password[i] === cap && capsCount++;
        }
        for (let symbol of symbols) {
          password[i] === symbol && symbolsCount++;
        }
      }
      if (numberCount > 0 && capsCount > 0 && symbolsCount > 0) {
        setErrors({ ...errors, passwordError: false });
      } else {
        setErrors({ ...errors, passwordError: true });
      }
    } else {
      setErrors({ ...errors, passwordError: true });
    }
  };

  return (
    <validationContext.Provider
      value={{
        errors,
        resetErrors,
        setErrors,
        validateFirstName,
        validateLastName,
        validateEmail,
        validatePassword,
        validateConfirm,
      }}
    >
      {children}
    </validationContext.Provider>
  );
};

export const useValidationContext = () => {
  return useContext(validationContext);
};

export default ValidationContextProvider;
