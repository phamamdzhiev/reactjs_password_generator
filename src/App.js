import React, { useState } from "react";
import "./App.css";

const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = upperCaseLetters.toLowerCase();
const specialCharacters = "!+%&=?_#$*@";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    switch (name) {
      case "includeUpperCase":
        setIncludeUpperCase(checked);
        break;
      case "includeLowerCase":
        setIncludeLowerCase(checked);
        break;
      case "includeNumbers":
        setIncludeNumbers(checked);
        break;
      case "includeSymbols":
        setIncludeSymbols(checked);
        break;
      default:
        break;
    }
  };

  const handleGeneratePassword = () => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      alert("Please, select at least one checkbox");
      return;
    }

    let characterList = "";

    if (includeNumbers) {
      characterList += numbers;
    }

    if (includeUpperCase) {
      characterList += upperCaseLetters;
    }

    if (includeLowerCase) {
      characterList += lowerCaseLetters;
    }

    if (includeSymbols) {
      characterList += specialCharacters;
    }

    setPassword(generatePassword(characterList));
  };

  const generatePassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }

    return password;
  };

  const handleCopyPassword = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied successfully!");
      })
      .catch(() => {
        alert("Password WAS NOT copied! Please, try manually.");
      });
  };

  return (
    <div className="App">
      <div className="generator">
        <h1 className="generator__header">Password Generator</h1>
        <div className="generator__password">
          <span>{password}</span>
          <button onClick={handleCopyPassword} className="copy-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ width: "20px", height: "20px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password-strength">Password length</label>
          <input
            className="pw"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            type="number"
            id="password-strength"
            name="password-strength"
            max="26"
            min="8"
          />
        </div>
        <div className="form-group">
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input
            checked={includeUpperCase}
            onChange={handleCheckboxChange}
            type="checkbox"
            id="uppercase-letters"
            name="includeUpperCase"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
          <input
            checked={includeLowerCase}
            onChange={handleCheckboxChange}
            type="checkbox"
            id="lowercase-letters"
            name="includeLowerCase"
          />
        </div>
        <div className="form-group">
          <label htmlFor="include-numbers">Include Numbers</label>
          <input
            checked={includeNumbers}
            onChange={handleCheckboxChange}
            type="checkbox"
            id="include-numbers"
            name="includeNumbers"
          />
        </div>
        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input
            checked={includeSymbols}
            onChange={handleCheckboxChange}
            type="checkbox"
            id="include-symbols"
            name="includeSymbols"
          />
        </div>
        <button
          type="button"
          onClick={handleGeneratePassword}
          className="generator_btn"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
