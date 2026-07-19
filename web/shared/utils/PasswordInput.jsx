// Packages
import { useState } from "react";

// Style
import style from "../style/utilsStyle/input.module.css";

// Files
import crossSvg from "../assets/cross.svg";
import tickSvg from "../assets/tick.svg";
import warningSvg from "../assets/warning.svg";
import hideSvg from "../assets/hide.svg";
import showSvg from "../assets/show.svg";

const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  format = "[^A-Za-z0-9]{8,30}",
  confirmPassword = false,
  required = true,
}) => {
  const [interacted, setInteracted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setInteracted(true);
    onChange(e);
  };
  
  const requirements = [
      {
          requirement: "Contains atleast 8 characters",
          validation: value.length >= 8,
        },
        {
            requirement: "Contains atleast a lowercase letter",
            validation: /[a-z]/.test(value),
        },
        {
            requirement: "Contains atleast an uppercase letter",
            validation: /[A-Z]/.test(value),
        },
        {
            requirement: "Contains atleast a number",
            validation: /[\d]/.test(value),
        },
        {
            requirement: "Contains atleast a special character",
            validation: /[^A-Za-z0-9]/.test(value),
        },
    ];
    
    const isValid = requirements.every((r) => r.validation)

    const status = !interacted
      ? style.neutral
      : isValid
        ? style.valid
        : style.invalid;

  return (
    <>
      <div className={style.inputWrapper}>
        <input
          type={passwordVisible ? "text" : "password"}
          label={label}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          className={`${style.input} ${status}`}
        />
        <img
          src={passwordVisible ? showSvg : hideSvg}
          alt={
            passwordVisible ? "Visible password icon" : "Hidden password icon"
          }
          onClick={() => setPasswordVisible((prev) => !prev)}
          className={style.visibilitySvg}
        />
      </div>
      {interacted && !confirmPassword && (
        <div className={style.requirements}>
          {requirements.map((r) => {
            return (
              <div key={r.requirement} className={style.requirement}>
                <img
                  src={r.validation ? tickSvg : crossSvg}
                  alt={r.validation ? "Tick icon" : "Cross Icon"}
                  className={`${style.svg} ${r.validation ? style.validSvg : style.invalidSvg}`}
                />
                <p
                  className={
                    r.validation
                      ? style.validRequirement
                      : style.invalidRequirement
                  }
                >
                  {r.requirement}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default PasswordInput;
